import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { LARGE_IMG_URL, IMG_EXT } from '../../../helpers/constants.js';

export const CardRelatedOnList = ({
    image,
    serial_code = "",
    rarity
}) => {


    return (
        <div className="col-sm-1 mt-2 mb-2 rounded">
            <div className="card card-block border-0 zoom-effect-2 bg-trasparent">
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
                    />
                </a>

            </div>
        </div>
    )
};
