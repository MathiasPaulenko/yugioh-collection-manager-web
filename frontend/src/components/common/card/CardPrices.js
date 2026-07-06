import React, { useState, useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { CONVERT_API, IMG_EXT, LARGE_IMG_URL, YGO_PIC } from '../../../helpers/constants';
import { FaStore, FaDollarSign, FaEuroSign, FaShoppingCart, FaAmazon, FaEbay } from 'react-icons/fa'

export const CardPrices = ({
    name,
    card_prices = "",
    id,
}) => {

    const [euroPrice, setEuroPrice] = useState({
        cardmarket_euros: 0,
        tcgplayer_euros: 0,
        ebay_euros: 0,
        amazon_euros: 0,
        coolstuffinc_euros: 0,
    });

    const cardmarket_price = card_prices[0].cardmarket_price;
    const tcgplayer_price = card_prices[0].tcgplayer_price;
    const ebay_price = card_prices[0].ebay_price;
    const amazon_price = card_prices[0].amazon_price;
    const coolstuffinc_price = card_prices[0].amazon_price;

    useEffect(() => {
        let mounted = true;
        fetch(CONVERT_API)
            .then(resp => resp.json())
            .then(data => {
                if (!mounted) return;
                const dolars = data.rates["USD"];
                const euros = data.rates["EUR"];
                setEuroPrice({
                    cardmarket_euros: ((dolars / euros) * cardmarket_price).toFixed(2),
                    tcgplayer_euros: ((euros / dolars) * tcgplayer_price).toFixed(2),
                    ebay_euros: ((euros / dolars) * ebay_price).toFixed(2),
                    amazon_euros: ((euros / dolars) * amazon_price).toFixed(2),
                    coolstuffinc_euros: ((euros / dolars) * coolstuffinc_price).toFixed(2),
                });
            }).catch(() => {
                if (mounted) setEuroPrice({
                    cardmarket_euros: 0,
                    tcgplayer_euros: 0,
                    ebay_euros: 0,
                    amazon_euros: 0,
                    coolstuffinc_euros: 0,
                });
            });
        return () => { mounted = false };
    }, []);

    const markets = [
        { name: 'Cardmarket', usd: cardmarket_price, eur: euroPrice.cardmarket_euros, icon: <FaStore size={16} />, color: '#0d6efd' },
        { name: 'TCG Player', usd: tcgplayer_price, eur: euroPrice.tcgplayer_euros, icon: <FaShoppingCart size={16} />, color: '#6610f2' },
        { name: 'Ebay', usd: ebay_price, eur: euroPrice.ebay_euros, icon: <FaEbay size={16} />, color: '#fd7e14' },
        { name: 'Amazon', usd: amazon_price, eur: euroPrice.amazon_euros, icon: <FaAmazon size={16} />, color: '#ffc107' },
        { name: 'Cool Stuff Inc', usd: coolstuffinc_price, eur: euroPrice.coolstuffinc_euros, icon: <FaStore size={16} />, color: '#198754' },
    ]

    return (
        <div className="prices-card mt-3 mb-3">
            <div className="prices-card-layout">
                <div className="prices-card-img-wrap">
                    <LazyLoadImage
                        className="prices-card-img"
                        src={LARGE_IMG_URL + id + IMG_EXT}
                        alt={name}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = YGO_PIC + 'back_high.jpg';
                        }}
                    />
                    <h5 className="prices-card-title">{name}</h5>
                </div>
                <div className="prices-card-markets">
                    <div className="prices-markets-grid">
                        {markets.map(m => (
                            <div key={m.name} className="prices-market-item" style={{ borderTopColor: m.color }}>
                                <div className="prices-market-icon" style={{ color: m.color }}>{m.icon}</div>
                                <div className="prices-market-name">{m.name}</div>
                                <div className="prices-market-prices">
                                    <span className="prices-market-usd"><FaDollarSign size={11} />{m.usd}</span>
                                    <span className="prices-market-eur"><FaEuroSign size={11} />{m.eur}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
