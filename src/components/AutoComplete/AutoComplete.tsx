import { useRef } from 'react';

import type { AutoCompleteResult } from '@/api/search';
import { LoadingState } from '@/api/useSearch';
import { debounce } from '@/utils';

import styles from './AutoComplete.module.css';
import AutoCompleteResults from './AutoCompleteResults';

interface AutoCompleteProps {
    onSelect?: (option: AutoCompleteResult) => void
    onTextInput?: (text: string) => void
    options: AutoCompleteResult[]
    debounceTime?: number
    loading?: LoadingState
}

export default function AutoComplete({ onTextInput, onSelect, options=[], debounceTime=0, loading=LoadingState.initial }:AutoCompleteProps) {
    const ref = useRef<HTMLInputElement|null>(null)
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        onTextInput?.(e.target.value)
    }

    const debouncedInput = debounceTime > 0 ? debounce(handleInput, debounceTime) : handleInput

    const handleSelect = (option: AutoCompleteResult) => {
        onTextInput?.('');
        onSelect?.(option);
        if(ref.current) {
            ref.current.value = option.rawText;
        }
    }

    const noResults = ref.current?.value !== '' && options.length === 0

    return <div className={styles.AutoComplete}>
        <input className={styles.input} onChange={debouncedInput} ref={ref}/>
        <AutoCompleteResults results={options} onSelect={handleSelect} loading={loading}/>
    </div>
}