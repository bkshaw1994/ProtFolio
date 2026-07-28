import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';

describe('ScrollToTop Component', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  it('scrolls window to top on mount', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <ScrollToTop />
      </MemoryRouter>
    );

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  });
});
