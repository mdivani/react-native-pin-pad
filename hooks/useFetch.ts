import {useState, useRef, useEffect, useMemo} from 'react'
import {AxiosError} from 'axios';
import {AxiosClient, IFetchOptions} from '../api/axiosClient';

export enum FetchState {
    fetching = "fetching",
    failed = "failed",
    finished = "finished",
    initial = "initial",
}

export interface IFetchResponse<T> {
    data: T | null;
    error: AxiosError | any | null;
}

export const useFetch = <T = Record<string, unknown>>(initialOptions?: IFetchOptions): [IFetchResponse<T>, (options?: IFetchOptions, cb?: () => void) => Promise<void>, FetchState] => {
    const [state, setState] = useState<FetchState>(FetchState.initial);
    const [responseData, setResponseData] = useState<T | null>(null);
    const [responseError, setResponseError] = useState(null);
    const isMounted = useRef(false);
    const client = useMemo(() => {
        return new AxiosClient(initialOptions);
    }, []);

    async function fetch(options?: IFetchOptions, callback?: () => void) {
        const fetchOptions = options ? options : initialOptions;
        if (!isMounted.current) return;
        try {
            setResponseError(null);
            if (!fetchOptions) {
                throw new Error("Missing Fetch params");
            };

            setState(FetchState.fetching);
            const data = await client.fetch(fetchOptions);
            if (isMounted.current) {
                setResponseError(null);
                setState(FetchState.finished);
                setResponseData(data);
                if (callback) {
                    callback();
                }
            }
        } catch (ex: any) {
            if (isMounted.current) {
                setState(FetchState.failed);
                if (ex && ex.response) {
                    setResponseError(ex.response.data || ex);
                } else {
                    setResponseError(ex);
                }
            }
        }
    }

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false
        };
    }, []);

    return [{data: responseData, error: responseError}, fetch, state];
}
