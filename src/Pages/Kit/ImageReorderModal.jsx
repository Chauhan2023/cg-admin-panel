import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { apiPut } from '../../Api/apiMethods';

const ImageReorderModal = ({ show, handleClose, imageArray = [], api, fetch }) => {
    const [images, setImages] = useState([]);
    const [originalImages, setOriginalImages] = useState([]);

    useEffect(() => {
        setImages(imageArray);
        setOriginalImages(imageArray);
    }, [imageArray]);

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const reordered = Array.from(images);
        const [moved] = reordered.splice(result.source.index, 1);
        reordered.splice(result.destination.index, 0, moved);
        setImages(reordered);
    };

    const handleRemove = (indexToRemove) => {
        setImages(prev => prev.filter((_, i) => i !== indexToRemove));
    };

    const handleReset = () => {
        setImages(originalImages);
    };

    const handleSave = async () => {
        try {
            const res = await apiPut(api, { multipleImage: images });
            toast.success("Images updated successfully!");
            fetch();
            handleClose();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to update images.");
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Rearrange Images</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="images" direction="horizontal">
                        {(provided) => (
                            <div
                                className="image-grid"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {images.map((img, index) => (
                                    <Draggable key={img.id || img} draggableId={img.id?.toString() || img} index={index}>
                                        {(provided) => (
                                            <div
                                                className="image-box"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{
                                                    ...provided.draggableProps.style
                                                }}
                                            >
                                                <div className="position-relative">
                                                    <img
                                                        src={img.url || img}
                                                        alt={`img-${index}`}
                                                        className="img-fluid "
                                                    />
                                                    <button
                                                        className="close"
                                                        onClick={() => handleRemove(index)}
                                                    >
                                                        <i class="ri-close-fill"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleReset}>Reset</Button>
                <Button variant="primary" onClick={handleSave}>Save</Button>
                <Button variant="danger" onClick={handleClose}>Cancel</Button>
            </Modal.Footer>

            <style jsx>{`
                .image-grid {
                    display: block;
                    width: 100%;
                    margin-top: 10px;
                }

                .image-box {
                    width: 150px;
                    height: 150px;
                    display: inline-block;
                    position: relative;
                    margin: 8px;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    background: #f8f9fa;
                    vertical-align: top;
                    overflow: hidden;
                }

                .image-box img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                    .close{
                    position: absolute;
                    top: 0px;
                    right: 0px;
                  
                    cursor: pointer;
                    border-radius: 50%;
                    height: 20px;
                    width: 20px;
                    border: none;
                    background-color: rgba(0, 0, 0, 0.5);
                    color: #fff;
                    background-color: rgba(252, 2, 2, 0.62);

                    }

        

            `}</style>
        </Modal>
    );
};

export default ImageReorderModal;
