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
            <div className="col-sm-4 mb-2 mt-2 animate__animated animate__fadeIn">
                <div className="row p-4 text-white card-add shadow rounded m-2" style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.0)), url(${background_path})`,
                    backgroundPosition: 'center top',
                    backgroundSize: 'cover',
                }}>
                    <div className="col-sm-2">
                        <img src={`/assets/img/type/${card_image}.jpg`} alt={type}></img>
                    </div>
                    <div className="col-sm-10">
                        <h5>{type}</h5>
                        <button
                            className="btn btn-secondary w-50"
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
