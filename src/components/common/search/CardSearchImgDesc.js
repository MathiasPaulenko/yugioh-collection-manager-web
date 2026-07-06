import React from 'react'

export const CardSearchImgDesc = ({ card }) => {

    return (
        <>
            <div className='mt-5'>
                <div className='row'>
                    <div className='col-sm-6 text-center'>
                        <h5>Image</h5>
                        <a data-name={card.id} href="/">
                            <img
                                alt={card.id}
                                src={card.card_images[0].image_url}
                                style={{
                                    width: "25%"
                                }}
                                className="zoom-effect-1-5"
                            />
                        </a>
                    </div>
                    <div className='col-sm-6'>
                        <h5 className='text-center'>Description</h5>
                        <code className='text-justify pre-break'>{card.desc.replaceAll("\n", "\\n").replaceAll("\r", "\\r")}</code>
                    </div>
                </div>
            </div>
        </>
    )
}
