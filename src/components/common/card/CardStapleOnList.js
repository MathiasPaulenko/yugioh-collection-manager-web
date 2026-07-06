import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { LARGE_IMG_URL, IMG_EXT } from '../../../helpers/constants.js';

export const CardStapleOnList = ({
    image,
    card_name,
}) => {


    return (
        <div className="col-sm-2 mt-2 mb-2 rounded">
            <div className="card card-block border-0 zoom-effect-1-1">
                <a data-name={image} href="/">
                    <LazyLoadImage
                        className="card-img-top"
                        alt={card_name}
                        src={`${LARGE_IMG_URL + image + IMG_EXT}`}
                    />
                </a>
            </div>
            <div className="card-block mt-2 text-center">
                <h6 className="card-title mt-1">{card_name}</h6>
            </div>
        </div>
    )
};
