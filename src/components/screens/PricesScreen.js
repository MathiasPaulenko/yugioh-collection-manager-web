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

export const PricesScreen = () => {
    const location = useLocation();

    const { q = '' } = queryString.parse(location.search);

    const [formValues, handleInputChange] = useForm({
        searchText: q,
    });

    const { loading, data } = usePrices(YGO_API, `?name=${q}`);

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
            <div className='row mt-3 align-items-center mb-3'>
                <div className='col-sm-8'>
                    <Title value='Prices' />
                    <span>The minimum market prices of the cards will be displayed.</span>
                </div>

                <div className="col-sm-4">
                    <ReturnButton value="Return" />
                </div>
            </div>
            <hr />

            <SearchCard
                value={formValues}
                handle={handleInputChange}
                resetValue='/prices'
                placeholder="Card Name"

            />

            {
                loading
                    ?
                    (
                        <>
                            <Loading />
                        </>
                    )
                    :
                    (
                        <>
                            {
                                (() => {
                                    if (error) {

                                        return (
                                            <div className="mt-3 alert alert-danger">
                                                <span>No concurrency found: {q}</span>
                                            </div>
                                        )

                                    } else if (!cardData) {
                                        return (
                                            <>
                                                <div className="mt-3 alert alert-secondary">
                                                    <span>The search is performed by the <strong>exact</strong> name of the card.</span>
                                                </div>
                                            </>
                                        )
                                    } else {
                                        return (
                                            <>
                                                <div className="row mt-3 animate__animated animate__fadeIn">

                                                    {
                                                        cardData.map(card => (
                                                            <CardPrices
                                                                key={card.name}
                                                                name={card.name}
                                                                card_prices={card.card_prices}
                                                                id={card.id}
                                                            />

                                                        ))
                                                    }

                                                    <h2 className='mt-3'>Card Sets</h2>
                                                    <span className='mb-3'>Sets where the letter can be found.</span>
                                                    <hr />
                                                    {
                                                        cardSets.map(set => (
                                                            <div key={Math.random()} className="col-sm-4 mb-2 mt-2 align-items-center zoom-effect-1-01">
                                                                <div className='shadow rounded'>
                                                                    <div className='p-3' >
                                                                        <h6 className='text-center'>{set.set_name}</h6>
                                                                        <hr />
                                                                        <div className='row mt-3 mb-3 align-items-center' style={{ minHeight: "230px" }}>
                                                                            <div className='col-sm-1'></div>
                                                                            <div className='col-sm-4'>
                                                                                <a className="" href={`/cardset?q=${set.set_name}`}>
                                                                                    <img
                                                                                        src={`${YGO_IMG_SET}${(set.set_code).split("-")[0]}.jpg`}
                                                                                        alt={set.set_name}
                                                                                        style={{
                                                                                            width: "100%"
                                                                                        }}
                                                                                        className="shadow rounded"
                                                                                        onError={({ currentTarget }) => {
                                                                                            currentTarget.onerror = null;
                                                                                            currentTarget.src = `${YGO_PIC}back_high.jpg`;
                                                                                        }}
                                                                                    />
                                                                                </a>
                                                                            </div>
                                                                            <div className='col-sm-7 text-justify align-items-center'>
                                                                                <span><strong>Code: </strong></span> <span>{set.set_code}</span><br />
                                                                                <span><strong>Rarity: </strong></span> <span>{set.set_rarity}</span><br />
                                                                                <span><strong>Rarity Code: </strong></span> <span>{set.set_rarity_code}</span><br />
                                                                                <span><strong>Set Price: </strong></span> <span>{`$ ${set.set_price}`}</span><br />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

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
