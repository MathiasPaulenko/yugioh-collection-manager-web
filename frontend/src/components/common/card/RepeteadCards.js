import React from 'react';
import { SHORT_IMG_URL, IMG_EXT } from '../../../helpers/constants.js';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FaExclamationTriangle } from 'react-icons/fa';

export const RepeteadCards = ({
    image, cardName, amount, cardId
}) => {
    const surplus = amount - 3;

    return (
        <div className="repeated-row">
            <a data-name={cardId} href="/" className="text-decoration-none">
                <div className="repeated-row-content">
                    <div className="repeated-row-thumb">
                        <LazyLoadImage
                            alt={cardName}
                            src={`${SHORT_IMG_URL + image + IMG_EXT}`}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = `${SHORT_IMG_URL}back_high.jpg`;
                            }}
                        />
                    </div>
                    <span className="repeated-row-name">{cardName}</span>
                    <span className="repeated-row-card-number text-muted">{cardId}</span>
                    <span className="repeated-row-amount">
                        <span className="repeated-row-amount-label">Copies</span>
                        <span className="repeated-row-amount-value">{amount}</span>
                    </span>
                    <span className="repeated-row-surplus">
                        <FaExclamationTriangle size={11} />
                        <span>+{surplus}</span>
                    </span>
                </div>
            </a>
        </div>
    )
};
