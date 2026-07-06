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
            <div className="row card-body mt-3 mb-3 animate__animated animate__fadeInUp shadow rounded" >
                <div className='col-sm-12 m-2'>
                    <h5 className='mb-3'>Controls:</h5>
                    <hr />
                    <div className='row'>

                        <div className='col-sm-1'>
                            <button
                                type="button"
                                className="btn btn-secondary m-2"
                                onClick={handleUpdate}

                            >
                                Update
                            </button>
                        </div>
                        <div className='col-sm-1'>
                            <button
                                type="button"
                                className="btn btn-danger m-2"
                                onClick={handleShow}

                            >
                                Delete
                            </button>
                        </div>
                        <div className='col-sm-10 align-right'>
                            <button
                                type="button"
                                className="btn btn btn-warning card_button m-2"
                                onClick={handleDecrease}
                            >
                                Decrease
                            </button>
                            <button
                                type="button"
                                className="btn btn-success card_button m-2"
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
        <div className='container fixed-bottom'>
            <div className='row mb-3'>
                <div className='col-sm-12 align-right'>

                    <button
                        type="button"
                        className="btn btn-outline-secondary m-2"
                        onClick={handleCardSet}
                    >
                        Go to Card Set
                    </button>

                    <button
                        type="button"
                        className="btn btn-outline-secondary m-2"
                        onClick={handlePrice}
                    >
                        Got to Prices

                    </button>
                </div>
            </div>
        </div>
    )
}
