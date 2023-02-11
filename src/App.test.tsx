import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import App from './App';

it('should pass', () => {
    expect(true).toBe(true)
});

it('should render app', () => {
    render(<App />);
});

it('should have a input', () => {
    render(<App />);
    const input = screen.getByRole('textbox');
    expect(input).toBeVisible();
});

it('should show results', async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'Tue');
    const button = await screen.findByRole('button', { name: /tue/i });
    expect(button).toHaveTextContent('Tuesday Corthes');
});
