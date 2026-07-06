import { useState, useEffect, useRef } from 'react';

export const useCardSearch = (url, q) => {
    const requestUrl = url + q.replace(" ", "%20").replace("&", "%26");
    const isMounted = useRef(true);
    const [state, setState] = useState({ data: null, loading: true, error: null });

    useEffect(() => {
        return () => {
            isMounted.current = false;
        }
    }, []);

    useEffect(() => {

        setState({ data: null, loading: true, error: null });
        if (q !== '?name=') {
            fetch(requestUrl)
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
                    setState({
                        loading: false,
                        error: error,
                        data: null
                    });

                });
        }else {
            setState({
                loading: false,
                error: null,
                data: null
            });
        }
    }, [requestUrl]);



    return state;
}