import {useEffect, useState} from 'react';
import {getClient} from "../API/axiosClient";
import {toast} from "react-toastify";

const useFetch = (endpoint, client, toastify, config) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await client.get(endpoint, config);
                setData(response.data);
            } catch (error) {
                setError(error);
                if (toastify) {
                    toast.error('Something went wrong');
                }
            }
            finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [endpoint]);

    return { data, isLoading, error };
};

useFetch.defaultProps = {
    client: getClient(),
    toasify: true,
    config: {}
}

export default useFetch;