import React from 'react'
import { useNavigate } from 'react-router-dom';

export const TypeCard = ({
    background_image,
    card_image,
    type,
    page
}) => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate(`/add/${page}`);
    };

    const background_path = `'/assets/img/add/${background_image}'`

    return (
        <>
            <div className="col-sm-4 mb-3 animate__animated animate__fadeIn">
                <div className="row p-3 text-white rounded-3 shadow-sm m-1 card-add" style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.0)), url(/assets/img/add/${background_image})`,
                    backgroundPosition: 'center top',
                    backgroundSize: 'cover',
                    minHeight: '140px',
                }}>
                    <div className="col-sm-3 d-flex align-items-center">
                        <img src={`/assets/img/type/${card_image}.jpg`} alt={type} className="img-fluid"></img>
                    </div>
                    <div className="col-sm-9 d-flex flex-column justify-content-center">
                        <h6 className="mb-2">{type}</h6>
                        <button
                            className="btn btn-light btn-sm w-100"
                            onClick={handleNavigation}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
