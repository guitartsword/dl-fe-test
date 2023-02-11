import type { AutoCompleteResult } from '@/api/search';
import { LoadingState } from '@/api/useSearch';

import styles from './AutoComplete.module.css';


interface HiglightedTextProps {
    text: string;
    onClick?: () => void;
}

function HiglightedText({text, onClick}: HiglightedTextProps) {
    const matches = text.match(/\*-(.+)-\*/)
    let innerText: React.ReactNode = text
    if (matches) {
        const [text1, text2] = text.split(matches[0])
        innerText = <>{text1}<span>{matches[1]}</span>{text2}</>
    }
    return <button onClick={onClick} className={styles.highlight}>{innerText}</button>
}


interface AutoCompleteResultsProps {
    results: AutoCompleteResult[]
    onSelect?: (option: AutoCompleteResult) => void
    loading?: LoadingState;
}


export default function AutoCompleteResults({ results, onSelect, loading=LoadingState.initial }: AutoCompleteResultsProps) {
    if (loading === LoadingState.showLoader || loading === LoadingState.noResults) {
        const text = loading == LoadingState.showLoader ? 'Loading...' : 'Nothing Found'
        return <div className={styles.AutoCompleteResults}>
            <p>{text}</p>
        </div>
    }
    if (loading == LoadingState.initial || results.length === 0) {
        return <></>
    }
    return <div className={styles.AutoCompleteResults}>
        {results.map(r => <HiglightedText key={r.id} text={r.text} onClick={onSelect ? () => onSelect(r): undefined}/>)}
    </div>
}