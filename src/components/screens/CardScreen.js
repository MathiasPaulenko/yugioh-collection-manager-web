import React from 'react'
import { useParams } from 'react-router-dom'
import { useCard } from '../../hooks/useCard';
import { Loading } from '../common/Loading';
import { Title } from '../common/Title';
import { CardDetail } from '../common/card/CardDetail';
import { ReturnButton } from '../common/ReturnButton';
import { BASE_URL } from '../../helpers/constants.js';

export const CardScreen = () => {

    const { serial_code } = useParams();
    const { loading, data } = useCard(`${BASE_URL}collection/card/${serial_code}/`);
    const card_data = !!data && data;


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
                            <div className='row mt-3 align-items-center'>
                                <div className="col-sm-8">
                                    <Title value={card_data.name} />

                                </div>
                                <div className="col-sm-4">
                                    <ReturnButton value="Return" />
                                </div>
                            </div>

                            <CardDetail card={card_data} />
                            
                        </>
                    )
            }
        </>
    )
}
