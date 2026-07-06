import React from 'react'
import { capitalize, getRarityIconOrNot } from '../../../helpers/utils.js';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Chart } from './Chart.js';

export const TotalCardSection = ({ size, title, cards }) => {

    let imgPath = "";
    let ext = "";
    let imgSize = "";
    let filter = ""

    if (title.includes('Types')) {
        imgPath = `/assets/img/cardType/`;
        ext = ".jpg";
        imgSize = "";
        filter = "type"

    } else if (title.includes('Subtype')) {
        imgPath = `/assets/img/type/`;
        ext = ".jpg";
        imgSize = "";
        filter = "subtype"

    } else if (title.includes('Rarity')) {
        imgPath = `/assets/img/rarity/`
        ext = ".png";
        imgSize = "type-icon-15";
        filter = "rarity"

    } else if (title.includes('Attribute')) {
        imgPath = `/assets/img/attribute/`
        ext = ".jpg";
        filter = "attribute"

    } else if (title.includes('Race Monster')) {
        imgPath = `/assets/img/monster_race/`
        ext = ".png";
        imgSize = "type-icon-10";
        filter = "race"

    } else if (title.includes('Race Spell Trap')) {
        imgPath = `/assets/img/other_race/`
        ext = ".png";
        imgSize = "type-icon-10";
        filter = "race"

    }

    return (
        <>
            <h5 className='mb-3 mt-2'><u>{title}</u></h5>
            <div className='row justify-content-center'>
                <div className='col-3 mb-4 align-self-center align-items-center'>
                    <Chart
                        data={cards}
                    />
                </div>
            </div>
            <div className='row align-items-center'>
                {
                    (() => {
                        return (
                            Object.keys(cards).map((card) => {
                                const label = `${capitalize(card.replaceAll('_', ' ')).replace('Cards', '')}: `
                                const img = `${capitalize(card.replaceAll('_', ' ')).replace('Cards', '').slice(0, -1)}`

                                let imgSource = "";
                                let imgTag = <div></div>

                                if (title.includes('Rarity')) {
                                    imgSource = getRarityIconOrNot(img);

                                    if (imgSource) {
                                        imgTag = <span className={`${imgSize} m-2`}>
                                            <LazyLoadImage
                                                alt={img}
                                                src={imgSource}
                                            />
                                        </span>
                                    }

                                } else {
                                    imgSource = `${imgPath}${img}${ext}`
                                    imgTag = <span className={`${imgSize} m-2`}>
                                        <LazyLoadImage
                                            alt={img}
                                            src={imgSource}
                                        />
                                    </span>
                                }

                                return (
                                    <div key={card} className={`${size} mt-3 details-link`}>
                                        {imgTag}
                                        <a className="" href={`/filters?${filter}=${label.replace(" :", "")}`}>
                                            <span><strong>{label}</strong></span>
                                        </a>
                                        <span style={{ fontSize: "18px" }}>{cards[card]}</span>
                                    </div>
                                )
                            })
                        )

                    }
                    )()
                }
            </div>
            <br />
        </>
    )
}
