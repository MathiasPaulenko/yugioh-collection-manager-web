import React, { useState } from 'react'
import { useDashboard } from '../../hooks/useDashboard';

import { Title } from '../common/Title'
import { BASE_URL } from '../../helpers/constants.js';
import { Loading } from '../common/Loading';
import { TotalCard } from '../common/dashboard/TotalCard';

import { FaLayerGroup, FaCopy, FaDollarSign, FaChartBar } from 'react-icons/fa';

export const Dashboard = () => {

    const { loading, stats, price, priceLoading, error } = useDashboard(
        `${BASE_URL}dashboard/total_cards`,
        `${BASE_URL}collection/total_price`
    );

    const [activeTab, setActiveTab] = useState('unique');

    const card_repeated = !!stats && stats.repeated;
    const card_unique = !!stats && stats.unique;
    const priceValue = !!price && price.data;

    const totalDistinct = card_unique ? card_unique.total_cards : 0;
    const totalRepeated = card_repeated ? card_repeated.total_cards : 0;

    return (
        <>
            <div className='mb-4'>
                <Title value='Dashboard' />
            </div>

            {loading
                ? <Loading />
                : error
                    ? <div className="alert alert-danger">Data not found: Backend is off.</div>
                    : (
                        <div className='animate__animated animate__fadeIn'>
                            {/* Hero + stats row */}
                            <div className="row g-3 mb-4">
                                {/* Collection Value hero card */}
                                <div className="col-sm-6 col-lg-3">
                                    <div className="dash-hero-card rounded-4 p-4 h-100 text-white"
                                         style={{ background: 'linear-gradient(135deg, #198754 0%, #20c997 100%)' }}>
                                        <div className="d-flex align-items-center gap-2 mb-2">
                                            <FaDollarSign size={20} />
                                            <span className="fw-semibold text-white-50">Collection Value</span>
                                        </div>
                                        {priceLoading
                                            ? <div className="dash-shimmer rounded-3" style={{ width: 140, height: 44 }} />
                                            : <div className="display-6 fw-bold">${priceValue}</div>
                                        }
                                        <div className="text-white-50 small mt-1">
                                            {priceLoading
                                                ? <span className="dash-shimmer rounded-2 d-inline-block" style={{ width: 100, height: 14 }} />
                                                : `$${totalDistinct > 0 ? (parseFloat(priceValue) / totalDistinct).toFixed(2) : '0.00'} avg / card`
                                            }
                                        </div>
                                    </div>
                                </div>
                                {/* Mini stat cards */}
                                <div className="col-sm-6 col-lg-3">
                                    <div className="dash-stat-card rounded-4 border p-4 h-100">
                                        <FaLayerGroup className="text-primary mb-2" size={24} />
                                        <div className="text-muted small fw-semibold">Distinct Cards</div>
                                        <div className="h2 fw-bold mb-0 text-primary">{totalDistinct}</div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-lg-3">
                                    <div className="dash-stat-card rounded-4 border p-4 h-100">
                                        <FaCopy className="text-info mb-2" size={24} />
                                        <div className="text-muted small fw-semibold">Total Cards</div>
                                        <div className="h2 fw-bold mb-0 text-info">{totalRepeated}</div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-lg-3">
                                    <div className="dash-stat-card rounded-4 border p-4 h-100">
                                        <FaChartBar className="text-warning mb-2" size={24} />
                                        <div className="text-muted small fw-semibold">Duplicates</div>
                                        <div className="h2 fw-bold mb-0 text-warning">{totalRepeated - totalDistinct}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Tabs */}
                            <div className="dash-tabs d-flex gap-2 mb-4 sticky-top">
                                <button
                                    className={`dash-tab ${activeTab === 'unique' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('unique')}
                                >
                                    <FaLayerGroup className="me-2" size={14} />
                                    Distinct ({totalDistinct})
                                </button>
                                <button
                                    className={`dash-tab ${activeTab === 'repeated' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('repeated')}
                                >
                                    <FaCopy className="me-2" size={14} />
                                    Total ({totalRepeated})
                                </button>
                            </div>

                            {/* Tab content */}
                            {activeTab === 'unique' && card_unique && (
                                <TotalCard cards={card_unique} />
                            )}
                            {activeTab === 'repeated' && card_repeated && (
                                <TotalCard cards={card_repeated} />
                            )}
                        </div>
                    )
            }
        </>
    )
}
