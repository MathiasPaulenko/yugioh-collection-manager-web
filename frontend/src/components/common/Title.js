import React from 'react'

export const Title = ({ value }) => {
    return (
        <div className='animate__animated animate__fadeIn'>
            <h1 className="fw-bold mb-0">{value}</h1>
        </div>
    )
}
