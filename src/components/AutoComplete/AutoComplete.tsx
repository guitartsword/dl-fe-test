import styles from './AutoComplete.module.css';
import AutoCompleteResults from './AutoCompleteResults';


export default function AutoComplete() {
    return <div className={styles.AutoComplete}>
        <input className={styles.input} />
        <AutoCompleteResults />
    </div>
}