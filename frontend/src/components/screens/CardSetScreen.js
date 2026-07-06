import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import queryString from 'query-string'
import { useForm } from '../../hooks/useForm';
import { Loading } from "../common/Loading";
import { YGO_API } from '../../helpers/constants.js';
import { SearchCard } from '../common/search/SearchCard';
import { ReturnButton } from '../common/ReturnButton';
import { Title } from '../common/Title';
import { useCardset } from '../../hooks/useCardset';
import { CardSetList } from '../common/card/CardSetList';
import { FaChevronLeft, FaChevronRight, FaAngleDoubleLeft, FaAngleDoubleRight, FaEye, FaEyeSlash } from 'react-icons/fa'

const PAGE_SIZE = 60

export const CardSetScreen = () => {
    const location = useLocation();
    const { q = '' } = queryString.parse(location.search);

    const [formValues, handleInputChange] = useForm({
        searchText: q,
    });

    const [checkInput, setCheckInput] = useState(true)
    const [page, setPage] = useState(1)

    const { loading, data } = useCardset(YGO_API, '?cardset=' + q);

    let error = false;
    if (data && data.hasOwnProperty('error')) {
        error = true;
    }

    const cardData = !!data && data.data;
    const totalCount = cardData ? cardData.length : 0;
    const count = Math.ceil(totalCount / PAGE_SIZE);
    const pagedData = cardData ? cardData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE) : [];

    useEffect(() => { setPage(1) }, [q]);

    const handleChangePage = (value) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <>
            <div className='row align-items-center mb-3'>
                <div className='col-sm-10'>
                    <Title value='Cardset' />
                    <p className="text-muted mb-0 small">Cards not in collection appear in gray with a red icon.</p>
                </div>
                <div className="col-sm-2 text-end">
                    <ReturnButton value="Return" />
                </div>
            </div>

            <div className="d-flex align-items-center gap-2 mb-3">
                <div className="flex-grow-1">
                    <SearchCard
                        value={formValues}
                        handle={handleInputChange}
                        resetValue='/cardset'
                        placeholder="Card Set Name"
                    />
                </div>
                <button
                    type="button"
                    className={'cardset-toggle-btn mb-3' + (checkInput ? ' cardset-toggle-active' : '')}
                    onClick={() => setCheckInput(!checkInput)}
                >
                    {checkInput
                        ? <><FaEye size={14} className="me-1" /> Highlight missing</>
                        : <><FaEyeSlash size={14} className="me-1" /> Show all</>
                    }
                </button>
            </div>

            {loading
                ? <Loading />
                : (
                    <>
                        {(() => {
                            if (error) {
                                return (
                                    <div className="mt-3 alert alert-warning text-center">
                                        No card set found: {q}
                                    </div>
                                )
                            } else if (!cardData) {
                                return (
                                    <div className="mt-3 alert alert-secondary">
                                        Search by the <strong>exact</strong> name of the Card Set.
                                    </div>
                                )
                            }
                            return (
                                <>
                                    <div className="d-flex align-items-center justify-content-between mb-2 mt-2">
                                        <span className="coll-count text-muted small">
                                            Showing <strong>{((page - 1) * PAGE_SIZE) + 1}-{Math.min(page * PAGE_SIZE, totalCount)}</strong> of <strong>{totalCount}</strong> cards
                                        </span>
                                    </div>

                                    <div className="row g-2 mt-1 animate__animated animate__fadeIn">
                                        {pagedData.map(card => (
                                            <CardSetList
                                                key={card.id}
                                                name={card.id}
                                                image={card.id}
                                                card_name={card.name}
                                                card_sets={card.card_sets}
                                                set_name={q}
                                                color={checkInput}
                                            />
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
