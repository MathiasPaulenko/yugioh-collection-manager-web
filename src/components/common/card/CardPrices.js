import React, { useState, useEffect } from 'react'
import { CONVERT_API, IMG_EXT, LARGE_IMG_URL } from '../../../helpers/constants';

export const CardPrices = ({
    name,
    card_prices = "",
    id,
}) => {

    const [euroPrice, setEuroPrice] = useState({
        cardmarket_euros: 0,
        tcgplayer_euros: 0,
        ebay_euros: 0,
        amazon_euros: 0,
        coolstuffinc_euros: 0,
    });

    const cardmarket_price = card_prices[0].cardmarket_price;
    const tcgplayer_price = card_prices[0].tcgplayer_price;
    const ebay_price = card_prices[0].ebay_price;
    const amazon_price = card_prices[0].amazon_price;
    const coolstuffinc_price = card_prices[0].amazon_price;

    useEffect(() => {
        fetch(`${CONVERT_API}`)
            .then(resp => resp.json())
            .then(data => {
                const dolars = data.rates["USD"];
                const euros = data.rates["EUR"];
                setEuroPrice({
                    cardmarket_euros: ((dolars / euros) * cardmarket_price).toFixed(2), //El valor viene en euros
                    tcgplayer_euros: ((euros / dolars) * tcgplayer_price).toFixed(2),
                    ebay_euros: ((euros / dolars) * ebay_price).toFixed(2),
                    amazon_euros: ((euros / dolars) * amazon_price).toFixed(2),
                    coolstuffinc_euros: ((euros / dolars) * coolstuffinc_price).toFixed(2),
                });
            }).catch((error) => {
                setEuroPrice({
                    cardmarket_euros: 0,
                    tcgplayer_euros: 0,
                    ebay_euros: 0,
                    amazon_euros: 0,
                    coolstuffinc_euros: 0,
                });

            });
    }, []);

    return (
        <>
            <div className="col-sm-12 card-body mb-3 mt-3" >
                <div className="row justify-content-center">
                    <div className="col-2 align-self-center align-items-center">
                        <div className="text-center">
                            <a data-name={id} href="/">
                                <img
                                    style={{ width: "100%" }}
                                    className="zoom-effect-1-1"
                                    src={`${LARGE_IMG_URL + id + IMG_EXT}`}
                                    alt={name}
                                >

                                </img>
                            </a>
                        </div>
                    </div>


                    <div className="col-6">
                        <div className='row'>
                            <h5>{name}</h5>
                            <hr />

                            <div className="col-sm-12">
                                <table className='table'>
                                    <thead className=''>
                                        <tr>
                                            <th scope='col'>Market</th>
                                            <th scope='col'>Dollars</th>
                                            <th scope='col'>Euros</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope='row'>Cardmarket Price</th>
                                            <td>{`$ ${cardmarket_price}`}</td>
                                            <td>{`${euroPrice.cardmarket_euros} €`}</td>
                                        </tr>
                                        <tr>
                                            <th scope='row'>TCG Player Price</th>
                                            <td>{`$ ${tcgplayer_price}`}</td>
                                            <td>{`${euroPrice.tcgplayer_euros} €`}</td>

                                        </tr>
                                        <tr>
                                            <th scope='row'>Ebay Price</th>
                                            <td>{`$ ${ebay_price}`}</td>
                                            <td>{`${euroPrice.ebay_euros} €`}</td>

                                        </tr>
                                        <tr>
                                            <th scope='row'>Amazon Price</th>
                                            <td>{`$ ${amazon_price}`}</td>
                                            <td>{`${euroPrice.amazon_euros} €`}</td>

                                        </tr>
                                        <tr>
                                            <th scope='row'>Cool Stuff Inc Price</th>
                                            <td>{`$ ${coolstuffinc_price}`}</td>
                                            <td>{`${euroPrice.coolstuffinc_euros} €`}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
