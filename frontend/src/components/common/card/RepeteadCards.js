import React from 'react';
import { SHORT_IMG_URL, IMG_EXT } from '../../../helpers/constants.js';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export const RepeteadCards = ({
    image, cardName, amount, cardId
}) => {
    return (
        <>
            <div className="col-sm-3 mb-3 mt-3 rounded repeated-link" >
                <a data-name={cardId} href="/">

                    <div className='row'>
                        <div className="col-sm-3 p-0 background-white shadow ">
                            <div className="card card-block">
                                <LazyLoadImage
                                    className="img-list"
                                    alt={`${cardName}`}
                                    src={`${SHORT_IMG_URL + image + IMG_EXT}`}
                                />
                            </div>
                        </div>

                        <div className="col-sm-8 p-0 background-white shadow">
                            <div className='row align-items-center text-center mt-3'>
                                <h6>{cardName}</h6>
                                <div>
                                    <div className='row'>
                                        <div className='col-sm-6'>
                                            <span><strong>Amount:   </strong></span><br />
                                            <span style={{ fontSize: "18px" }}>{amount}</span>
                                        </div>
                                        <div className='col-sm-6'>
                                            <span><strong>Surplus:   </strong></span><br />
                                            <span style={{ fontSize: "18px" }} className='text-danger'><strong>{(amount - 3)}</strong></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            </div>

        </>
    )
};
