import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import queryString from 'query-string'
import { YGO_API, YGO_PIC } from '../../helpers/constants';
import { Loading } from '../common/Loading';
import { ReturnButton } from '../common/ReturnButton'
import { Title } from '../common/Title'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FaChevronLeft, FaChevronRight, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

const PAGE_SIZE = 60;

export const ArchetypeCardsScreen = () => {
  const location = useLocation();
  const { archetype = '' } = queryString.parse(location.search);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!archetype) return;
    setLoading(true);
    fetch(YGO_API + '?archetype=' + encodeURIComponent(archetype))
      .then(res => res.json())
      .then(json => { setData(json); setLoading(false); })
      .catch(() => { setData(null); setLoading(false); });
  }, [archetype]);

  useEffect(() => { setPage(1); }, [archetype]);

  const cardData = !!data && data.data;
  const totalCount = cardData ? cardData.length : 0;
  const count = Math.ceil(totalCount / PAGE_SIZE);
  const rangeStart = ((page - 1) * PAGE_SIZE) + 1;
  const rangeEnd = Math.min(page * PAGE_SIZE, totalCount);
  const pagedData = cardData ? cardData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE) : [];

  const handleChangePage = (value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCardImage = (card) => {
    if (card.card_images && card.card_images.length > 0) {
      return card.card_images[0].image_url_small;
    }
    return null;
  };

  return (
    <>
      <div className='row align-items-center mb-3'>
        <div className='col-sm-8'>
          <Title value={archetype} />
          <p className="text-muted mb-0 small">All cards in the {archetype} archetype from the YGOProDeck database.</p>
        </div>
        <div className="col-sm-4 text-end">
          <ReturnButton value="Return" />
        </div>
      </div>

      {loading
        ? <Loading />
        : (
          <>
            {(() => {
              if (!cardData) {
                return <div className="alert alert-danger mt-3">Data not found: API is unavailable.</div>
              }
              if (cardData.length === 0) {
                return (
                  <div className="coll-empty text-center py-5">
                    <p className="text-muted mb-0">No cards found for this archetype.</p>
                  </div>
                )
              }
              return (
                <>
                  <div className="d-flex align-items-center justify-content-between mb-2 mt-3">
                    <span className="coll-count text-muted small">
                      Showing <strong>{rangeStart}-{rangeEnd}</strong> of <strong>{totalCount}</strong> cards
                    </span>
                    <a href={'/filters?archetype=' + encodeURIComponent(archetype)} className="btn btn-sm btn-outline-secondary">
                      View in my collection
                    </a>
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
                                currentTarget.onerror = null;
                                currentTarget.src = YGO_PIC + 'back_high.jpg';
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
                            let p;
                            if (count <= 5) { p = i + 1; }
                            else if (page <= 3) { p = i + 1; }
                            else if (page >= count - 2) { p = count - 4 + i; }
                            else { p = page - 2 + i; }
                            return (
                              <li key={p} className={'page-item ' + (p === page ? 'active' : '')}>
                                <button className="page-link" onClick={() => handleChangePage(p)}>{p}</button>
                              </li>
                            );
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
