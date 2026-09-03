import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the portfolio identity and all nine section destinations', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1, name: /john paul.*r\. baxter/i })).toBeInTheDocument();
  for (const name of ['Home','About','Experience','Lab','Incidents','Projects','Skills','Training','Contact']) {
    expect(document.getElementById(name.toLowerCase())).toBeInTheDocument();
  }
});
