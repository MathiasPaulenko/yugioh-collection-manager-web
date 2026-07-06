import React from 'react'

import { useCard } from "../../hooks/useCard";
import { Title } from "../common/Title";
import { Loading } from "../common/Loading";
import { ReturnButton } from '../common/ReturnButton';

import { BASE_URL } from '../../helpers/constants.js';
import { RepeteadCards } from '../common/card/RepeteadCards';

export const Repeated = () => {
    const { loading, data } = useCard(`${BASE_URL}collection/repeated`);
    const cardData = !!data && data.data;

    return (
        <>
            <div className='row mt-3 align-items-center mb-3'>
                <div className='col-sm-10'>
                    <Title value='Repeated' />
                    <span>Repeated cards are those cards that have more than 3 copies. Because in the game, it is not allowed in the deck, more than 3 copies of the same card.</span>
                </div>
                <div className="col-sm-2">
                    <ReturnButton value="Return" />
                </div>
            </div>
            <hr />
            
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
                                                <div className="row mt-3 animate__animated animate__fadeIn">
                                                    {
                                                        cardData.map(card => (
                                                            <RepeteadCards
                                                                key={card.card_number}
                                                                name={card.card_number}
                                                                image={card.card_number}
                                                                cardName={card.name}
                                                                amount={card.amount}
                                                                cardId={card.card_number}
                                                            />
                                                        ))
                                                    }

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
