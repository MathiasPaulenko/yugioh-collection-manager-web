import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import queryString from 'query-string'
import { YGO_API } from '../../helpers/constants';
import { useCard } from '../../hooks/useCard';
import { useForm } from '../../hooks/useForm';
import { CardBannedOnList } from '../common/card/CardBannedOnList';
import { Loading } from '../common/Loading';
import { ReturnButton } from '../common/ReturnButton';
import { SearchCard } from '../common/search/SearchCard';
import { Title } from '../common/Title';
import { FaChevronLeft, FaChevronRight, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

const PAGE_SIZE = 60;

export const BanlistScreen = () => {
  const location = useLocation();

  const { q = '' } = queryString.parse(location.search);

  const [formValues, handleInputChange] = useForm({
    searchText: q,
  });

  const [banlistTitle, setBanlistTitle] = useState('TCG');
  const [checkInput, setCheckInput] = useState(true)
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('All');

  const [url, setUrl] = useState(`${YGO_API}?banlist=TCG`)

  const { loading, data } = useCard(url);


  useEffect(() => {
    if (!checkInput) {
      if (!formValues.searchText) {
        setUrl(`${YGO_API}?banlist=OCG`);
      } else {
        setUrl(`${YGO_API}?banlist=OCG&fname=${formValues.searchText}`);
      }
      setBanlistTitle('OCG');
    } else {
      if (!formValues.searchText) {
        setUrl(`${YGO_API}?banlist=TCG`);
      } else {
        setUrl(`${YGO_API}?banlist=TCG&fname=${formValues.searchText}`);
      }
      setBanlistTitle('TCG');
    }
    setPage(1);
  }, [checkInput, formValues]);

  useEffect(() => {
    setPage(1);
  }, [statusFilter]);

  const cardData = !!data && data.data;

  const filteredData = cardData ? cardData.filter(card => {
    if (statusFilter === 'All') return true;
    const status = banlistTitle === 'TCG' ? card.banlist_info?.ban_tcg : card.banlist_info?.ban_ocg;
    return status === statusFilter;
  }) : [];

  const totalCount = filteredData.length;
  const count = Math.ceil(totalCount / PAGE_SIZE);
  const rangeStart = ((page - 1) * PAGE_SIZE) + 1;
  const rangeEnd = Math.min(page * PAGE_SIZE, totalCount);
  const pagedData = filteredData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleCheckboxChange = (e) => {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setCheckInput(value);
  }

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
          <Title value={`Banlist ${banlistTitle}`} />
        </div>
        <div className="col-sm-4 text-end">
          <ReturnButton value="Return" />
        </div>
      </div>

      <SearchCard
        value={formValues}
        handle={handleInputChange}
        resetValue='/banlist'
        placeholder="Card Name"
      />

      <div className='banlist-toolbar mb-3 mt-2'>
        <div className='banlist-segmented'>
          <button
            className={`banlist-seg-btn ${checkInput ? 'active' : ''}`}
            onClick={() => setCheckInput(true)}
          >
            TCG
          </button>
          <button
            className={`banlist-seg-btn ${!checkInput ? 'active' : ''}`}
            onClick={() => setCheckInput(false)}
          >
            OCG
          </button>
        </div>
        <div className='d-flex align-items-center gap-2'>
          {['All', 'Forbidden', 'Limited', 'Semi-Limited'].map(s => (
            <button
              key={s}
              className={`btn btn-sm ${statusFilter === s ? 'btn-dark' : 'btn-outline-secondary'}`}
              onClick={() => setStatusFilter(s)}
            >
              {s}
            </button>
          ))}
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
                    <p className="text-muted mb-0">No banned cards found.</p>
                  </div>
                )
              }
              return (
                <>
                  <div className="d-flex align-items-center justify-content-between mb-2 mt-3">
                    <span className="coll-count text-muted small">
                      Showing <strong>{rangeStart}-{rangeEnd}</strong> of <strong>{totalCount}</strong> cards
                    </span>
                  </div>

                  <div className="row g-2 mt-1 animate__animated animate__fadeIn">
                    {pagedData.map(card => (
                      <CardBannedOnList
                        key={card.id}
                        name={card.id}
                        image={getCardImage(card)}
                        card_name={card.name}
                        banlist_info={card.banlist_info}
                        list={banlistTitle}
                      />
                    ))}
                  </div>

                  {count > 1 && (
                    <div className="coll-sticky-pagination">
                      <nav className="d-flex justify-content-center">
                        <ul className="pagination pagination-sm mb-0">
                          <li className={`page-item ${page <= 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => handleChangePage(1)} aria-label="First">
                              <FaAngleDoubleLeft size={12} />
                            </button>
                          </li>
                          <li className={`page-item ${page <= 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => handleChangePage(page - 1)} aria-label="Previous">
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
                              <li key={p} className={`page-item ${p === page ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => handleChangePage(p)}>{p}</button>
                              </li>
                            );
                          })}
                          <li className={`page-item ${page >= count ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => handleChangePage(page + 1)} aria-label="Next">
                              <FaChevronRight size={12} />
                            </button>
                          </li>
                          <li className={`page-item ${page >= count ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => handleChangePage(count)} aria-label="Last">
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
