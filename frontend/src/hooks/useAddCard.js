import { useState, useEffect, useRef } from 'react';

export const useAddCard = (url, filters) => {


    for (const filter in filters) {
        console.log(filter);
        console.log(filters[filter]);
    }



    const isMounted = useRef(true);
    const [state, setState] = useState({ data: null, loading: true, error: null });

    useEffect(() => {
        return () => {
            isMounted.current = false;
        }
    }, []);

    useEffect(() => {

        setState({ data: null, loading: true, error: null });

        fetch(
            url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: {}
        })
            .then(resp => resp.json())
            .then(data => {
                if (isMounted.current) {
                    setState({
                        loading: false,
                        error: null,
                        data
                    });
                }
            }).catch((error) => {
                console.log(error)
                setState({
                    loading: false,
                    error: error,
                    data: null
                });

            });

    }, [url]);



    return state;
}