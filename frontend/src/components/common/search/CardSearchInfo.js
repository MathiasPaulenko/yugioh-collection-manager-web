import React from 'react'
import { FaHashtag, FaTag, FaDragon, FaLayerGroup, FaIdCard } from 'react-icons/fa'

export const CardSearchInfo = ({ card }) => {
    return (
        <div className="search-info-section mt-3">
            <h5 className="search-section-title">Information</h5>
            <div className="search-info-grid">
                <div className="search-info-item search-info-id">
                    <FaHashtag className="search-info-icon" size={14} />
                    <div className="search-info-content">
                        <span className="search-info-label">ID</span>
                        <span className="search-info-value">{card.id}</span>
                    </div>
                </div>
                <div className="search-info-item search-info-name search-info-item-wide">
                    <FaIdCard className="search-info-icon" size={14} />
                    <div className="search-info-content">
                        <span className="search-info-label">Name</span>
                        <span className="search-info-value">{card.name}</span>
                    </div>
                </div>
                <div className="search-info-item search-info-race">
                    <FaDragon className="search-info-icon" size={14} />
                    <div className="search-info-content">
                        <span className="search-info-label">Race</span>
                        <span className="search-info-value">{card.race}</span>
                    </div>
                </div>
                <div className="search-info-item search-info-type">
                    <FaTag className="search-info-icon" size={14} />
                    <div className="search-info-content">
                        <span className="search-info-label">Type</span>
                        <span className="search-info-value">{card.type}</span>
                    </div>
                </div>
                <div className="search-info-item search-info-archetype">
                    <FaLayerGroup className="search-info-icon" size={14} />
                    <div className="search-info-content">
                        <span className="search-info-label">Archetype</span>
                        <span className="search-info-value">{card.hasOwnProperty('archetype') ? card.archetype : 'None'}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
