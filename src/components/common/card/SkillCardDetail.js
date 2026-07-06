import React from 'react';
import { LARGE_IMG_URL, IMG_EXT } from '../../../helpers/constants.js';
import { getRarityIconOrNot } from '../../../helpers/utils.js';

import "../../../statics/css/main.css"
import { SetAndPriceButtons } from './ControlsDetails.js';

export const SkillCardDetail = ({ card }) => {

    const {
        card_number,
        serial_code,
        img_code,
        subtype,
        race,
        rarity,
        edition,
        set_name,
        amount,
        name,
        format,
        banned,
        language
    } = card;

    const imgSubtype = `/assets/img/type/${subtype}.jpg`;
    const imgRarity = getRarityIconOrNot(rarity);
    const imgLaguage = `/assets/img/flags/${language}.webp`;


    return (
        <>
            <div className="row m-6 mt-3 animate__animated animate__fadeInLeft shadow rounded" >

                <div className="col-sm-3 p-0 zoom-effect-1-3">
                    <div className="card card-block border-0">
                        {
                            (
                                (() => {
                                    if (banned) {
                                        return (
                                            <img
                                                className='float-ban-img'
                                                alt={banned}
                                                src={`/assets/img/ban/${banned}.svg`}
                                            />
                                        )
                                    }
                                })()
                            )
                        }

                        <img className="card-img-top" src={`${LARGE_IMG_URL + img_code + IMG_EXT}`} alt={`Card ${serial_code}`}></img>
                    </div>

                </div>
                <div className="col-sm-9">
                    <div className="p-3 container">
                        <div className='row'>
                            <span className='col-sm-4'><strong>Language: </strong>
                                <span className='m-2 type-icon-8'><img className="" src={imgLaguage} alt='Language'></img></span>
                            </span>
                            <div className='col-sm-4 align-right'>
                                <span><strong>Card Number:</strong> {card_number}</span>
                            </div>
                            <div className='col-sm-4 align-right'>
                                <span><strong>Serial Code:</strong> {serial_code}</span>
                            </div>
                        </div>

                        <hr />

                        <div className='mt-4'>
                            <div className='container'>

                                <div className='row align-items-center text-center'>
                                    <div className='col-sm-4 details-link'>
                                        <span className='m-2'><strong>Type:</strong></span>
                                        <span className='m-2 type-icon-15'><img className="" src={imgSubtype} alt='Skill Card'></img></span>
                                        <a className="" href={`/filters?subtype=${subtype}`}>
                                            <span className='m-2'>{subtype}</span>
                                        </a>                                    </div>
                                    <div className='col-sm-4 details-link'>
                                        <span className='m-2'><strong>Race:</strong></span>
                                        <a className="" href={`/filters?race=${race}`}>
                                            <span className='m-2'>{race}</span>
                                        </a>                                    </div>
                                    <div className='col-sm-4'>
                                        <span className='m-2'><strong>Amount:</strong></span>
                                        <span className='m-2 h5 text-secondary'>{amount}</span>
                                    </div>
                                </div>

                                <hr />

                                <div className='row align-items-center text-center'>
                                    <div className='col-sm-4 details-link'>
                                        <span className='m-2'><strong>Rarity:</strong></span>
                                        {
                                            (() => {
                                                if (imgRarity) {
                                                    return (
                                                        <span className='m-2 type-icon-15'>
                                                            <img className="" src={imgRarity} alt={`Rarity ${rarity}`}></img>
                                                        </span>
                                                    )

                                                }
                                            })()

                                        }

                                        <a className="" href={`/filters?rarity=${rarity}`}>
                                            <span className='m-2'>{rarity}</span>
                                        </a>

                                    </div>

                                    {
                                        (set_name !== "")
                                        &&
                                        (<div className='col-sm-4'>
                                            <span className='m-2'><strong>Set Name:</strong></span><br />
                                            <span className='m-2'>{set_name}</span>
                                        </div>)
                                    }

                                    <div className='col-sm-4'>
                                        {
                                            (() => {
                                                if (edition !== '') {
                                                    return (
                                                        <>
                                                            <span className='m-2'><strong>Edition:</strong></span>
                                                            <span className='m-2'>{edition}</span>
                                                        </>
                                                    )

                                                }
                                            })()

                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr />

                        <div className='mt-4'>
                            <div className='container'>
                                <div className='row align-items-center text-center'>
                                    <div className='col-sm-4 details-link'>
                                        {
                                            (format && format !== "")
                                            &&
                                            (
                                                <>
                                                    <span className='m-2'><strong>Format:</strong></span><br />
                                                    <a className="" href={`/filters?game_format=${format}`}>
                                                        <span className='m-2'>{format}</span>
                                                    </a>
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <SetAndPriceButtons set_name={set_name} name={name} />

                </div>
            </div>
        </>
    )
};
