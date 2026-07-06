import React from 'react'
import { FaBoxes, FaBarcode, FaTag, FaDollarSign } from 'react-icons/fa'

export const CardSearchSets = ({ card }) => {
    if (!card.card_sets || card.card_sets.length === 0) return null

    return (
        <div className="search-sets-section mt-4">
            <h5 className="search-section-title"><FaBoxes size={14} className="me-1" />Card Sets</h5>
            <div className="search-sets-grid">
                {card.card_sets.map(cardSets => (
                    <div key={cardSets.set_code} className="search-set-item">
                        <div className="search-set-code"><FaBarcode size={10} className="me-1" />{cardSets.set_code}</div>
                        <div className="search-set-name">{cardSets.set_name}</div>
                        <div className="search-set-rarity"><FaTag size={10} className="me-1" />{cardSets.set_rarity}</div>
                        <div className="search-set-price"><FaDollarSign size={10} className="me-1" />{cardSets.set_price}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
