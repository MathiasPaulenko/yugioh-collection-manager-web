import React from 'react';
import { Navigate } from 'react-router-dom';

import { CardDescriptionDetail } from './CardDescriptionDetail.js';
import { SkillCardDetail } from './SkillCardDetail.js';
import { SpellTrapCardDetail } from './SpellTrapCardDetail.js';
import { PendulumCardDetail } from './PendulumCardDetail.js';
import { LinkCardDetail } from './LinkCardDetail.js';
import { MonsterCardDetail } from './MonsterCardDetail.js';
import { ConstrolsButtonsCardDetail } from './ControlsDetails.js';

import "../../../statics/css/main.css";
import { RelatedCards } from './RelatedCards.js';
import { CardNote } from './CardNote.js';


export const CardDetail = ({ card }) => {

    if ('detail' in card) {
        return <Navigate to='/' />
    };

    const {
        serial_code,
        description,
        type,
        subtype,
        archetype = "",
        note
    } = card;

    return (
        <>
            {
                (() => {
                    if (type.toLowerCase() === 'skill') {
                        return <SkillCardDetail card={card}></SkillCardDetail>

                    } else if (type.toLowerCase() === 'spell' || type.toLowerCase() === 'trap') {
                        return <SpellTrapCardDetail card={card}></SpellTrapCardDetail>
                    
                    } else {
                        if (subtype.toLowerCase().includes("pendulum")) {
                            return <PendulumCardDetail card={card}></PendulumCardDetail>
                       
                        } else if (subtype.toLowerCase().includes("link")) {
                            return <LinkCardDetail card={card}></LinkCardDetail>
                       
                        } else {
                            return <MonsterCardDetail card={card}></MonsterCardDetail>
                        }
                    }
                })()
            }

            <CardDescriptionDetail description={description} />

            {
                (note && note !== "")
                &&
                (
                    <CardNote note={note} />
                )
            }
            
            <ConstrolsButtonsCardDetail serial_code={serial_code} />

            {
                (() => {
                    if (archetype && (archetype !== "")) {
                        return <RelatedCards archetype={archetype} />

                    } else if (type && (type !== "")) {

                        return <RelatedCards cardType={type} cardSubtype={subtype} title='Card of the same type in the collection' />

                    } else {
                        return <div></div>
                    }

                })()
            }

        </>
    )
};
