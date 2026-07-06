import React, { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string'

import { useCard } from "../../hooks/useCard";
import { useForm } from '../../hooks/useForm';

import { CardOnList } from "../common/card/CardOnList";
import { Title } from "../common/Title";
import { BASE_URL } from '../../helpers/constants.js';
import { FaLayerGroup, FaClone, FaSearch, FaChevronLeft, FaChevronRight, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

const ORDER_OPTIONS = [
    { value: 'card_number', label: 'Card Number ↑' },
    { value: '-card_number', label: 'Card Number ↓' },
    { value: 'name', label: 'Card Name ↑' },
    { value: '-name', label: 'Card Name ↓' },
    { value: 'serial_code', label: 'Serial Code ↑' },
    { value: '-serial_code', label: 'Serial Code ↓' },
];

const SkeletonGrid = () => (
    <div className="row g-2 mt-2">
        {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="col-6 col-sm-4 col-md-3 col-lg-2 mb-3">
                <div className="coll-skeleton rounded-3" />
            </div>
        ))}
    </div>
);

export const CollectionsScreen = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const { q = '' } = queryString.parse(location.search);

    const [formValues, handleInputChange] = useForm({
        searchText: q,
    });

    const [checkInput, setCheckInput] = useState(true)
    const [order, setOrder] = useState('card_number');
    const [page, setPage] = useState(1);
    const [url, setUrl] = useState(`${BASE_URL}collection/card/?name=${formValues.searchText}&distinct=true&ord=${order}&offset=${page}`)
    const { loading, data } = useCard(url);

    useEffect(() => {

        if(formValues.searchText !== ''){
            setPage(1);
        }

        if (!checkInput) {
            setUrl(`${BASE_URL}collection/card/?name=${formValues.searchText}&ord=${order}&offset=${page}`)
        } else {
            setUrl(`${BASE_URL}collection/card/?name=${formValues.searchText}&distinct=true&ord=${order}&offset=${page}`)
        }

    }, [checkInput, formValues, order, page]);

    const card_data = !!data && data.data;
    const totalCount = !!data && data.count;
    const pageSize = !!data && data.page_size;
    const count = !!data && parseInt(((data.count / data.page_size) ).toFixed());
    const rangeStart = !!data && ((page - 1) * pageSize + 1);
    const rangeEnd = !!data && Math.min(page * pageSize, totalCount);

    const handleCheckboxChange = (e) => {
        const target = e.target
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setCheckInput(value);
    }

    const handleOrderChange = (event) => {
        setOrder(event.target.value);
    };

    const handleChangePage = (event, value) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <div className='mb-3'>
                <Title value='Collection' />
            </div>

            <div className="coll-toolbar rounded-3 mb-3 p-2 px-3">
                <div className="d-flex flex-wrap align-items-center gap-2">
                    <div className="coll-search-wrap position-relative flex-grow-1" style={{ minWidth: 200 }}>
                        <FaSearch className="coll-search-icon" size={16} />
                        <input
                            type="text"
                            placeholder="Search by card name..."
                            className="coll-search-input form-control ps-5 pe-4 rounded-pill"
                            name="searchText"
                            id="searchText"
                            autoComplete="off"
                            value={formValues.searchText}
                            onChange={handleInputChange}
                            onKeyDown={(e) => { if (e.key === 'Enter') { navigate(`?q=${formValues.searchText}`); } }}
                        />
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <select
                            className="coll-select form-select form-select-sm"
                            value={order}
                            onChange={handleOrderChange}
                        >
                            {ORDER_OPTIONS.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                        <div className="form-check form-switch d-flex align-items-center gap-1 mb-0">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                name='distinct'
                                checked={checkInput}
                                onChange={handleCheckboxChange}
                                id="distinct"
                            />
                            <label className="form-check-label small fw-semibold d-flex align-items-center gap-1" htmlFor="distinct">
                                {checkInput ? <FaLayerGroup size={12} /> : <FaClone size={12} />}
                                {checkInput ? 'Distinct' : 'All'}
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {
                loading
                    ? <SkeletonGrid />
                    : (
                        <>
                            {(() => {
                                if (!card_data) {
                                    return <div className="alert alert-danger mt-3">Data no found: Backend is off.</div>
                                }
                                if (card_data.length === 0) {
                                    return (
                                        <div className="coll-empty text-center py-5">
                                            <div className="coll-empty-icon mb-2">🔍</div>
                                            <p className="text-muted mb-0">No cards found{q && ` for "${q}"`}</p>
                                        </div>
                                    );
                                }
                                return (
                                    <>
                                        <div className="d-flex align-items-center justify-content-between mb-2">
                                            <span className="coll-count text-muted small">
                                                Showing <strong>{rangeStart}-{rangeEnd}</strong> of <strong>{totalCount}</strong> cards
                                            </span>
                                        </div>

                                        <nav className="d-flex justify-content-center mb-4">
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

                                        <div className="row g-2 mt-2 animate__animated animate__fadeIn">
                                            {card_data.map(card => (
                                                <CardOnList
                                                    key={card.serial_code}
                                                    name={card.serial_code}
                                                    image={card.img_code}
                                                    card_name={card.name}
                                                    serial_code={card.serial_code}
                                                    rarity={card.rarity}
                                                    amount={card.amount}
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
                                )
                            })()}
                        </>
                    )
            }
        </>
    )
}
