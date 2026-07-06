import React from 'react';
import { TotalCardSection } from './TotalCardSection';

import "../../../statics/css/main.css"

const sections = [
    { title: "Types",              cardsKey: "type_amounts" },
    { title: "Subtypes",           cardsKey: "subtype_amounts" },
    { title: "Rarity",             cardsKey: "rarity_amounts" },
    { title: "Attribute Monster",  cardsKey: "attribute_amounts" },
    { title: "Race Monster",       cardsKey: "monster_race_amounts" },
    { title: "Race Spell Trap",    cardsKey: "spell_trap_race_amounts" },
];

const countTotal = (obj) => obj ? Object.values(obj).reduce((a, b) => a + b, 0) : 0;

export const TotalCard = ({ cards }) => {

    const {
        attribute_amounts,
        monster_race_amounts,
        spell_trap_race_amounts,
        rarity_amounts,
        subtype_amounts,
        type_amounts
    } = cards;

    const cardsMap = {
        type_amounts,
        subtype_amounts,
        rarity_amounts,
        attribute_amounts,
        monster_race_amounts,
        spell_trap_race_amounts
    };

    return (
        <div className='mb-4'>
            {sections.map((section) => {
                const sectionCards = cardsMap[section.cardsKey];
                const sectionCount = countTotal(sectionCards);
                return (
                    <div key={section.title} className="dash-section mb-4">
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <h6 className="dash-section-title text-uppercase text-muted fw-bold mb-0">
                                {section.title}
                            </h6>
                            <span className="badge bg-light text-muted border rounded-pill small">{sectionCount}</span>
                        </div>
                        <TotalCardSection
                            title={`${section.title} Cards`}
                            cards={sectionCards}
                        />
                    </div>
                );
            })}
        </div>
    );
};
