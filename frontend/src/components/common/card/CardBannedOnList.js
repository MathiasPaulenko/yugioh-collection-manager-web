import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { YGO_PIC } from '../../../helpers/constants.js';

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

    const statusIcon = status === 'Forbidden' ? 'Banned' : status;

    return (
        <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-3">
            <div className="coll-card zoom-effect-1-1 rounded-3 overflow-visible h-100">
                <a className="coll-card-link text-decoration-none position-relative" data-name={image} href="/">
                    <img
                        className="banlist-icon"
                        alt={status}
                        src={`/assets/img/ban/${statusIcon}.svg`}
                    />
                    <LazyLoadImage
                        className="coll-card-img"
                        alt={card_name}
                        src={image}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = `${YGO_PIC}back_high.jpg`;
                        }}
                    />
                </a>
                <div className="coll-card-body p-2 text-center">
                    <h6 className="coll-card-title text-truncate mb-0">{card_name}</h6>
                </div>
            </div>
        </div>
    )
};
