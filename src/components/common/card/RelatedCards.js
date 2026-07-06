import React from 'react'
import { useFilterCard } from '../../../hooks/useFilterCard';

import { BASE_URL } from '../../../helpers/constants.js';
import { Loading } from '../Loading';
import { CardRelatedOnList } from './CardRelatedOnList';

export const RelatedCards = ({
    title = "Related Cards",
    cardType = "",
    cardSubtype = "",
    limit = "36",
    archetype = "",
    unique = true
}
) => {

    const queries_filters = {
        type: cardType,
        subtype: cardSubtype,
        limit: limit,
        archetype: archetype
    };
    
    if(unique){
        queries_filters["distinct"] = "distinct=true"
    }
    
    const { loading, data } = useFilterCard(`${BASE_URL}collection/card/`, queries_filters);
    const cardData = !!data && data.data;

    return (
        <>
            {
                loading
                    ?
                    (
                        <Loading />
                    )
                    :
                    (
                        <>
                            {
                                (() => {
                                    if (!cardData) {
                                        return <div className="alert alert-danger mt-3">Data no found: Backend is off. </div>

                                    } else if (cardData) {
                                        return (
                                            <>
                                                <div className="row mt-5 mb-3 animate__animated animate__fadeIn" >

                                                    <div className="col-sm-12 m-2">
                                                        <h5 className='mb-3'>{`${title}:`}</h5>
                                                        <div className='new-line'></div>
                                                        <div className='new-line'>
                                                            <div className="row mt-3 animate__animated animate__fadeIn">
                                                                {
                                                                    cardData.map(card => (
                                                                        <CardRelatedOnList
                                                                            key={card.serial_code}
                                                                            name={card.serial_code}
                                                                            image={card.img_code}
                                                                            serial_code={card.serial_code}
                                                                            rarity={card.rarity}
                                                                        />
                                                                    ))
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }
                                })()
                            }
                        </>
                    )
            }
        </>
    )
}
