import { LoadingState } from '@/api/useSearch';
import { render, screen } from '@testing-library/react';
import AutoComplete from './AutoComplete';

it('should show loader', () => {
    render(<AutoComplete loading={LoadingState.showLoader} options={[]}/>)
    const text = screen.getByText('Loading...');
    expect(text).toBeVisible();
});