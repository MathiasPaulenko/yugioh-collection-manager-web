import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import queryString from 'query-string'
import { useForm } from '../../hooks/useForm';
import { Loading } from "../common/Loading";
import { YGO_API } from '../../helpers/constants.js';
import { SearchCard } from '../common/search/SearchCard';
import { ReturnButton } from '../common/ReturnButton';
import { Title } from '../common/Title';
import { useCardset } from '../../hooks/useCardset';
import { CardSetList } from '../common/card/CardSetList';

export const CardSetScreen = () => {
    const location = useLocation();
    const { q = '' } = queryString.parse(location.search);

    const [formValues, handleInputChange] = useForm({
        searchText: q,
    });

    const [checkInput, setCheckInput] = useState(true)

    const { loading, data } = useCardset(YGO_API, `?cardset=${q}`);

    let error = false;
    if (data && data.hasOwnProperty('error')) {
        error = true;
    }

    const cardData = !!data && data.data;

    const handleCheckboxChange = (e) => {
        const target = e.target
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setCheckInput(value);
    }

    return (
        <>
            <div className='row mt-3 align-items-center mb-3'>
                <div className='col-sm-8'>
                    <Title value='Cardset' />
                    <span>Cards that are not in the collection will be displayed in gray.</span>
                </div>
                <div className='col-sm-2'>
                    <div className='form-check form-switch alight'>
                        <label
                            className='form-check-label'
                            htmlFor="inCollection"
                        >
                            In collection

                        </label>

                        <input
                            type="checkbox"
                            className='form-check-input'
                            name='In Collection'
                            checked={checkInput}
                            onChange={handleCheckboxChange}
                            id="inCollection"
                            
                        />
                    </div>
                </div>
                <div className="col-sm-2">
                    <ReturnButton value="Return" />
                </div>
            </div>



            <SearchCard
                value={formValues}
                handle={handleInputChange}
                resetValue='/cardset'
                placeholder="Card Set Name"
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
                                                    <span>The search is performed by the <strong>exact</strong> name of the Card Set.</span>
                                                </div>
                                            </>
                                        )
                                    } else {

                                        return (
                                            <>
                                                <div className="row mt-4 animate__animated animate__fadeIn">
                                                    {
                                                        cardData.map(card => (
                                                            <CardSetList
                                                                key={Math.random()}
                                                                name={card.id}
                                                                image={card.id}
                                                                card_name={card.name}
                                                                card_sets={card.card_sets}
                                                                set_name={q}
                                                                color={checkInput}
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
