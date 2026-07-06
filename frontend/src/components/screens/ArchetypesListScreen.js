import React, { useEffect, useState } from 'react'
import { YGO_BASE } from '../../helpers/constants';
import { useCard } from '../../hooks/useCard';
import { Loading } from '../common/Loading';
import { ReturnButton } from '../common/ReturnButton'
import { Title } from '../common/Title'
import { SearchCard } from '../common/search/SearchCard';
import { useForm } from '../../hooks/useForm';
import { FaChevronLeft, FaChevronRight, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { FaSearch, FaBook } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { YGO_PIC } from '../../helpers/constants';

const PAGE_SIZE = 48;

export const ArchetypesListScreen = () => {

  const { loading, data } = useCard(`${YGO_BASE}archetypes.php`);
  const allArchetypes = !!data && data;

  const [formValues, handleInputChange] = useForm({ searchText: '' });
  const [page, setPage] = useState(1);
  const [archetypeImages, setArchetypeImages] = useState({});

  const filtered = allArchetypes
    ? allArchetypes.filter(a =>
        a.archetype_name.toLowerCase().includes((formValues.searchText || '').toLowerCase())
      )
    : [];

  const totalCount = filtered.length;
  const count = Math.ceil(totalCount / PAGE_SIZE);
  const pagedData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [formValues.searchText]);

  useEffect(() => {
    if (!pagedData.length) return;

    const missing = pagedData.filter(a => !archetypeImages[a.archetype_name]);
    if (!missing.length) return;

    let cancelled = false;
    missing.forEach(async (arch) => {
      try {
        const res = await fetch(`${YGO_BASE}cardinfo.php?archetype=${encodeURIComponent(arch.archetype_name)}&num=1&offset=0`);
        const json = await res.json();
        if (!cancelled && json.data && json.data.length > 0) {
          const img = json.data[0].card_images?.[0]?.image_url_cropped || null;
          setArchetypeImages(prev => ({ ...prev, [arch.archetype_name]: img }));
        }
      } catch {
        if (!cancelled) {
          setArchetypeImages(prev => ({ ...prev, [arch.archetype_name]: null }));
        }
      }
    });

    return () => { cancelled = true; };
  }, [pagedData]);

  const handleChangePage = (value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className='row align-items-center mb-3'>
        <div className='col-sm-8'>
          <Title value='Archetypes List' />
        </div>
        <div className="col-sm-4 text-end">
          <ReturnButton value="Return" />
        </div>
      </div>

      <SearchCard
        value={formValues}
        handle={handleInputChange}
        resetValue='/archetypes_list'
        placeholder="Archetype Name"
      />

      {loading
        ? <Loading />
        : (
            <>
              {(() => {
                if (!allArchetypes) {
                  return <div className="alert alert-danger mt-3">Data not found: API is unavailable.</div>
                }
                if (totalCount === 0) {
                  return (
                    <div className="coll-empty text-center py-5">
                      <p className="text-muted mb-0">No archetypes found.</p>
                    </div>
                  )
                }
                return (
                  <>
                    <div className="d-flex align-items-center justify-content-between mb-2 mt-3">
                      <span className="coll-count text-muted small">
                        Showing <strong>{((page - 1) * PAGE_SIZE) + 1}-{Math.min(page * PAGE_SIZE, totalCount)}</strong> of <strong>{totalCount}</strong> archetypes
                      </span>
                    </div>

                    <div className="archetype-compact-grid mt-2 animate__animated animate__fadeIn">
                      {pagedData.map(card => (
                        <div key={card.archetype_name} className='archetype-compact-item'>
                          {archetypeImages[card.archetype_name] !== undefined && archetypeImages[card.archetype_name] ? (
                            <LazyLoadImage
                              className="archetype-compact-thumb"
                              alt={card.archetype_name}
                              src={archetypeImages[card.archetype_name]}
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = `${YGO_PIC}back_high.jpg`;
                              }}
                            />
                          ) : (
                            <div className="archetype-compact-thumb-placeholder" />
                          )}
                          <span className="archetype-compact-name">{card.archetype_name}</span>
                          <div className="archetype-compact-actions">
                            <a
                              href={`/filters?archetype=${encodeURIComponent(card.archetype_name)}`}
                              className="archetype-action-btn"
                              title="Ver en mi colección"
                            >
                              <FaBook size={12} />
                            </a>
                            <a
                              href={`/archetype_cards?archetype=${encodeURIComponent(card.archetype_name)}`}
                              className="archetype-action-btn"
                              title="Ver todas las cartas del arquetipo"
                            >
                              <FaSearch size={12} />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>

                    {count > 1 && (
                      <div className="coll-sticky-pagination">
                        <nav className="d-flex justify-content-center">
                          <ul className="pagination pagination-sm mb-0">
                            <li className={`page-item ${page <= 1 ? 'disabled' : ''}`}>
                              <button className="page-link" onClick={() => handleChangePage(1)}>
                                <FaAngleDoubleLeft size={12} />
                              </button>
                            </li>
                            <li className={`page-item ${page <= 1 ? 'disabled' : ''}`}>
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
                                <li key={p} className={`page-item ${p === page ? 'active' : ''}`}>
                                  <button className="page-link" onClick={() => handleChangePage(p)}>{p}</button>
                                </li>
                              );
                            })}
                            <li className={`page-item ${page >= count ? 'disabled' : ''}`}>
                              <button className="page-link" onClick={() => handleChangePage(page + 1)}>
                                <FaChevronRight size={12} />
                              </button>
                            </li>
                            <li className={`page-item ${page >= count ? 'disabled' : ''}`}>
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
