import React from 'react'
import { capitalize, getRarityIconOrNot } from '../../../helpers/utils.js';
import { cardColors } from './Chart.js';

const sectionConfig = {
    Types:         { imgPath: '/assets/img/cardType/',    ext: '.jpg', filter: 'type',      variant: 'type-cards' },
    Subtypes:      { imgPath: '/assets/img/type/',         ext: '.jpg', filter: 'subtype',   variant: 'list' },
    Rarity:        { imgPath: '/assets/img/rarity/',       ext: '.png', filter: 'rarity',    variant: 'rarity-grid' },
    Attribute:     { imgPath: '/assets/img/attribute/',    ext: '.jpg', filter: 'attribute', variant: 'badges' },
    'Race Monster':     { imgPath: '/assets/img/monster_race/', ext: '.png', filter: 'race', variant: 'chips' },
    'Race Spell Trap':  { imgPath: '/assets/img/other_race/',   ext: '.png', filter: 'race', variant: 'chips' },
};

const getImg = (imgPath, ext, label) => {
    const src = `${imgPath}${label}${ext}`;
    return (
        <img
            alt={label}
            src={src}
            className="dashboard-icon-img"
            onError={({ currentTarget }) => {
                const hyphenSrc = `${imgPath}${label.replaceAll(' ', '-')}${ext}`;
                if (currentTarget.src !== hyphenSrc) {
                    currentTarget.onerror = null;
                    currentTarget.src = hyphenSrc;
                } else {
                    currentTarget.style.visibility = 'hidden';
                }
            }}
        />
    );
};

const cleanLabel = (card) => capitalize(card.replaceAll('_', ' ')).replace(' Cards', '').replace('Cards', '').trim();

const renderTypeCards = (entries, cfg) => (
    <div className='row g-2'>
        {entries.map(([card, count]) => {
            const label = cleanLabel(card);
            const colorKey = card.replaceAll("-", "_");
            const color = cardColors[colorKey] || '#6c757d';
            return (
                <div key={card} className='col-6 col-sm-4 col-md-2'>
                    <a href={`/filters?${cfg.filter}=${label}`} className="dash-type-card text-decoration-none d-block rounded-3 p-3 text-center"
                       style={{ borderTop: `3px solid ${color}` }}>
                        <div className="mb-1">{getImg(cfg.imgPath, cfg.ext, label)}</div>
                        <div className="fw-bold text-dark small">{label}</div>
                        <div className="h5 fw-bold mb-0" style={{ color }}>{count}</div>
                    </a>
                </div>
            );
        })}
    </div>
);

const renderBadges = (entries, cfg) => (
    <div className='d-flex flex-wrap gap-3 justify-content-center'>
        {entries.map(([card, count]) => {
            const label = cleanLabel(card);
            const colorKey = card.replaceAll("-", "_");
            const color = cardColors[colorKey] || '#6c757d';
            return (
                <a key={card} href={`/filters?${cfg.filter}=${label}`} className="text-decoration-none text-center">
                    <div className="dash-attr-badge rounded-circle d-flex align-items-center justify-content-center mb-1"
                         style={{ width: 56, height: 56, border: `2px solid ${color}`, background: `${color}15` }}>
                        {getImg(cfg.imgPath, cfg.ext, label)}
                    </div>
                    <div className="fw-bold small" style={{ color }}>{count}</div>
                    <div className="text-muted" style={{ fontSize: '0.7rem' }}>{label}</div>
                </a>
            );
        })}
    </div>
);

const renderList = (entries, cfg) => (
    <div className='row g-1'>
        {entries.map(([card, count]) => {
            const label = cleanLabel(card);
            const colorKey = card.replaceAll("-", "_");
            const color = cardColors[colorKey] || '#6c757d';
            return (
                <div key={card} className='col-12 col-md-6'>
                    <a href={`/filters?${cfg.filter}=${label}`} className="dash-list-item text-decoration-none d-flex align-items-center gap-2 px-2 py-1 rounded-2">
                        <span className="dash-dot rounded-circle flex-shrink-0" style={{ background: color, width: 8, height: 8 }} />
                        <span className="dashboard-icon-sm me-1">{getImg(cfg.imgPath, cfg.ext, label)}</span>
                        <span className="text-dark small fw-semibold text-truncate">{label}</span>
                        <span className="badge bg-light text-dark border ms-auto">{count}</span>
                    </a>
                </div>
            );
        })}
    </div>
);

const renderRarityGrid = (entries, cfg) => (
    <div className='row g-2'>
        {entries.map(([card, count]) => {
            const label = cleanLabel(card);
            let imgTag = null;
            const raritySrc = getRarityIconOrNot(label);
            if (raritySrc) {
                imgTag = <img alt={label} src={raritySrc} className="dashboard-icon-img" />;
            }
            return (
                <div key={card} className='col-6 col-sm-4 col-md-3 col-lg-2'>
                    <a href={`/filters?${cfg.filter}=${label}`} className="dash-rarity-badge text-decoration-none d-flex flex-column align-items-center gap-1 p-2 rounded-3 border">
                        <div style={{ width: 40, height: 40 }} className="d-flex align-items-center justify-content-center">
                            {imgTag}
                        </div>
                        <span className="text-muted small text-truncate w-100 text-center">{label}</span>
                        <span className="fw-bold small">{count}</span>
                    </a>
                </div>
            );
        })}
    </div>
);

const renderChips = (entries, cfg) => (
    <div className='d-flex flex-wrap gap-2'>
        {entries.map(([card, count]) => {
            const label = cleanLabel(card);
            const colorKey = card.replaceAll("-", "_");
            const color = cardColors[colorKey] || '#6c757d';
            return (
                <a key={card} href={`/filters?${cfg.filter}=${label}`}
                   className="dash-chip text-decoration-none d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill"
                   style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                    <span className="dashboard-icon-sm">{getImg(cfg.imgPath, cfg.ext, label)}</span>
                    <span className="text-dark small fw-semibold">{label}</span>
                    <span className="badge rounded-pill" style={{ background: color, color: '#fff', fontSize: '0.7rem' }}>{count}</span>
                </a>
            );
        })}
    </div>
);

const variantRenderers = {
    'type-cards': renderTypeCards,
    'badges': renderBadges,
    'list': renderList,
    'rarity-grid': renderRarityGrid,
    'chips': renderChips,
};

export const TotalCardSection = ({ title, cards }) => {
    const sectionKey = Object.keys(sectionConfig).find(k => title.includes(k));
    const cfg = sectionConfig[sectionKey] || sectionConfig.Types;
    const entries = Object.entries(cards);
    const renderer = variantRenderers[cfg.variant] || renderList;
    return renderer(entries, cfg);
};
