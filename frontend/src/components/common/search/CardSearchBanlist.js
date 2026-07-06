import React from 'react'
import { FaBan } from 'react-icons/fa'

export const CardSearchBanlist = ({ card }) => {
    if (!card.hasOwnProperty('banlist_info')) return null

    const tcg = card.banlist_info.hasOwnProperty('ban_tcg') ? card.banlist_info.ban_tcg : 'None'
    const ocg = card.banlist_info.hasOwnProperty('ban_ocg') ? card.banlist_info.ban_ocg : 'None'

    const badgeClass = (status) => {
        if (status === 'Forbidden') return 'search-ban-badge search-ban-forbidden'
        if (status === 'Limited') return 'search-ban-badge search-ban-limited'
        if (status === 'Semi-Limited') return 'search-ban-badge search-ban-semi'
        return 'search-ban-badge search-ban-none'
    }

    return (
        <div className="search-banlist-section mt-4">
            <h5 className="search-section-title"><FaBan size={14} className="me-1" />Banlist Info</h5>
            <div className="search-banlist-badges">
                <div className="search-banlist-item">
                    <span className="search-banlist-label">TCG</span>
                    <span className={badgeClass(tcg)}>{tcg}</span>
                </div>
                <div className="search-banlist-item">
                    <span className="search-banlist-label">OCG</span>
                    <span className={badgeClass(ocg)}>{ocg}</span>
                </div>
            </div>
        </div>
    )
}
