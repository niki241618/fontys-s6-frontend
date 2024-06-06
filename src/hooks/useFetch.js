import {useEffect, useState} from 'react';
import {getClient} from "../API/axiosClient";
import {toast} from "react-toastify";

const useFetch = (endpoint, toastify = true, config, defaultValue = null) => {
    const [data, setData] = useState(defaultValue);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const client = getClient();

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
export default useFetch;