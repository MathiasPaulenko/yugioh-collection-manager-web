import React from 'react'
import { useNavigate } from 'react-router-dom'

export const ReturnButton = ({ value }) => {

    const navigate = useNavigate();

    const handleReturn = () => {
        navigate(-1);
    }


    return (
        <div className='align-right'>
            <button
                type="button"
                className="btn btn-secondary"
                onClick={handleReturn}
            >
                Return
            </button>
        </div>
    )
}
