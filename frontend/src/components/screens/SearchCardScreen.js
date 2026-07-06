import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import queryString from 'query-string'
import { ReturnButton } from '../common/ReturnButton'
import { SearchCard } from '../common/search/SearchCard'
import { Title } from '../common/Title'
import { Loading } from '../common/Loading'
import { YGO_API, YGO_PIC } from '../../helpers/constants'
import { CardSearchSets } from '../common/search/CardSearchSets'
import { CardSearchImgDesc } from '../common/search/CardSearchImgDesc'
import { CardSearchBanlist } from '../common/search/CardSearchBanlist'
import { CardSearchInfo } from '../common/search/CardSearchInfo'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { FaChevronLeft, FaChevronRight, FaAngleDoubleLeft, FaAngleDoubleRight, FaFistRaised, FaShieldAlt, FaStar, FaBolt, FaBalanceScale, FaLink } from 'react-icons/fa'

const PAGE_SIZE = 60

export const SearchCardScreen = () => {
  const location = useLocation()
  const { q = '', archetype = '' } = queryString.parse(location.search)

  const [formValues, handleInputChange] = useForm({ searchText: q })
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)

  const searchMode = q ? 'id' : (archetype ? 'archetype' : '')

  useEffect(() => {
    if (!q && !archetype) return
    setLoading(true)
    let url = YGO_API
    if (q) url = url + '?id=' + encodeURIComponent(q)
    else if (archetype) url = url + '?archetype=' + encodeURIComponent(archetype)
    fetch(url)
      .then(res => res.json())
      .then(json => { setData(json); setLoading(false) })
      .catch(() => { setData(null); setLoading(false) })
  }, [q, archetype])

  useEffect(() => { setPage(1) }, [q, archetype])

  const cardData = !!data && data.data
  const totalCount = cardData ? cardData.length : 0
  const count = Math.ceil(totalCount / PAGE_SIZE)
  const pagedData = cardData ? cardData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE) : []

  const handleChangePage = (value) => {
    setPage(value)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderCard = (card) => {
    const type = card.type.toLowerCase()
    if (type === 'skill card') {
      return (
        <>
          <CardSearchInfo card={card} />
          <CardSearchBanlist card={card} />
          <CardSearchImgDesc card={card} />
          <CardSearchSets card={card} />
        </>
      )
    }
    if (type === 'spell card' || type === 'trap card') {
      return (
        <>
          <CardSearchInfo card={card} />
          <CardSearchBanlist card={card} />
          <CardSearchImgDesc card={card} />
          <CardSearchSets card={card} />
        </>
      )
    }
    if (type.includes('pendulum')) {
      return (
        <>
          <CardSearchInfo card={card} />
          <div className="search-stats-section mt-3">
            <h5 className="search-section-title">Stats</h5>
            <div className="search-stats-grid">
              <div className="search-stat-item"><FaFistRaised className="search-stat-icon search-stat-icon-atk" size={14} /><span className="search-stat-label">ATK</span><span className="search-stat-value">{card.atk}</span></div>
              <div className="search-stat-item"><FaShieldAlt className="search-stat-icon search-stat-icon-def" size={14} /><span className="search-stat-label">DEF</span><span className="search-stat-value">{card.def}</span></div>
              <div className="search-stat-item"><FaStar className="search-stat-icon search-stat-icon-level" size={14} /><span className="search-stat-label">Level</span><span className="search-stat-value">{card.level}</span></div>
              <div className="search-stat-item"><FaBolt className="search-stat-icon search-stat-icon-attribute" size={14} /><span className="search-stat-label">Attribute</span><span className="search-stat-value">{card.attribute}</span></div>
              <div className="search-stat-item"><FaBalanceScale className="search-stat-icon search-stat-icon-scale" size={14} /><span className="search-stat-label">Scale</span><span className="search-stat-value">{card.scale}</span></div>
            </div>
          </div>
          <CardSearchBanlist card={card} />
          <CardSearchImgDesc card={card} />
          <CardSearchSets card={card} />
        </>
      )
    }
    if (type.includes('link')) {
      return (
        <>
          <CardSearchInfo card={card} />
          <div className="search-stats-section mt-3">
            <h5 className="search-section-title">Stats</h5>
            <div className="search-stats-grid">
              <div className="search-stat-item"><FaFistRaised className="search-stat-icon search-stat-icon-atk" size={14} /><span className="search-stat-label">ATK</span><span className="search-stat-value">{card.atk}</span></div>
              <div className="search-stat-item"><FaBolt className="search-stat-icon search-stat-icon-attribute" size={14} /><span className="search-stat-label">Attribute</span><span className="search-stat-value">{card.attribute}</span></div>
              <div className="search-stat-item"><FaLink className="search-stat-icon search-stat-icon-link" size={14} /><span className="search-stat-label">Link</span><span className="search-stat-value">{card.linkval}</span></div>
              <div className="search-stat-item search-stat-item-wide"><FaLink className="search-stat-icon search-stat-icon-link" size={14} /><span className="search-stat-label">Markers</span><span className="search-stat-value">{card.linkmarkers.join(', ')}</span></div>
            </div>
          </div>
          <CardSearchBanlist card={card} />
          <CardSearchImgDesc card={card} />
          <CardSearchSets card={card} />
        </>
      )
    }
    return (
      <>
        <CardSearchInfo card={card} />
        <div className="search-stats-section mt-3">
          <h5 className="search-section-title">Stats</h5>
          <div className="search-stats-grid">
            <div className="search-stat-item"><FaFistRaised className="search-stat-icon search-stat-icon-atk" size={14} /><span className="search-stat-label">ATK</span><span className="search-stat-value">{card.atk}</span></div>
            <div className="search-stat-item"><FaShieldAlt className="search-stat-icon search-stat-icon-def" size={14} /><span className="search-stat-label">DEF</span><span className="search-stat-value">{card.def}</span></div>
            <div className="search-stat-item"><FaStar className="search-stat-icon search-stat-icon-level" size={14} /><span className="search-stat-label">Level</span><span className="search-stat-value">{card.level}</span></div>
            <div className="search-stat-item"><FaBolt className="search-stat-icon search-stat-icon-attribute" size={14} /><span className="search-stat-label">Attribute</span><span className="search-stat-value">{card.attribute}</span></div>
          </div>
        </div>
        <CardSearchBanlist card={card} />
        <CardSearchImgDesc card={card} />
        <CardSearchSets card={card} />
      </>
    )
  }

  const getCardImage = (card) => {
    if (card.card_images && card.card_images.length > 0) return card.card_images[0].image_url_small
    return YGO_PIC + 'back_high.jpg'
  }

  return (
    <>
      <div className="row align-items-center mb-3">
        <div className="col-sm-8">
          <Title value="Search Card" />
          <p className="text-muted mb-0 small">Look up any card from the YGOProDeck database by ID or archetype.</p>
        </div>
        <div className="col-sm-4 text-end">
          <ReturnButton value="Return" />
        </div>
      </div>

      <SearchCard
        value={formValues}
        handle={handleInputChange}
        resetValue="/search_card"
        placeholder="Card ID or name"
      />

      {loading
        ? <Loading />
        : (
          <>
            {(() => {
              if (!cardData) {
                return (
                  <div className="mt-3 alert alert-secondary">
                    Search by <strong>card ID</strong> or <strong>archetype name</strong> to see results.
                  </div>
                )
              }
              if (cardData.length === 0) {
                return (
                  <div className="coll-empty text-center py-5">
                    <p className="text-muted mb-0">No cards found.</p>
                  </div>
                )
              }

              if (searchMode === 'id' && cardData.length === 1) {
                return (
                  <div className="mt-3 animate__animated animate__fadeIn">
                    {cardData.map(card => (
                      <div key={card.id} className="search-card-detail">
                        {renderCard(card)}
                      </div>
                    ))}
                  </div>
                )
              }

              return (
                <>
                  <div className="d-flex align-items-center justify-content-between mb-2 mt-3">
                    <span className="coll-count text-muted small">
                      Showing <strong>{((page - 1) * PAGE_SIZE) + 1}-{Math.min(page * PAGE_SIZE, totalCount)}</strong> of <strong>{totalCount}</strong> cards
                    </span>
                  </div>

                  <div className="row g-2 mt-1 animate__animated animate__fadeIn">
                    {pagedData.map(card => (
                      <div key={card.id} className="col-6 col-sm-4 col-md-3 col-lg-2 mb-3">
                        <div className="coll-card zoom-effect-1-1 rounded-3 overflow-visible h-100">
                          <a className="coll-card-link text-decoration-none position-relative" data-name={card.id} href="/">
                            <LazyLoadImage
                              className="coll-card-img"
                              alt={card.name}
                              src={getCardImage(card)}
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null
                                currentTarget.src = YGO_PIC + 'back_high.jpg'
                              }}
                            />
                          </a>
                          <div className="coll-card-body p-2 text-center">
                            <h6 className="coll-card-title text-truncate mb-0">{card.name}</h6>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {count > 1 && (
                    <div className="coll-sticky-pagination">
                      <nav className="d-flex justify-content-center">
                        <ul className="pagination pagination-sm mb-0">
                          <li className={'page-item ' + (page <= 1 ? 'disabled' : '')}>
                            <button className="page-link" onClick={() => handleChangePage(1)}>
                              <FaAngleDoubleLeft size={12} />
                            </button>
                          </li>
                          <li className={'page-item ' + (page <= 1 ? 'disabled' : '')}>
                            <button className="page-link" onClick={() => handleChangePage(page - 1)}>
                              <FaChevronLeft size={12} />
                            </button>
                          </li>
                          {[...Array(Math.min(5, count))].map((_, i) => {
                            let p
                            if (count <= 5) { p = i + 1 }
                            else if (page <= 3) { p = i + 1 }
                            else if (page >= count - 2) { p = count - 4 + i }
                            else { p = page - 2 + i }
                            return (
                              <li key={p} className={'page-item ' + (p === page ? 'active' : '')}>
                                <button className="page-link" onClick={() => handleChangePage(p)}>{p}</button>
                              </li>
                            )
                          })}
                          <li className={'page-item ' + (page >= count ? 'disabled' : '')}>
                            <button className="page-link" onClick={() => handleChangePage(page + 1)}>
                              <FaChevronRight size={12} />
                            </button>
                          </li>
                          <li className={'page-item ' + (page >= count ? 'disabled' : '')}>
                            <button className="page-link" onClick={() => handleChangePage(count)}>
                              <FaAngleDoubleRight size={12} />
                            </button>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  )}
                </>
              )
            })()}
          </>
        )
      }
    </>
  )
}
