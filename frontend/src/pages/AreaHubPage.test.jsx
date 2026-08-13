import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AreaHubPage from './AreaHubPage';

describe('AreaHubPage', () => {
  it('renders Surat fallback content for a valid Surat area slug', async () => {
    render(
      <MemoryRouter initialEntries={['/vesu']}>
        <Routes>
          <Route path='/:areaSlug' element={<AreaHubPage />} />
        </Routes>
      </MemoryRouter>
    );

    const heroHeading = await screen.findByRole('heading', { level: 1, name: /Painting Services in Vesu, Surat/i });
    expect(heroHeading).toBeTruthy();

    const sectionHeading = screen.getByRole('heading', { level: 3, name: /Our Painting Services in Vesu, Surat are Customer Focused and Quality Driven/i });
    expect(sectionHeading).toBeTruthy();

    expect(document.title).toContain('Painting Services in Vesu, Surat - HousePaintersSurat');
  });
});
