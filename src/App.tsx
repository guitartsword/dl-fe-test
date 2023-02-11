import { useEffect, useMemo, useState } from 'react'
import './App.css'

import AutoComplete from './components/AutoComplete/AutoComplete'
import useSearch from './api/useSearch'

function App() {
  const {search, options, loading} = useSearch()
  const [selected, setSelected] = useState('')


  return (
    <div className="App">
      <h1>Deel Frontend Test</h1>
      You Selected: {selected}
      <AutoComplete
        onTextInput={search}
        options={options}
        onSelect={(result) =>setSelected(result.rawText)}
        debounceTime={200}
        loading={loading}
      />
    </div>
  )
}

export default App
