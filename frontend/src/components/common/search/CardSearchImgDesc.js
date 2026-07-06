import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { YGO_PIC } from '../../../helpers/constants'

export const CardSearchImgDesc = ({ card }) => {
    const imgUrl = card.card_images && card.card_images.length > 0
        ? card.card_images[0].image_url
        : YGO_PIC + 'back_high.jpg'

    return (
        <div className='search-img-desc mt-4'>
            <div className='row g-3'>
                <div className='col-sm-4 text-center'>
                    <div className="search-card-img-wrap">
                        <LazyLoadImage
                            alt={card.name}
                            src={imgUrl}
                            className="search-card-img"
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null
                                currentTarget.src = YGO_PIC + 'back_high.jpg'
                            }}
                        />
                    </div>
                </div>
                <div className='col-sm-8'>
                    <h5 className='search-section-title'>Description</h5>
                    <div className="search-desc-card">
                        <p className='search-desc-text'>{card.desc}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
