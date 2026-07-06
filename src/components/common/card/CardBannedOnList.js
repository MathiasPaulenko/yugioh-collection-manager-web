import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { LARGE_IMG_URL, IMG_EXT } from '../../../helpers/constants.js';

export const CardBannedOnList = ({
    image,
    card_name,
    banlist_info,
    list
}) => {


    let status = ""
    if (list === "TCG") {
        status = banlist_info['ban_tcg'];

    } else {
        status = banlist_info['ban_ocg'];
    }

    return (
        <div className="col-sm-2 mt-2 mb-2 rounded">

            <div className="card card-block border-0 shadow-black zoom-effect-1-1">
                <a data-name={image} href="/">
                    <img
                        className='float-ban-img'
                        alt={status}
                        src={`/assets/img/ban/${status}.svg`}
                    />
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
