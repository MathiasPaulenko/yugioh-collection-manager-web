import React, { useState, useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { YGO_CARDSET, YGO_IMG_SET, YGO_PIC, BASE_URL } from '../../helpers/constants'
import { useCard } from '../../hooks/useCard'
import { Loading } from '../common/Loading'
import { ReturnButton } from '../common/ReturnButton'
import { Title } from '../common/Title'
import { FaChevronLeft, FaChevronRight, FaAngleDoubleLeft, FaAngleDoubleRight, FaBoxOpen, FaCalendarAlt, FaLayerGroup } from 'react-icons/fa'

const PAGE_SIZE = 24

export const CardSetListscreen = () => {

  const { loading, data } = useCard(YGO_CARDSET)
  const cardSet = !!data && data
  const [page, setPage] = useState(1)
  const [setProgress, setSetProgress] = useState({})

  const totalCount = cardSet ? cardSet.length : 0
  const count = Math.ceil(totalCount / PAGE_SIZE)
  const pagedData = cardSet ? cardSet.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE) : []

  const handleChangePage = (value) => {
    setPage(value)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    if (!pagedData) return
    let mounted = true
    pagedData.forEach(set => {
      const setCodePrefix = set.set_code.split('-')[0]
      fetch(BASE_URL + 'collection/?card_number=' + encodeURIComponent(setCodePrefix) + '&limit=5000')
        .then(resp => resp.json())
        .then(collectionData => {
          if (!mounted) return
          const collected = collectionData.count || (collectionData.data ? collectionData.data.length : 0)
          const total = set.num_of_cards || 0
          const pct = total > 0 ? Math.min(100, Math.round((collected / total) * 100)) : 0
          setSetProgress(prev => ({ ...prev, [set.set_code]: { collected, total, pct } }))
        })
        .catch(() => {
          if (mounted) setSetProgress(prev => ({ ...prev, [set.set_code]: { collected: 0, total: set.num_of_cards, pct: 0 } }))
        })
    })
    return () => { mounted = false }
  }, [pagedData])

  return (
    <>
      <div className='row align-items-center mb-3'>
        <div className='col-sm-10'>
          <Title value='All Card Set Packages' />
          <p className="text-muted mb-0 small">Browse all card sets and track your collection progress.</p>
        </div>
        <div className="col-sm-2 text-end">
          <ReturnButton value="Return" />
        </div>
      </div>

      {loading
        ? <Loading />
        : (
          <>
            <div className="d-flex align-items-center justify-content-between mb-2 mt-2">
              <span className="coll-count text-muted small">
                Showing <strong>{((page - 1) * PAGE_SIZE) + 1}-{Math.min(page * PAGE_SIZE, totalCount)}</strong> of <strong>{totalCount}</strong> sets
              </span>
            </div>

            <div className="row g-3 mt-1 animate__animated animate__fadeIn">
              {pagedData.map(set => {
                const prog = setProgress[set.set_code]
                const pct = prog ? prog.pct : 0
                const collected = prog ? prog.collected : 0
                const total = prog ? prog.total : set.num_of_cards
                const barColor = pct === 100 ? '#198754' : pct >= 50 ? '#0d6efd' : pct > 0 ? '#ffc107' : '#dee2e6'
                const setHref = '/cardset?q=' + encodeURIComponent(set.set_name)

                return (
                  <div key={set.set_code} className="col-sm-6 col-md-4 col-lg-3 mb-3">
                    <div className="cardsetlist-card">
                      <div className="cardsetlist-card-top">
                        <a href={setHref}>
                          <LazyLoadImage
                            src={YGO_IMG_SET + set.set_code.split('-')[0] + '.jpg'}
                            alt={set.set_name}
                            className="cardsetlist-set-img"
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null
                              currentTarget.src = YGO_PIC + 'back_high.jpg'
                            }}
                          />
                        </a>
                        <div className="cardsetlist-card-info">
                          <a href={setHref} className="cardsetlist-set-name text-decoration-none">
                            {set.set_name}
                          </a>
                          <div className="cardsetlist-meta">
                            <span title="Set Code"><FaBoxOpen size={10} className="me-1" />{set.set_code}</span>
                            <span title="TCG Date"><FaCalendarAlt size={10} className="me-1" />{set.tcg_date}</span>
                            <span title="Cards"><FaLayerGroup size={10} className="me-1" />{set.num_of_cards}</span>
                          </div>
                        </div>
                      </div>

                      <div className="cardsetlist-progress-wrap">
                        <div className="cardsetlist-progress-header">
                          <span className="cardsetlist-progress-label">Collection</span>
                          <span className="cardsetlist-progress-count">{collected}/{total}</span>
                        </div>
                        <div className="cardsetlist-progress-bar">
                          <div className="cardsetlist-progress-fill" style={{ width: pct + '%', background: barColor }} />
                        </div>
                        <span className="cardsetlist-progress-pct">{pct}%</span>
                      </div>
                    </div>
                  </div>
                )
              })}
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
      }
    </>
  )
}
