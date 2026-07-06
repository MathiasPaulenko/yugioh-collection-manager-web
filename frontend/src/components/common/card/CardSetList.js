import React, { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { LARGE_IMG_URL, IMG_EXT, BASE_URL, YGO_PIC } from '../../../helpers/constants.js';
import { getPriceFromCardSet, getSetCodeFromCardSet } from '../../../helpers/utils.js';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export const CardSetList = ({
    image,
    card_name,
    card_sets,
    set_name,
    color
}) => {

    const [inCollection, setInCollection] = useState(null);

    let setCode = "";
    let price = "";
    if (card_sets) {
        setCode = getSetCodeFromCardSet(card_sets, set_name);
        price = getPriceFromCardSet(card_sets, set_name);
    }

    useEffect(() => {
        let mounted = true;
        if (!setCode) return;
        fetch(BASE_URL + 'collection/incollection/' + setCode + '/')
            .then(resp => resp.json())
            .then(data => {
                if (!mounted) return;
                if (data.hasOwnProperty('detail')) {
                    setInCollection(false);
                } else {
                    setInCollection(true);
                }
            }).catch(() => {
                if (mounted) setInCollection(false);
            });
        return () => { mounted = false };
    }, [setCode]);

    const imgSrc = LARGE_IMG_URL + image + IMG_EXT;
    const showGray = color && inCollection === false;

    return (
        <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-3">
            <div className="coll-card zoom-effect-1-1 rounded-3 overflow-visible h-100">
                <a className="coll-card-link text-decoration-none position-relative" data-name={image} href="/">
                    <LazyLoadImage
                        className={"coll-card-img" + (showGray ? " img-gray" : "")}
                        alt={card_name}
                        src={imgSrc}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = YGO_PIC + 'back_high.jpg';
                        }}
                    />
                    {inCollection !== null && (
                        <div className="cardset-collection-badge">
                            {inCollection
                                ? <FaCheckCircle size={14} className="text-success" />
                                : <FaTimesCircle size={14} className="text-danger" />
                            }
                        </div>
                    )}
                </a>
                <div className="coll-card-body p-2 text-center">
                    <h6 className="coll-card-title text-truncate mb-1" title={card_name}>{card_name}</h6>
                    <div className="cardset-info-row">
                        <span className="cardset-set-code">{setCode}</span>
                        <span className="cardset-set-price">${price}</span>
                    </div>
                </div>
            </div>
        </div>
    )
};
