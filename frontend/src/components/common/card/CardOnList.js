import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { LARGE_IMG_URL, IMG_EXT, YGO_PIC } from '../../../helpers/constants.js';

export const CardOnList = ({
    image,
    card_name,
    serial_code = "",
    rarity
}) => {


    return (
        <div className="col-sm-2 mt-2 mb-2 rounded">
            <div className="card card-block border-0 zoom-effect-1-1">
                <div className='rarity-label'>
                    <img
                        className=''
                        alt={rarity}
                        src={`/assets/img/rarity_label/${rarity}.webp`}
                    />
                </div>
                <a className="shadow-black" href={`/card/${serial_code}`} >
                    <LazyLoadImage
                        className="card-img-top"
                        alt={`Card ${serial_code}`}
                        src={`${LARGE_IMG_URL + image + IMG_EXT}`}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = `${YGO_PIC}back_high.jpg`;
                        }}
                    />
                </a>

            </div>
            <div className="card-block mt-2 text-center">
                <h6 className="card-title mt-1">{card_name}</h6>
                <p>{serial_code}</p>
            </div>
        </div>
    )
};
