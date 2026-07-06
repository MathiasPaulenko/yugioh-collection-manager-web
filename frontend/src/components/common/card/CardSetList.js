import React, { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { LARGE_IMG_URL, IMG_EXT, BASE_URL } from '../../../helpers/constants.js';
import { getPriceFromCardSet, getSetCodeFromCardSet } from '../../../helpers/utils.js';

export const CardSetList = ({
    image,
    card_name,
    card_sets,
    set_name,
    color
}) => {

    const [inCollection, setInCollection] = useState("card-img-top shadow-black zoom-effect-1-1");

    let setCode = "";
    let price = "";
    if (card_sets) {
        setCode = getSetCodeFromCardSet(card_sets, set_name);
        price = getPriceFromCardSet(card_sets, set_name);
    }

    useEffect(async () => {
        await fetch(`${BASE_URL}collection/incollection/${setCode}/`)
            .then(resp => resp.json())
            .then(data => {
                if (data.hasOwnProperty('detail')) {
                    if (color) {
                        setInCollection("img-gray card-img-top shadow-black zoom-effect-1-1");
                    }
                } else {
                    setInCollection("card-img-top shadow-black zoom-effect-1-1");
                }

            }).catch((err) => {
                console.log("");
            });

    }, [color, inCollection]);

    return (
        <div className="col-sm-2 mt-2 mb-3 rounded">
            <div className="card card-block border-0">
                <a data-name={image} href="/">
                    <LazyLoadImage
                        key={card_name}
                        className={inCollection}
                        alt={`${card_name}`}
                        src={`${LARGE_IMG_URL + image + IMG_EXT}`}
                    />
                </a>
                <div className="card-block mt-2 mb-2 text-center">
                    <h6 className="card-title mt-1">{card_name}</h6>
                    <div className='row'>
                        <div className='col-sm-7'>
                            <span >{setCode}</span>
                        </div>
                        <div className='col-sm-5'>
                            <span >{`$ ${price}`}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
