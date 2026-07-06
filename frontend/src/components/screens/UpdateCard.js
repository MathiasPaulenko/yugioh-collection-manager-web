import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

import { useParams } from 'react-router-dom'
import { useCard } from '../../hooks/useCard';

import { BASE_URL, LARGE_IMG_URL, IMG_EXT } from '../../helpers/constants.js';
import { Loading } from '../common/Loading';
import { ReturnButton } from '../common/ReturnButton';
import { Title } from '../common/Title';
import { InputField, MultiSelectField, SelectField } from '../common/search/InputField';


export const UpdateCard = () => {
    const navigate = useNavigate();

    const { serial_code } = useParams();
    const { loading, data } = useCard(`${BASE_URL}collection/card/${serial_code}/`);
    const [bodyRequest, setBodyRequest] = useState({});
    const [messageResponse, setMessageResponse] = useState({});
    const [show, setShow] = useState(false);


    const selectFields = ["race", "rarity", "subtype", "attribute"];

    const cardData = !!data && data;

    const type = cardData.type;
    const subtype = cardData.subtype;
    const size = "col-sm-4"

    if (cardData && (Object.keys(bodyRequest).length === 0)) {
        setBodyRequest(cardData);

    }

    const [isSendRequest, setIsSendRequest] = useState(false);


    useEffect(() => {
        const serial_code = bodyRequest.serial_code;
        const sendRequest = async () => {
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyRequest)
            };

            if (isSendRequest) {
                const res = await fetch(`${BASE_URL}collection/create/${cardData.serial_code}/`, requestOptions)
                    .catch((error) => {
                        console.log(error);
                    });

                const body = await res.json();
                setMessageResponse(body);

                if (isSendRequest && res.ok) {
                    handleShow();
                }
            }
        }

        if (serial_code !== "") {
            sendRequest(bodyRequest);

        }
    }, [bodyRequest, cardData, isSendRequest]);


    const handleAddCard = (e) => {
        e.preventDefault();
        let newLinksMarkers = [];
        for (let i = 0; i < e.target.length; i++) {
            if (e.target[i].value !== '') {
                if (e.target[i].name === 'link_markers') {

                    newLinksMarkers.push(e.target[i].value);
                    setBodyRequest((prevState) => ({
                        ...prevState,
                        link_markers: newLinksMarkers

                    }));
                } else {
                    setBodyRequest((prevState) => ({
                        ...prevState,
                        [e.target[i].name]: e.target[i].value

                    }));
                }

            }

        }

        selectFields.forEach(element => {
            if (bodyRequest[element] === '') {
                setBodyRequest((prevState) => ({
                    ...prevState,
                    [element]: cardData[element]

                }));
            }

            if (element === "link_markers") {
                let newLinksMarkers = [];
                cardData[element].forEach(element => {
                    newLinksMarkers.push(element);

                    setBodyRequest((prevState) => ({
                        ...prevState,
                        link_markers: newLinksMarkers

                    }));
                });
            }
        });

        setIsSendRequest(true);
    };

    const handleReset = (e) => {
        navigate(`/card/update/${serial_code}`);
    };


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleGoDetail = (e) => {
        navigate(`/card/${serial_code}`);

    };

    const handleContinueEditing = (e) => {
        handleClose(e);
        handleReset(e);
    }

    return (
        <>
            {
                loading
                    ?
                    (
                        <Loading />
                    )
                    :
                    (
                        <>
                            <div className='row align-items-center mb-3'>
                                <div className='col-sm-8'>
                                    <Title value={`Update Card: ${cardData.name}`} />
                                </div>
                                <div className="col-sm-4">
                                    <ReturnButton value="Return" />
                                </div>
                            </div>

                            <div className="row g-3 mb-3">
                                <div className="col-sm-2">
                                    <div className="card border-0 shadow-sm rounded-3">
                                        <a className="shadow-black" href={`/card/${serial_code}`} >
                                            <img
                                                className="card-img-top rounded-3"
                                                src={`${LARGE_IMG_URL + cardData.img_code + IMG_EXT}`}
                                                alt={`Card ${serial_code}`}
                                                onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null;
                                                    currentTarget.src = `${LARGE_IMG_URL}back_high.jpg`;
                                                }}
                                            />
                                        </a>
                                    </div>
                                </div>
                                {
                                    (messageResponse.detail) && <div className="alert alert-danger text-capitalize">{messageResponse.detail}</div>
                                }
                                <div className="col-sm-10">

                                    {
                                        (() => {

                                            if (type.toLowerCase() === 'skill') {
                                                return (
                                                    <div className="card bg-light border-0">
                                                        <div className="card-body p-3">
                                                            <form onSubmit={handleAddCard}>
                                                                <div className="row g-2">
                                                                    <InputField size={size} req={true} type="text" info="Serial Code" value={serial_code} />
                                                                    <InputField size={size} req={true} type="text" info="Card Number" value={data.card_number} />
                                                                    <InputField size={size} req={true} type="text" info="Name" value={data.name} />
                                                                    <InputField size={size} req={true} type="text" info="Description" value={data.description} />
                                                                    <InputField size={size} req={true} type="text" info="Race" value={data.race} />
                                                                    <InputField size={size} req={true} type="text" info="Img Code" value={data.img_code} />
                                                                    <SelectField size={size} path="info/rarity/" name="Rarity" defaultValue={data.rarity} />
                                                                    <InputField size={size} type="text" info="Edition" value={data.edition} />
                                                                    <InputField size={size} type="text" info="Set Name" value={data.set_name} />
                                                                    <InputField size={size} req={true} type="number" info="Amount" autoComplete="on" value={data.amount} />
                                                                    <InputField size={size} type="text" info="Format" value={data.format} />
                                                                    <InputField size={size} type="text" info="Note" value={data.note} />
                                                                    <InputField size={size} type="text" info="Banned" value={data.banned} />

                                                                    <div className="col-sm-4 mt-2 mb-2">
                                                                        <button className="btn btn-dark w-100" type="submit" id="submit">
                                                                            Update
                                                                        </button>
                                                                    </div>
                                                                    <div className="col-sm-4 mt-2 mb-2">
                                                                        <button className="btn btn-outline-secondary w-100" type="reset" onClick={handleReset}>
                                                                            Reset
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                )

                                            } else if (type.toLowerCase() === 'spell' || type.toLowerCase() === 'trap') {
                                                return (
                                                    <div className="card bg-light border-0">
                                                        <div className="card-body p-3">
                                                            <form onSubmit={handleAddCard}>
                                                                <div className="row g-2">
                                                                    <InputField size={size} req={true} type="text" info="Serial Code" value={serial_code} />
                                                                    <InputField size={size} req={true} type="text" info="Card Number" value={data.card_number} />
                                                                    <InputField size={size} req={true} type="text" info="Name" value={data.name} />
                                                                    <InputField size={size} req={true} type="text" info="Description" value={data.description} />
                                                                    <SelectField size={size} path="info/magic_trap_race/" name="Race" defaultValue={data.race} />
                                                                    <InputField size={size} type="text" info="Archetype" value={data.archetype} />
                                                                    <InputField size={size} req={true} type="text" info="Img Code" value={data.img_code} />
                                                                    <SelectField size={size} path="info/rarity/" name="Rarity" defaultValue={data.rarity} />
                                                                    <InputField size={size} type="text" info="Edition" value={data.edition} />
                                                                    <InputField size={size} type="text" info="Set Name" value={data.set_name} />
                                                                    <InputField size={size} req={true} type="number" info="Amount" autoComplete="on" value={data.amount} />
                                                                    <InputField size={size} type="text" info="Format" value={data.format} />
                                                                    <InputField size={size} type="text" info="Note" value={data.note} />
                                                                    <InputField size={size} type="text" info="Banned" value={data.banned} />

                                                                    <div className="col-sm-4 mt-2 mb-2"></div>
                                                                    <div className="col-sm-4 mt-2 mb-2">
                                                                        <button className="btn btn-dark w-100" type="submit" id="submit">
                                                                            Update
                                                                        </button>
                                                                    </div>
                                                                    <div className="col-sm-4 mt-2 mb-2">
                                                                        <button className="btn btn-outline-secondary w-100" type="reset" onClick={handleReset}>
                                                                            Reset
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                )

                                            } else {
                                                if (subtype.toLowerCase().includes("pendulum")) {
                                                    return (
                                                        <div className="card bg-light border-0">
                                                            <div className="card-body p-3">
                                                                <form onSubmit={handleAddCard}>
                                                                    <div className="row g-2">
                                                                        <InputField size={size} req={true} type="text" info="Serial Code" value={serial_code} />
                                                                        <InputField size={size} req={true} type="text" info="Card Number" value={data.card_number} />
                                                                        <InputField size={size} req={true} type="text" info="Name" value={data.name} />
                                                                        <InputField size={size} req={true} type="text" info="Description" value={data.description} />
                                                                        <InputField size={size} req={true} type="number" info="Attack" autoComplete="on" value={data.attack} />
                                                                        <InputField size={size} req={true} type="number" info="Defence" autoComplete="on" value={data.defence} />
                                                                        <InputField size={size} req={true} type="number" info="Level" autoComplete="on" value={data.level} />
                                                                        <InputField size={size} req={true} type="number" info="Scale" autoComplete="on" value={data.scale} />
                                                                        <SelectField size={size} path="info/race/" name="Race" defaultValue={data.race} />
                                                                        <SelectField size={size} path="info/subtype/" name="Subtype" defaultValue={data.subtype} />
                                                                        <SelectField size={size} path="info/attribute/" name="Attribute" defaultValue={data.attribute} />
                                                                        <InputField size={size} type="text" info="Archetype" value={data.archetype} />
                                                                        <InputField size={size} req={true} type="text" info="Img Code" value={data.img_code} />
                                                                        <SelectField size={size} path="info/rarity/" name="Rarity" defaultValue={data.rarity} />
                                                                        <InputField size={size} type="text" info="Edition" value={data.edition} />
                                                                        <InputField size={size} type="text" info="Set Name" value={data.set_name} />
                                                                        <InputField size={size} req={true} type="number" info="Amount" autoComplete="on" value={data.amount} />
                                                                        <InputField size={size} type="text" info="Format" value={data.format} />
                                                                        <InputField size={size} type="text" info="Note" value={data.note} />
                                                                        <InputField size={size} type="text" info="Banned" value={data.banned} />

                                                                        <div className="col-sm-4 mt-2 mb-2"></div>
                                                                        <div className="col-sm-4 mt-2 mb-2">
                                                                            <button className="btn btn-dark w-100" type="submit" id="submit">
                                                                                Update
                                                                            </button>
                                                                        </div>
                                                                        <div className="col-sm-4 mt-2 mb-2">
                                                                            <button className="btn btn-outline-secondary w-100" type="reset" onClick={handleReset}>
                                                                                Reset
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    )
                                                } else if (subtype.toLowerCase().includes("link")) {
                                                    return (
                                                        <div className="card bg-light border-0">
                                                            <div className="card-body p-3">
                                                                <form onSubmit={handleAddCard}>
                                                                    <div className="row g-2">
                                                                        <InputField size={size} req={false} type="text" info="Serial Code" value={serial_code} />
                                                                        <InputField size={size} req={false} type="text" info="Card Number" value={data.card_number} />
                                                                        <InputField size={size} req={false} type="text" info="Name" value={data.name} />
                                                                        <InputField size={size} req={false} type="text" info="Description" value={data.description} />
                                                                        <InputField size={size} req={false} type="number" info="Attack" autoComplete="on" value={data.attack} />
                                                                        <SelectField size={size} path="info/race/" name="Race" defaultValue={data.race} />
                                                                        <SelectField size={size} path="info/attribute/" name="Attribute" defaultValue={data.attribute} />
                                                                        <InputField size={size} req={false} type="number" info="Link Value" autoComplete="on" value={data.link_value} />
                                                                        <MultiSelectField size={size} path="info/link_markers/" name="Link Markers" defaultValue={data.link_markers} />
                                                                        <InputField size={size} type="text" info="Archetype" value={data.archetype} />
                                                                        <SelectField size={size} path="info/rarity/" name="Rarity" defaultValue={data.rarity} />
                                                                        <InputField size={size} req={false} type="text" info="Img Code" value={data.img_code} />
                                                                        <InputField size={size} type="text" info="Edition" value={data.edition} />
                                                                        <InputField size={size} type="text" info="Set Name" value={data.set_name} />
                                                                        <InputField size={size} req={false} type="number" info="Amount" autoComplete="on" value={data.amount} />
                                                                        <InputField size={size} type="text" info="Format" value={data.format} />
                                                                        <InputField size={size} type="text" info="Note" value={data.note} />
                                                                        <InputField size={size} type="text" info="Banned" value={data.banned} />

                                                                        <div className="col-sm-4 mt-2 mb-2"></div>
                                                                        <div className="col-sm-4 mt-2 mb-2">
                                                                            <button className="btn btn-dark w-100" type="submit" id="submit">
                                                                                Update
                                                                            </button>
                                                                        </div>
                                                                        <div className="col-sm-4 mt-2 mb-2">
                                                                            <button className="btn btn-outline-secondary w-100" type="reset" onClick={handleReset}>
                                                                                Reset
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    )
                                                } else {

                                                    return (
                                                        <div className="card bg-light border-0">
                                                            <div className="card-body p-3">
                                                                <form onSubmit={handleAddCard}>
                                                                    <div className="row g-2">
                                                                        <InputField size={size} req={true} type="text" info="Serial Code" value={serial_code} />
                                                                        <InputField size={size} req={true} type="text" info="Card Number" value={data.card_number} />
                                                                        <InputField size={size} req={true} type="text" info="Name" value={data.name} />
                                                                        <InputField size={size} req={true} type="text" info="Description" value={data.description} />
                                                                        <InputField size={size} req={true} type="number" info="Attack" autoComplete="on" value={data.attack} />
                                                                        <InputField size={size} req={true} type="number" info="Defence" autoComplete="on" value={data.defence} />
                                                                        <InputField size={size} req={true} type="number" info="Level" autoComplete="on" value={data.level} />
                                                                        <SelectField size={size} path="info/race/" name="Race" defaultValue={data.race} />
                                                                        <SelectField size={size} path="info/subtype/" name="Subtype" defaultValue={data.subtype} />
                                                                        <SelectField size={size} path="info/attribute/" name="Attribute" defaultValue={data.attribute} />
                                                                        <InputField size={size} type="text" info="Archetype" value={data.archetype} />
                                                                        <InputField size={size} req={true} type="text" info="Img Code" value={data.img_code} />
                                                                        <SelectField size={size} path="info/rarity/" name="Rarity" defaultValue={data.rarity} />
                                                                        <InputField size={size} type="text" info="Edition" value={data.edition} />
                                                                        <InputField size={size} type="text" info="Set Name" value={data.set_name} />
                                                                        <InputField size={size} req={true} type="number" info="Amount" autoComplete="on" value={data.amount} />
                                                                        <InputField size={size} type="text" info="Format" value={data.format} />
                                                                        <InputField size={size} type="text" info="Note" value={data.note} />
                                                                        <InputField size={size} type="text" info="Banned" value={data.banned} />

                                                                        <div className="col-sm-4 mt-2 mb-2">
                                                                            <button className="btn btn-dark w-100" type="submit" id="submit">
                                                                                Update
                                                                            </button>
                                                                        </div>
                                                                        <div className="col-sm-4 mt-2 mb-2">
                                                                            <button className="btn btn-outline-secondary w-100" type="reset" onClick={handleReset}>
                                                                                Reset
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            }

                                        })()
                                    }
                                </div>
                            </div>
                        </>
                    )
            }

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>¡Card Update!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your letter has been updated. What would you like to do?</Modal.Body>
                <Modal.Footer>
                    <Button variant="btn btn-secondary" onClick={handleContinueEditing}>
                        Continue editing
                    </Button>
                    <Button variant="btn btn-outline-secondary" onClick={handleGoDetail}>
                        Go to the card detail
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}
