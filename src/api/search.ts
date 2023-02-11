export interface AutoCompleteResult {
    id: string
    text: string
    rawText: string
}

export async function search(query=''): Promise<AutoCompleteResult[]> {
    if (query === '') {
        return [];
    }
    const data: string[] = await fetch('/api/names').then(res => res.json())
    return data.filter(d => d.toLocaleLowerCase().includes(query.toLowerCase())).map(d => ({
        id:d,
        text:d.replace(new RegExp(`(${query})`, 'i'), '*-$1-*'),
        rawText:d,
    }))
}