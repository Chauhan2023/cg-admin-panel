import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from 'react-bootstrap';
import { apiGet } from '../../Api/apiMethods';

/* ─────────────────────────────────────────────────────────
   Sanitize image URL (strip stray backticks / quotes)
───────────────────────────────────────────────────────── */
const sanitizeUrl = (u) => {
    if (!u) return null;
    let s = String(u).trim().replace(/`/g, '');
    if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
        s = s.slice(1, -1).trim();
    }
    return s || null;
};

/* helper — reduce image dim by small gutter (matches reference) */
const PRODUCT_IMAGE_WIDTH_REDUCE_PX = 8;
const reduceImageDim = (value) => {
    const n = Number(value);
    return Number.isFinite(n) ? Math.max(n - PRODUCT_IMAGE_WIDTH_REDUCE_PX, 1) : value;
};

/* ─────────────────────────────────────────────────────────
   Read-only product slot — no dragging, no editing
   Matches the layout logic of PreviewCanvas +
   ProductAndLogoSet (the Tailwind reference).
───────────────────────────────────────────────────────── */
function SlotView({ product, pos }) {
    const rotation = product.rotation || 0;
    const isRotated90 = rotation === 90 || rotation === -90 || rotation === 270;

    return (
        <div
            className="position-absolute"
            style={{ left: pos.x, top: pos.y, width: pos.width, height: pos.height, overflow: 'hidden' }}
        >
            <div className="position-relative w-100 h-100 d-flex align-items-center justify-content-center">
                {/* Slot / background dye image — rotate with dimension swap */}
                {product.slotImage && (
                    <div
                        className="position-absolute d-flex align-items-center justify-content-center"
                        style={{
                            top: '50%',
                            left: '50%',
                            width: isRotated90 ? `${pos.height}px` : `${pos.width}px`,
                            height: isRotated90 ? `${pos.width}px` : `${pos.height}px`,
                            transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                            transformOrigin: 'center center',
                            overflow: 'hidden',
                            pointerEvents: 'none',
                        }}
                    >
                        <img
                            src={product.slotImage}
                            alt=""
                            draggable={false}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                    </div>
                )}

                {/* Product image — sized using fitted dimensions */}
                {product.productImage && (
                    <img
                        src={product.productImage}
                        alt={product.productActualName || 'Product'}
                        draggable={false}
                        style={{
                            width: pos.fittedWidth
                                ? reduceImageDim(isRotated90 ? pos.fittedHeight : pos.fittedWidth)
                                : (rotation === 0 ? '100%' : reduceImageDim(pos.height)),
                            height: pos.fittedHeight
                                ? (isRotated90 ? pos.fittedWidth : pos.fittedHeight)
                                : (rotation === 0 ? '100%' : pos.width),
                            objectFit: 'contain',
                            transform: `rotate(${rotation}deg)`,
                            position: 'relative',
                            zIndex: 1,
                        }}
                    />
                )}

                {/* Logo overlay (read-only, positioned absolutely) */}
                {product.logoImage && (
                    <img
                        src={product.logoImage}
                        alt="Logo"
                        draggable={false}
                        style={{
                            position: 'absolute',
                            left: pos.scaledLogoX,
                            top: pos.scaledLogoY,
                            width: pos.scaledLogoW,
                            height: pos.scaledLogoH,
                            objectFit: 'contain',
                            zIndex: 2,
                            transform: `rotate(${(rotation + (product.logoRotation || 0) + (product.logoAlignment === 'vertical' ? 90 : 0))}deg)`,
                        }}
                    />
                )}
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────
   Main read-only kit preview using Bootstrap
───────────────────────────────────────────────────────── */
function OrderKitPreview({ preview_id }) {
    const [viewportSize, setViewportSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    /* Track viewport width AND height for scaling */
    useEffect(() => {
        const onResize = () =>
            setViewportSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    /* Fetch order data */
    const { data: orderData, isLoading } = useQuery({
        queryKey: ['OrderKitPreview', preview_id],
        queryFn: () => apiGet(`/getOrderById/${preview_id}`),
        enabled: !!preview_id,
        select: (res) => res?.data,
        retry: 2,
        retryDelay: 1000,
    });

    /* ── Parse the products array ── */
    const parsedKits = useMemo(() => {
        const products = orderData?.products;
        if (!Array.isArray(products) || products.length === 0) return null;

        return products
            .map((productGroup) => {
                const { mainBox, items } = productGroup || {};
                if (!mainBox || !Array.isArray(items)) return null;

                const rawW = Number(mainBox.width) || 0;
                const rawH = Number(mainBox.height) || 0;
                if (!rawW || !rawH) return null;

                /* ── Scale factor: constrain to BOTH width and height ── */
                const targetW = viewportSize.width * 0.88;
                const targetH = viewportSize.height * 0.85;
                const rawScale = Math.min(targetW / rawW, targetH / rawH, 1);
                const scale = Number.isFinite(rawScale) && rawScale > 0 ? rawScale : 1;
                const s = (v) => Math.max((Number(v) || 0) * scale, 0);

                const canvasW = rawW * scale;
                const canvasH = rawH * scale;
                const dyeImage = sanitizeUrl(mainBox.dyeImage);

                const slots = items.map((item) => {
                    const slotW = s(item.slot?.width || 0);
                    const slotH = s(item.slot?.height || 0);

                    /* Fitted product image dims (scaled, clamped to slot) */
                    const rawPW = Number(item.product?.width);
                    const rawPH = Number(item.product?.height);
                    const fittedWidth =
                        Number.isFinite(rawPW) && rawPW > 0
                            ? Math.min(s(rawPW), slotW || Infinity)
                            : null;
                    const fittedHeight =
                        Number.isFinite(rawPH) && rawPH > 0
                            ? Math.min(s(rawPH), slotH || Infinity)
                            : null;

                    return {
                        categoryId: item.categoryId,
                        productActualName: item.productActualName ?? null,
                        productImage: sanitizeUrl(item.product?.image),
                        slotImage: sanitizeUrl(item.slotImage),
                        logoImage: sanitizeUrl(item.logo?.image),
                        rotation: item.slot?.rotation || 0,
                        logoRotation: item.logo?.rotation || 0,
                        logoAlignment: item.logo?.alignment || 'horizontal',
                        pos: {
                            x: s(item.slot?.x || 0),
                            y: s(item.slot?.y || 0),
                            width: slotW,
                            height: slotH,
                            fittedWidth,
                            fittedHeight,
                            scaledLogoX: s(item.logo?.x || 0),
                            scaledLogoY: s(item.logo?.y || 0),
                            scaledLogoW: s(item.logo?.width || 0),
                            scaledLogoH: s(item.logo?.height || 0),
                        },
                    };
                });

                return { canvasW, canvasH, dyeImage, slots, kitId: mainBox.kitId, price: mainBox.price };
            })
            .filter(Boolean);
    }, [orderData, viewportSize]);

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center my-4">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    if (!parsedKits || parsedKits.length === 0) {
        return (
            <div className="d-flex justify-content-center p-4 text-muted small">
                No kit preview available.
            </div>
        );
    }

    return (
        <div className="d-flex flex-column gap-4 w-100">
            {parsedKits.map((kit, index) => (
                <div key={kit.kitId || index} className="d-flex justify-content-center w-100 overflow-auto py-3">
                    {/* Main kit box canvas — read-only using Bootstrap styling */}
                    <div
                        className="position-relative shadow-sm border border-secondary rounded"
                        style={{
                            width: kit.canvasW,
                            height: kit.canvasH,
                            backgroundImage: kit.dyeImage ? `url(${kit.dyeImage})` : 'none',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            flexShrink: 0,
                        }}
                    >
                        {kit.slots.map((item) => (
                            <SlotView
                                key={item.categoryId || Math.random()}
                                product={item}
                                pos={item.pos}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default OrderKitPreview;