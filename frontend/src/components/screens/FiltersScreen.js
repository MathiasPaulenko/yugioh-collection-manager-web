import React, { useState, useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string'

import { useFilterCard } from '../../hooks/useFilterCard';
import { CardOnList } from "../common/card/CardOnList";
import { InputField, SelectField } from "../common/search/InputField"
import { Title } from "../common/Title"
import { Loading } from "../common/Loading";
import { BASE_URL } from '../../helpers/constants.js';
import { ReturnButton } from '../common/ReturnButton';
import { FaCog, FaBolt, FaClipboardList, FaChevronLeft, FaChevronRight, FaAngleDoubleLeft, FaAngleDoubleRight, FaSearch } from 'react-icons/fa';

export const FiltersScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queries = queryString.parse(location.search);
    const [page, setPage] = useState(1);

    let queries_filters = {}
    for (const query in queries) {
        if (queries[query] !== '')
            queries_filters[query] = queries[query];
    }
    queries_filters.offset = page;

    const { loading, data } = useFilterCard(`${BASE_URL}collection/card/`, queries_filters);

    const card_data = !!data && data.data;
    const totalCount = !!data && data.count;
    const pageSize = !!data && data.page_size;
    const count = !!data && parseInt(((data.count / data.page_size)).toFixed());
    const rangeStart = !!data && ((page - 1) * pageSize + 1);
    const rangeEnd = !!data && Math.min(page * pageSize, totalCount);

    useEffect(() => {
        setPage(1);
    }, [location.search]);

    const handleReset = () => {
        navigate('/filters');
    };

    const handleChangePage = (event, value) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <div className='row align-items-center mb-3'>
                <div className='col-sm-8'>
                    <Title value='Filters' />
                </div>
                <div className="col-sm-4">
                    <ReturnButton value="Return" />
                </div>
            </div>

            <div className="filter-card mb-5">
                <div className="filter-card-body">
                    <form>
                        <div className="filter-section-label">
                            <FaCog className="filter-section-icon" size={12} />
                            Card Properties
                        </div>
                        <div className="row g-2 mb-2">
                            <InputField type="text" info="Name" size="col-sm-6 col-md-4 col-lg-3" />
                            <InputField type="text" info="Serial Code" size="col-sm-6 col-md-4 col-lg-3" />
                            <InputField type="text" info="Card Number" size="col-sm-6 col-md-4 col-lg-3" />
                            <InputField type="text" info="Archetype" size="col-sm-6 col-md-4 col-lg-3" />
                        </div>

                        <div className="filter-section-label">
                            <FaBolt className="filter-section-icon" size={12} />
                            Stats & Type
                        </div>
                        <div className="row g-2 mb-2">
                            <SelectField path="info/types/" name="Type" size="col-sm-6 col-md-4 col-lg-3" />
                            <SelectField path="info/subtype/" name="Subtype" size="col-sm-6 col-md-4 col-lg-3" />
                            <SelectField path="info/card_races" name="Race" size="col-sm-6 col-md-4 col-lg-3" />
                            <SelectField path="info/attribute/" name="Attribute" size="col-sm-6 col-md-4 col-lg-3" />
                            <InputField type="number" info="Level" autoComplete="off" size="col-sm-6 col-md-4 col-lg-3" />
                            <InputField type="number" info="Attack" autoComplete="off" size="col-sm-6 col-md-4 col-lg-3" />
                            <InputField type="number" info="Defence" autoComplete="off" size="col-sm-6 col-md-4 col-lg-3" />
                            <InputField type="number" info="Amount" autoComplete="off" size="col-sm-6 col-md-4 col-lg-3" />
                        </div>

                        <div className="filter-section-label">
                            <FaClipboardList className="filter-section-icon" size={12} />
                            Collection & Meta
                        </div>
                        <div className="row g-2 mb-2">
                            <SelectField path="info/rarity/" name="Rarity" size="col-sm-6 col-md-4 col-lg-3" />
                            <InputField type="text" info="Set Name" size="col-sm-6 col-md-4 col-lg-3" />
                            <InputField type="text" info="Game Format" size="col-sm-6 col-md-4 col-lg-3" />
                            <InputField type="text" info="Language" size="col-sm-6 col-md-4 col-lg-3" />
                            <InputField type="text" info="Banned" size="col-sm-6 col-md-4 col-lg-3" />
                            <InputField type="text" info="Description" size="col-sm-6 col-md-8 col-lg-6" />
                        </div>

                        <div className="filter-actions">
                            <div className="d-flex gap-2">
                                <button
                                    className="btn btn-filter-primary"
                                    type="submit">
                                    Filter
                                </button>
                                <button
                                    className="btn btn-filter-reset"
                                    type="reset"
                                    onClick={handleReset}
                                >
                                    Reset
                                </button>
                            </div>
                            {!loading && card_data && card_data.length > 0 && (
                                <span className="coll-count text-muted small ms-auto">
                                    Showing <strong>{rangeStart}-{rangeEnd}</strong> of <strong>{totalCount}</strong> cards
                                </span>
                            )}
                        </div>
                    </form>
                </div>
            </div>

            {loading
                ? <Loading />
                : (
                    <>
                        {(() => {
                            if (!card_data) {
                                return <div className="alert alert-danger mt-3">Data not found: Backend is off.</div>;
                            }
                            if (card_data.length === 0) {
                                return (
                                    <div className="coll-empty text-center py-5">
                                        <div className="coll-empty-icon mb-2"><FaSearch size={32} /></div>
                                        <p className="text-muted mb-0">No cards found with these filters.</p>
                                    </div>
                                );
                            }
                            return (
                                <>
                                    <div className="row g-2 mt-2 animate__animated animate__fadeIn">
                                        {card_data.map(card => (
                                            <CardOnList
                                                key={card.serial_code}
                                                name={card.serial_code}
                                                image={card.img_code}
                                                card_name={card.name}
                                                serial_code={card.serial_code}
                                                rarity={card.rarity}
                                            />
                                        ))}
                                    </div>

                                    <div className="coll-sticky-pagination">
                                        <nav className="d-flex justify-content-center">
                                            <ul className="pagination pagination-sm mb-0">
                                                <li className={`page-item ${page <= 1 ? 'disabled' : ''}`}>
                                                    <button className="page-link" onClick={() => handleChangePage(null, 1)} aria-label="First">
                                                        <FaAngleDoubleLeft size={12} />
                                                    </button>
                                                </li>
                                                <li className={`page-item ${page <= 1 ? 'disabled' : ''}`}>
                                                    <button className="page-link" onClick={() => handleChangePage(null, page - 1)} aria-label="Previous">
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
                                                            <button className="page-link" onClick={() => handleChangePage(null, p)}>{p}</button>
                                                        </li>
                                                    );
                                                })}
                                                <li className={`page-item ${page >= count ? 'disabled' : ''}`}>
                                                    <button className="page-link" onClick={() => handleChangePage(null, page + 1)} aria-label="Next">
                                                        <FaChevronRight size={12} />
                                                    </button>
                                                </li>
                                                <li className={`page-item ${page >= count ? 'disabled' : ''}`}>
                                                    <button className="page-link" onClick={() => handleChangePage(null, count)} aria-label="Last">
                                                        <FaAngleDoubleRight size={12} />
                                                    </button>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </>
                            );
                        })()}
                    </>
                )
            }
        </>
    )
}
