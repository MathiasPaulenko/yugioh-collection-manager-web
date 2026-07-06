import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

import { Title } from '../../common/Title'
import { InputField, SelectField } from '../../common/search/InputField'
import { BASE_URL } from '../../../helpers/constants.js';
import "../../../statics/css/main.css"
import { ReturnButton } from '../../common/ReturnButton';
import { RelatedCards } from '../../common/card/RelatedCards';


export const SpellAddCardScreen = () => {
    const navigate = useNavigate();
    const [bodyRequest, setBodyRequest] = useState(spellBodyRequest);
    const [messageResponse, setMessageResponse] = useState({});
    const [show, setShow] = useState(false);


    useEffect(() => {
        const serial_code = bodyRequest.serial_code;

        const sendRequest = async () => {

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyRequest)
            };

            const res = await fetch(`${BASE_URL}collection/create`, requestOptions)
                .catch((error) => {
                    console.log(error.message);

                });

            const body = await res.json();

            setMessageResponse(body);

            if (body.serial_code) {
                handleShow();

            }

        }

        if (serial_code !== "") {
            sendRequest(bodyRequest);

        }


    }, [bodyRequest]);

    const handleAddCard = (e) => {
        e.preventDefault();

        for (let i = 0; i < e.target.length; i++) {
            if (e.target[i].value !== '') {
                setBodyRequest((prevState) => ({
                    ...prevState,
                    [e.target[i].name]: e.target[i].value

                }));
            }
        }
    };

    const handleReset = (e) => {
        navigate('/add/normal');
    };

    const handleAddAnotherCard = (e) => {
        navigate('/add');
    };


    const handleGoDetail = (e) => {
        const serial_code = bodyRequest.serial_code;
        navigate(`/card/${serial_code}`);

    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>


            <div className='row mt-3 align-items-center mb-3'>
                <div className='col-sm-8'>
                    <Title value='Add New Spell Card' />
                </div>
                <div className="col-sm-4">
                    <ReturnButton value="Return" />
                </div>
            </div>


            {
                (messageResponse.detail) && <div className="alert alert-danger text-capitalize">{messageResponse.detail}</div>
            }


            <form className="animate__animated animate__fadeIn" onSubmit={handleAddCard}>
                <div className="row ">
                    <InputField req={true} type="text" info="Serial Code" />
                    <InputField req={true} type="text" info="Card Number" />
                    <InputField req={true} type="text" info="Name" />
                    <InputField req={true} type="text" info="Description" />
                    <SelectField path="info/magic_trap_race/" name="Race" />
                    <InputField type="text" info="Archetype" />
                    <InputField req={true} type="text" info="Img Code" />
                    <SelectField path="info/rarity/" name="Rarity" />
                    <InputField type="text" info="Edition" />
                    <InputField type="text" info="Set Name" />
                    <InputField req={true} type="number" info="Amount" autoComplete="on" />
                    <InputField type="text" info="Format" />
                    <InputField type="text" info="Note" />
                    <InputField type="text" info="Banned" />
                    <InputField type="text" info="Language" />

                    <div className="col-sm-3 mt-2 mb-2"></div>
                    <div className="col-sm-3 mt-2 mb-2">
                        <button
                            className="btn form-control"
                            style={{
                                background: "#048e77",
                                color: 'white'
                            }}
                            type="submit"
                            id="submit"
                        >
                            Add
                        </button>
                    </div>
                    <div className="col-sm-3 mt-2 mb-2">
                        <button
                            className="btn btn-outline-secondary form-control"
                            type="reset"
                            onClick={handleReset}
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </form>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>¡Card added!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want to go to the detail of the card or add another?</Modal.Body>
                <Modal.Footer>
                    <Button variant="btn btn-secondary" onClick={handleAddAnotherCard}>
                        Add Another Card
                    </Button>
                    <Button variant="btn btn-outline-secondary" onClick={handleGoDetail}>
                        Go to the Detail
                    </Button>
                </Modal.Footer>
            </Modal>

            <RelatedCards cardType="Spell" cardSubtype='Spell Card' title='Card of the same type in the collection' />

        </>
    )
}

export const spellBodyRequest = {
    serial_code: "",
    card_number: "",
    name: "",
    description: "",
    type: "Spell",
    subtype: "Spell Card",
    race: "",
    archetype: "",
    img_code: "",
    rarity: "",
    edition: "",
    set_name: "",
    amount: 0,
    format: "",
    note: ""
}
