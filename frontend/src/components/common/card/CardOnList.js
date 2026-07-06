import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { LARGE_IMG_URL, IMG_EXT, YGO_PIC } from '../../../helpers/constants.js';

export const CardOnList = ({
    image,
    card_name,
    serial_code = "",
    rarity,
    amount = 1
}) => {
    return (
        <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-3">
            <div className="coll-card zoom-effect-1-1 rounded-3 overflow-visible h-100">
                <div className='rarity-label'>
                    <img
                        alt={rarity}
                        src={`/assets/img/rarity_label/${rarity}.webp`}
                    />
                </div>
                <a className="coll-card-link text-decoration-none position-relative" data-rarity={rarity} href={`/card/${serial_code}`}>
                    <LazyLoadImage
                        className="coll-card-img"
                        alt={`Card ${serial_code}`}
                        src={`${LARGE_IMG_URL + image + IMG_EXT}`}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = `${YGO_PIC}back_high.jpg`;
                        }}
                    />
                    {amount > 1 && (
                        <span className="coll-amount-badge">×{amount}</span>
                    )}
                </a>
                <div className="coll-card-body p-2 text-center">
                    <h6 className="coll-card-title text-truncate mb-1">{card_name}</h6>
                    <p className="coll-card-serial text-muted mb-0">{serial_code}</p>
                </div>
            </div>
        </div>
    )
};
