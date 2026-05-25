import React, { useState, useEffect, useRef } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

import { Rnd } from 'react-rnd';


export function cmToPx(cm) {
    const pxPerCm = 19;

    if (typeof cm !== 'number' || isNaN(cm) || cm < 0) {
        alert('Invalid input: Please provide a valid positive number for cm.');
        return null;
    }

    return cm * pxPerCm;
}
function ProductAndLogoSet({
    height,
    width,
    image,
    alt,
    id,
    setSelectedCategoriesOnClick = () => { },
    setShowCanvas = () => { },
    logoHeight = 6,
    logoLength = 6,
    logoImg = null,
    rotation = 0,
    productLogoPosition = 'center',
    productOverLogoYcoord,
    productOverLogoXcoord,
    editingImageData,
    setEditingImageData,
    setNewPayloadData,
    isPreview = false,
    productLogoAlignment = 'horizontal'
}) {
    const logoSize = {
        width: cmToPx(Number(logoLength)),
        height: cmToPx(Number(logoHeight))
    };

    const productContainerRef = useRef(null);
    const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0 });
    const [hasDragged, setHasDragged] = useState(false);

    const handleCanvas = (productId) => {
        setSelectedCategoriesOnClick(productId);
        setShowCanvas();
    };

    const calculateInitialLogoPosition = (positionStr) => {
        let [vertical = 'center', horizontal = 'center'] = positionStr.split('-');
        if (!horizontal) horizontal = vertical;

        let x = 0, y = 0;

        switch (horizontal) {
            case 'left': x = 0; break;
            case 'center': x = (width - logoSize.width) / 2; break;
            case 'right': x = width - logoSize.width; break;
        }

        switch (vertical) {
            case 'top': y = 0; break;
            case 'center': y = (height - logoSize.height) / 2; break;
            case 'bottom': y = height - logoSize.height; break;
        }

        return { x, y };
    };

    useEffect(() => {
        if (logoImg && !hasDragged) {
            if (productOverLogoXcoord != null && productOverLogoYcoord != null) {
                setLogoPosition({ x: productOverLogoXcoord, y: productOverLogoYcoord });
            } else {
                const initial = calculateInitialLogoPosition(productLogoPosition);
                setLogoPosition(initial);
            }
        }
    }, [logoImg, productLogoPosition, width, height, productOverLogoXcoord, productOverLogoYcoord, hasDragged]);

    return (
        <Rnd
            size={{ width, height }}
            bounds="parent"
            enableResizing={false}
            onDoubleClick={() => handleCanvas(id)}
            className="position-relative"
        >
            <div
                ref={productContainerRef}
                className="position-relative w-100 h-100 m-2 d-flex align-items-center justify-content-center overflow-hidden"
            >
                {image ? (
                    <>
                        <img
                            src={image}
                            alt={alt || 'Product Image'}
                            style={{
                                width: rotation === 0 ? '100%' : height,
                                height: rotation === 0 ? '100%' : width,
                                objectFit: 'cover',
                                transform: `rotate(${rotation}deg)`
                            }}
                            draggable={false}
                        />

                        {logoImg && productContainerRef.current && (
                            <Rnd
                                bounds="parent"
                                size={logoSize}
                                position={logoPosition}
                                enableResizing={false}
                                draggable={!isPreview}
                                onDragStop={(e, d) => {
                                    setLogoPosition({ x: d.x, y: d.y });
                                    setHasDragged(true);

                                    if (isPreview) return;

                                    if (editingImageData && editingImageData.productData) {
                                        const updatedProductData = editingImageData.productData.map((product) => {
                                            if (product.categoryId === id) {
                                                return {
                                                    ...product,
                                                    productOverLogoXcoord: d.x,
                                                    productOverLogoYcoord: d.y,
                                                };
                                            }
                                            return product;
                                        });

                                        setNewPayloadData({
                                            ...editingImageData,
                                            productData: updatedProductData,
                                        });

                                        setEditingImageData({
                                            ...editingImageData,
                                            productData: updatedProductData,
                                        });
                                    }
                                }}
                                className="position-absolute"
                            >
                                <img
                                    src={logoImg}
                                    alt="Logo"
                                    className="w-100 h-100"
                                    style={{
                                        objectFit: 'contain',
                                        transform: `rotate(${rotation + (productLogoAlignment === 'vertical' ? 90 : 0)}deg)`
                                    }}
                                    draggable={false}
                                />
                            </Rnd>
                        )}
                    </>
                ) : (
                    <PlusIcon aria-hidden="true" className="text-warning" style={{ width: '24px', height: '24px' }} />
                )}
            </div>
        </Rnd>
    );
}

export default ProductAndLogoSet;
