import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa';

export const ReturnButton = ({ value }) => {

    const navigate = useNavigate();

    const handleReturn = () => {
        navigate(-1);
    }

    return (
        <div className='align-right'>
            <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleReturn}
            >
                <FaArrowLeft className="me-1" /> {value}
            </button>
        </div>
    )
}
