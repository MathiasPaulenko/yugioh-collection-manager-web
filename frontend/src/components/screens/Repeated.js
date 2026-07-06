import React from 'react'

import { useCard } from "../../hooks/useCard";
import { Title } from "../common/Title";
import { Loading } from "../common/Loading";
import { ReturnButton } from '../common/ReturnButton';
import { FaExclamationTriangle, FaCopy } from 'react-icons/fa';

import { BASE_URL } from '../../helpers/constants.js';
import { RepeteadCards } from '../common/card/RepeteadCards';

export const Repeated = () => {
    const { loading, data } = useCard(`${BASE_URL}collection/repeated`);
    const cardData = !!data && data.data;
    const totalRepeated = cardData ? cardData.length : 0;
    const totalSurplus = cardData ? cardData.reduce((sum, c) => sum + (c.amount - 3), 0) : 0;

    return (
        <>
            <div className='row align-items-center mb-3'>
                <div className='col-sm-8'>
                    <Title value='Repeated Cards' />
                    <p className="text-muted mb-0 small">
                        Cards with more than 3 copies. The game limits deck copies to 3 of the same card.
                    </p>
                </div>
                <div className="col-sm-4 text-end">
                    <ReturnButton value="Return" />
                </div>
            </div>

            {!loading && cardData && cardData.length > 0 && (
                <div className="repeated-summary mb-3">
                    <div className="repeated-summary-item">
                        <FaCopy size={14} />
                        <span><strong>{totalRepeated}</strong> repeated cards</span>
                    </div>
                    <div className="repeated-summary-item">
                        <FaExclamationTriangle size={14} />
                        <span><strong>{totalSurplus}</strong> surplus copies</span>
                    </div>
                </div>
            )}

            {loading
                ? <Loading />
                : (
                    <>
                        {(() => {
                            if (!cardData) {
                                return <div className="alert alert-danger mt-3">Data not found: Backend is off.</div>
                            }
                            if (cardData.length === 0) {
                                return (
                                    <div className="coll-empty text-center py-5">
                                        <div className="coll-empty-icon mb-2"><FaCopy size={32} /></div>
                                        <p className="text-muted mb-0">No repeated cards found. Your collection is clean!</p>
                                    </div>
                                )
                            }
                            return (
                                <div className="repeated-list animate__animated animate__fadeIn">
                                    {cardData.map(card => (
                                        <RepeteadCards
                                            key={card.card_number}
                                            name={card.card_number}
                                            image={card.card_number}
                                            cardName={card.name}
                                            amount={card.amount}
                                            cardId={card.card_number}
                                        />
                                    ))}
                                </div>
                            )
                        })()}
                    </>
                )
            }
        </>
    )
}
