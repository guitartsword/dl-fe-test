import { useEffect, useState } from 'react';

import type { AutoCompleteResult } from './search';
import { search } from './search';

export enum LoadingState {
    initial,
    loading,
    showLoader,
    success,
    noResults
}

export default function useSearch() {
    const [options, setOptions] = useState<AutoCompleteResult[]>([])
    const [text, triggerSearch] = useState('')
    const [loading, setLoading] = useState<LoadingState>(LoadingState.initial)
    useEffect(() => {
        const fetchData = async () => {
            if (!text) {
                setOptions([])
                setLoading(LoadingState.initial)
                return
            }
            setLoading(LoadingState.loading)
            const timeout = setTimeout(() => {
                setLoading(LoadingState.showLoader)
            }, 800)
            const data = await search(text)
            clearTimeout(timeout)
            setLoading(data.length > 0 ? LoadingState.success : LoadingState.noResults);
            setOptions(data);
        }
        fetchData()
    }, [text])

    return {
        options,
        search: triggerSearch,
        loading,
    }
}