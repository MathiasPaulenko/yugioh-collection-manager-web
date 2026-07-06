import React from 'react'
import { useCard } from '../../hooks/useCard';

import { Title } from '../common/Title'
import { BASE_URL } from '../../helpers/constants.js';
import { Loading } from '../common/Loading';
import { TotalCard } from '../common/dashboard/TotalCard';

export const Dashboard = () => {

    const { loading, data } = useCard(`${BASE_URL}dashboard/total_cards`);
    const { loading: priceLoading, data: priceData } = useCard(`${BASE_URL}collection/total_price`);

    const card_repeated = !!data && data.repeated;
    const card_unique = !!data && data.unique;

    const price = !!priceData && priceData.data;



    return (
        <>
            <div className='row mt-3 align-items-center mb-3'>

                <div className='col-sm-6'>
                    <Title value='Dashboard' />
                </div>

                {
                    priceLoading

                        ?
                        (<>
                            <div className='col-sm-1 text-center'></div>
                            <div className='col-sm-3 text-center'>
                                <span className='h4'>Total price of the collection: </span>
                            </div>
                            <div className='col-sm-2'>
                                <div className="dot-elastic"></div>
                            </div>
                        </>
                        )
                        :
                        (
                            <>
                                <div className='col-sm-1 text-center'></div>
                                <div className='col-sm-3 text-center'>
                                    <span className='h4'>Total price of the collection: </span>
                                </div>
                                <div className='col-sm-2'>
                                    <span className="h4 text-secondary">{`$ ${price}`}</span>
                                </div>
                            </>
                        )

                }

            </div>

            {
                (() => {

                    if (true) {
                        return (
                            <>
                                <div></div>
                            </>
                        )
                    }

                })()
            }

            {

                loading

                    ?
                    (
                        <Loading />
                    )
                    :
                    (

                        (() => {
                            if (data) {
                                return (
                                    <>
                                        <div className='mt-3 animate__animated animate__fadeIn'>

                                            <div className="row">
                                                <TotalCard cards={card_unique} title="Total Card (Distinct):" />
                                            </div>

                                            <div className="row ">
                                                <TotalCard cards={card_repeated} title="Total Card (Repeated):" />
                                            </div>

                                        </div>
                                    </>
                                )
                            } else {
                                return <div className="alert alert-danger">Data no found: Backend is off.</div>
                            }
                        })()
                    )
            }

        </>
    )
}
