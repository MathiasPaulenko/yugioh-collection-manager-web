import { useState, useEffect, useRef } from 'react';

export const useDashboard = (statsUrl, priceUrl) => {

    const isMounted = useRef(true);
    const [state, setState] = useState({
        stats: null,
        price: null,
        loading: true,
        priceLoading: true,
        error: null
    });

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        setState(prev => ({ ...prev, stats: null, loading: true, error: null }));

        fetch(statsUrl)
            .then(resp => resp.json())
            .then(statsData => {
                if (isMounted.current) {
                    setState(prev => ({
                        ...prev,
                        stats: statsData,
                        loading: false,
                        error: null
                    }));
                }
            })
            .catch((error) => {
                if (isMounted.current) {
                    setState(prev => ({
                        ...prev,
                        stats: null,
                        loading: false,
                        error
                    }));
                }
            });

    }, [statsUrl]);

    useEffect(() => {
        setState(prev => ({ ...prev, price: null, priceLoading: true }));

        fetch(priceUrl)
            .then(resp => resp.json())
            .then(priceData => {
                if (isMounted.current) {
                    setState(prev => ({
                        ...prev,
                        price: priceData,
                        priceLoading: false
                    }));
                }
            })
            .catch(() => {
                if (isMounted.current) {
                    setState(prev => ({
                        ...prev,
                        price: null,
                        priceLoading: false
                    }));
                }
            });

    }, [priceUrl]);

    return state;
};
