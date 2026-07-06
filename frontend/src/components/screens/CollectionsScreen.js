import React, { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';
import queryString from 'query-string'

import { useCard } from "../../hooks/useCard";
import { useForm } from '../../hooks/useForm';

import { CardOnList } from "../common/card/CardOnList";
import { Title } from "../common/Title";
import { Loading } from "../common/Loading";
import { BASE_URL } from '../../helpers/constants.js';
import { SearchCard } from '../common/search/SearchCard';
import { ReturnButton } from '../common/ReturnButton';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Pagination } from '@mui/material';
import { Box } from '@mui/system';

export const CollectionsScreen = () => {

    const location = useLocation();

    const { q = '' } = queryString.parse(location.search);

    const [formValues, handleInputChange] = useForm({
        searchText: q,
    });

    const [checkInput, setCheckInput] = useState(true)
    const [order, setOrder] = useState('card_number');
    const [page, setPage] = useState(1);
    const [url, setUrl] = useState(`${BASE_URL}collection/card/?name=${formValues.searchText}&distinct=true&ord=${order}&offset=${page}`)
    const { loading, data } = useCard(url);

 
    useEffect(() => {

        if(formValues.searchText !== ''){
            setPage(1);
        }

        if (!checkInput) {
            setUrl(`${BASE_URL}collection/card/?name=${formValues.searchText}&ord=${order}&offset=${page}`)
        } else {
            setUrl(`${BASE_URL}collection/card/?name=${formValues.searchText}&distinct=true&ord=${order}&offset=${page}`)
        }

    }, [checkInput, formValues, order, page]);

    const card_data = !!data && data.data;
    if(card_data){
        console.log(data.count);
        console.log(data.page_size);
    }
    const count = !!data && parseInt(((data.count / data.page_size) ).toFixed());

    const handleCheckboxChange = (e) => {
        const target = e.target
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setCheckInput(value);
    }

    const handleOrderChange = (event) => {
        setOrder(event.target.value);
    };

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    return (
        <>
            <div className='row mt-3 align-items-center mb-3'>
                <div className='col-sm-8'>
                    <Title value='Collection' />
                </div>

                <div className="col-sm-4">
                    <ReturnButton value="Return" />
                </div>
            </div>
            <hr />

            <SearchCard
                value={formValues}
                handle={handleInputChange}
                resetValue='/collections'
                placeholder="Card Name"
            />

            <FormControl className='align-items-center w-100 mt-3'>
                <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    value={order}
                    onChange={handleOrderChange}
                >
                    <FormControlLabel value="card_number" control={<Radio />} label="Card Number ASC" />
                    <FormControlLabel value="-card_number" control={<Radio />} label="Card Number DEC" />
                    <FormControlLabel value="name" control={<Radio />} label="Card Name ASC" />
                    <FormControlLabel value="-name" control={<Radio />} label="Card Name DEC" />
                    <FormControlLabel value="serial_code" control={<Radio />} label="Serial Code ASC" />
                    <FormControlLabel value="-serial_code" control={<Radio />} label="Serial Code DEC" />
                    <div className='m-3 align-items-center'>
                        <div className='form-check form-switch alight'>
                            <label
                                className='form-check-label'
                                htmlFor="distinct"
                            >
                                Distinct Cards
                            </label>
                            <input
                                type="checkbox"
                                className='form-check-input'
                                name='distinct'
                                checked={checkInput}
                                onChange={handleCheckboxChange}
                                id="distinct"

                            />
                        </div>
                    </div>

                </RadioGroup>


            </FormControl>

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
                                    if (!card_data) {
                                        return <div className="alert alert-danger mt-3">Data no found: Backend is off. </div>

                                    } else if (card_data) {
                                        return (
                                            <>
                                                <Box my={2} display="flex" justifyContent="center">
                                                    <Pagination
                                                        count={count}
                                                        page={page}
                                                        onChange={handleChangePage}
                                                    />
                                                </Box>


                                                <div className="row mt-4 animate__animated animate__fadeIn">
                                                    {
                                                        (() => {
                                                            if (q === '') {
                                                                card_data.map((card, index) => {
                                                                    return <CardOnList
                                                                        key={card.serial_code}
                                                                        name={card.serial_code}
                                                                        image={card.img_code}
                                                                        card_name={card.name}
                                                                        serial_code={card.serial_code}
                                                                        rarity={card.rarity}
                                                                    />

                                                                });

                                                            } else {
                                                                return (card_data.length === 0) && <div className="alert alert-danger">No concurrency found: {q} </div>
                                                            };
                                                        })()
                                                    }

                                                    {
                                                        card_data.map(card => (
                                                            <CardOnList
                                                                key={card.serial_code}
                                                                name={card.serial_code}
                                                                image={card.img_code}
                                                                card_name={card.name}
                                                                serial_code={card.serial_code}
                                                                rarity={card.rarity}

                                                            />
                                                        ))
                                                    }

                                                </div>

                                                <Box my={2} display="flex" justifyContent="center">

                                                    <Pagination
                                                        count={count}
                                                        page={page}
                                                        onChange={handleChangePage}
                                                        className=''
                                                    />
                                                </Box>
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
