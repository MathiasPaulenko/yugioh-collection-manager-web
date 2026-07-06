import React from 'react'
import { useLocation } from 'react-router-dom';
import queryString from 'query-string'
import { useForm } from '../../hooks/useForm';
import { Loading } from "../common/Loading";
import { YGO_API, YGO_IMG_SET, YGO_PIC } from '../../helpers/constants.js';
import { SearchCard } from '../common/search/SearchCard';
import { ReturnButton } from '../common/ReturnButton';
import { Title } from '../common/Title';
import { CardPrices } from '../common/card/CardPrices';
import { usePrices } from '../../hooks/usePrices';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FaBoxes, FaBarcode, FaTag, FaDollarSign } from 'react-icons/fa'

export const PricesScreen = () => {
    const location = useLocation();

    const { q = '' } = queryString.parse(location.search);

    const [formValues, handleInputChange] = useForm({
        searchText: q,
    });

    const { loading, data } = usePrices(YGO_API, '?name=' + q);

    let error = false;
    if (data && data.hasOwnProperty('error')) {
        error = true;
    }

    const cardData = !!data && data.data;

    let cardSets = {}
    if (cardData) {
        cardSets = cardData[0].card_sets
    }

    return (
        <>
            <div className='row align-items-center mb-3'>
                <div className='col-sm-8'>
                    <Title value='Prices' />
                    <p className="text-muted mb-0 small">Market prices across different platforms, with currency conversion.</p>
                </div>
                <div className="col-sm-4 text-end">
                    <ReturnButton value="Return" />
                </div>
            </div>

            <SearchCard
                value={formValues}
                handle={handleInputChange}
                resetValue='/prices'
                placeholder="Card Name"
            />

            {loading
                ? <Loading />
                : (
                    <>
                        {(() => {
                            if (error) {
                                return (
                                    <div className="mt-3 alert alert-warning text-center">
                                        No cards found: {q}
                                    </div>
                                )
                            } else if (!cardData) {
                                return (
                                    <div className="mt-3 alert alert-secondary">
                                        Search by the <strong>exact</strong> name of the card.
                                    </div>
                                )
                            }
                            return (
                                <div className="mt-3 animate__animated animate__fadeIn">
                                    {cardData.map(card => (
                                        <CardPrices
                                            key={card.name}
                                            name={card.name}
                                            card_prices={card.card_prices}
                                            id={card.id}
                                        />
                                    ))}

                                    <h5 className="search-section-title mt-4"><FaBoxes size={14} className="me-1" />Card Sets</h5>
                                    <div className="search-sets-grid">
                                        {cardSets.map(set => (
                                            <div key={set.set_code} className="search-set-item">
                                                <div className="prices-set-img-wrap">
                                                    <a href={'/cardset?q=' + encodeURIComponent(set.set_name)}>
                                                        <LazyLoadImage
                                                            src={YGO_IMG_SET + set.set_code.split('-')[0] + '.jpg'}
                                                            alt={set.set_name}
                                                            className="prices-set-img"
                                                            onError={({ currentTarget }) => {
                                                                currentTarget.onerror = null;
                                                                currentTarget.src = YGO_PIC + 'back_high.jpg';
                                                            }}
                                                        />
                                                    </a>
                                                </div>
                                                <div className="search-set-code"><FaBarcode size={10} className="me-1" />{set.set_code}</div>
                                                <div className="search-set-name">{set.set_name}</div>
                                                <div className="search-set-rarity"><FaTag size={10} className="me-1" />{set.set_rarity}</div>
                                                <div className="search-set-price"><FaDollarSign size={10} className="me-1" />{set.set_price}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        })()}
                    </>
                )
            }
        </>
    )
}
