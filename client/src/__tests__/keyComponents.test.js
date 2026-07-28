// Tests for key components
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Import components to test
import LoadingSpinner from '../components/LoadingSpinner';
import NotFound from '../pages/NotFound/NotFound';
import SkillBadge from '../components/SkillBadge/SkillBadge';

// Test wrapper for components that need routing
const TestWrapper = ({ children }) => (
  <HelmetProvider>
    <BrowserRouter>{children}</BrowserRouter>
  </HelmetProvider>
);

describe('Component Tests', () => {
  describe('LoadingSpinner', () => {
    it('renders loading spinner', () => {
      render(<LoadingSpinner />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders with default text', () => {
      render(<LoadingSpinner />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders loading component structure', () => {
      render(<LoadingSpinner />);
      // Check for the presence of loading text
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  describe('NotFound Page', () => {
    it('renders 404 page without crashing', () => {
      render(
        <TestWrapper>
          <NotFound />
        </TestWrapper>
      );

      expect(screen.getByText('404')).toBeInTheDocument();
    });

    it('displays page not found message', () => {
      render(
        <TestWrapper>
          <NotFound />
        </TestWrapper>
      );

      expect(screen.getByText('Page Not Found')).toBeInTheDocument();
      expect(
        screen.getByText(/The page you're looking for doesn't exist/)
      ).toBeInTheDocument();
    });

    it('renders home navigation link', () => {
      render(
        <TestWrapper>
          <NotFound />
        </TestWrapper>
      );

      const homeLink = screen.getByRole('link', { name: /go home/i });
      expect(homeLink).toBeInTheDocument();
      expect(homeLink).toHaveAttribute('href', '/');
    });

    it('renders back button', () => {
      render(
        <TestWrapper>
          <NotFound />
        </TestWrapper>
      );

      const backButton = screen.getByRole('button', { name: /go back/i });
      expect(backButton).toBeInTheDocument();
    });

    it('handles back button click', () => {
      // Mock window.history.back
      const mockBack = jest.fn();
      Object.defineProperty(window, 'history', {
        value: { back: mockBack },
        writable: true
      });

      render(
        <TestWrapper>
          <NotFound />
        </TestWrapper>
      );

      const backButton = screen.getByRole('button', { name: /go back/i });
      fireEvent.click(backButton);

      expect(mockBack).toHaveBeenCalled();
    });
  });

  describe('SkillBadge Component', () => {
    const mockSkill = {
      name: 'React',
      level: 'Advanced',
      proficiency: 90,
      category: 'Frontend'
    };

    it('renders skill name', () => {
      render(<SkillBadge skill={mockSkill} />);
      expect(screen.getByText('React')).toBeInTheDocument();
    });

    it('renders skill level when showProficiency is true', () => {
      render(<SkillBadge skill={mockSkill} showProficiency={true} />);
      expect(screen.getByText('Advanced')).toBeInTheDocument();
    });

    it('hides proficiency when showProficiency is false', () => {
      render(<SkillBadge skill={mockSkill} showProficiency={false} />);
      expect(screen.queryByText('Advanced')).not.toBeInTheDocument();
    });

    it('renders with different sizes', () => {
      const { rerender } = render(<SkillBadge skill={mockSkill} size="sm" />);
      expect(screen.getByText('React')).toBeInTheDocument();

      rerender(<SkillBadge skill={mockSkill} size="lg" />);
      expect(screen.getByText('React')).toBeInTheDocument();
    });

    it('renders with minimal skill data', () => {
      const minimalSkill = { name: 'JavaScript' };
      render(<SkillBadge skill={minimalSkill} />);
      expect(screen.getByText('JavaScript')).toBeInTheDocument();
    });

    it('handles missing skill prop gracefully', () => {
      // This test checks that the component doesn't crash with undefined skill
      const { container } = render(<SkillBadge skill={undefined} />);
      expect(container).toBeInTheDocument();
    });
  });
});
