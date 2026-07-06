import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

import { BASE_URL } from '../../../helpers/constants.js';

import "../../../statics/css/main.css";


export const ConstrolsButtonsCardDetail = ({ serial_code }) => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleIncrease = () => {
        fetch(`${BASE_URL}collection/increase/${serial_code}/`).then(window.location.reload());
    };

    const handleDecrease = () => {
        fetch(`${BASE_URL}collection/decrease/${serial_code}/`).then(window.location.reload());
    };

    const deleteCard = () => {
        fetch(`${BASE_URL}collection/card/${serial_code}/`, { method: 'DELETE' })
            .then(
                setTimeout(function () {
                    navigate('/')
                }, 500)
            );

    }

    const handleUpdate = () => {
        navigate(`/card/update/${serial_code}`);
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className="card shadow-sm border-0 mt-3 mb-3 animate__animated animate__fadeInUp" >
                <div className='card-body p-3'>
                    <h5 className='mb-3'>Controls:</h5>
                    <hr />
                    <div className='d-flex flex-wrap gap-2 justify-content-between align-items-center'>
                        <div className='d-flex gap-2'>
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={handleUpdate}
                            >
                                Update
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={handleShow}
                            >
                                Delete
                            </button>
                        </div>
                        <div className='d-flex gap-2'>
                            <button
                                type="button"
                                className="btn btn-warning"
                                onClick={handleDecrease}
                            >
                                Decrease
                            </button>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={handleIncrease}
                            >
                                Increase
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>¡You are about to remove a card!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to continue?</Modal.Body>
                <Modal.Footer>
                    <Button variant="btn btn-danger" onClick={deleteCard}>
                        Yes
                    </Button>
                    <Button variant="btn btn-outline-secondary" onClick={handleClose}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
};

export const SetAndPriceButtons = ({ set_name, name }) => {
    const navigate = useNavigate();

    const handleCardSet = () => {
        navigate(`/cardset?q=${set_name.replace("&", "%26")}`);
    };

    const handlePrice = () => {
        navigate(`/prices?q=${name.replace("&", "%26")}`);
    };

    return (
        <div className='d-flex gap-2 justify-content-end mt-3 mb-3'>
            <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleCardSet}
            >
                Go to Card Set
            </button>

            <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handlePrice}
            >
                Go to Prices
            </button>
        </div>
    )
}
