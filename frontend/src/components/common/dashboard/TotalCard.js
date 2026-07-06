import React from 'react';
import { TotalCardSection } from './TotalCardSection';

import "../../../statics/css/main.css"

export const TotalCard = ({ cards, title }) => {

    const {
        total_cards,
        attribute_amounts,
        monster_race_amounts,
        spell_trap_race_amounts,
        rarity_amounts,
        subtype_amounts,
        type_amounts
    } = cards;

    return (
        <>
            <div className="row card-body mt-3 mb-3 shadow rounded" >
                <div className="col-sm-12 m-2">
                    <span className='mb-3 h2'><u>{title}</u></span>
                    <span className='mb-3' style={{ fontSize: "32px" }}>{` ${total_cards}`}</span>
                    <hr/>
                    <TotalCardSection size="col-sm-2" title="Types Cards" cards={type_amounts} />
                    <hr />
                    <TotalCardSection size="col-sm-4" title="Subtype Cards" cards={subtype_amounts} />
                    <hr />
                    <TotalCardSection size="col-sm-3" title="Rarity Cards" cards={rarity_amounts} />
                    <hr />
                    <TotalCardSection size="col-sm-3" title="Attribute Monster Cards" cards={attribute_amounts} />
                    <hr />
                    <TotalCardSection size="col-sm-3" title="Race Monster Cards" cards={monster_race_amounts} />
                    <hr />
                    <TotalCardSection size="col-sm-3" title="Race Spell Trap Cards" cards={spell_trap_race_amounts} />


                </div>
            </div>

        </>
    )
};
