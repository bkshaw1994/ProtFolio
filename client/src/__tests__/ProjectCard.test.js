import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard/ProjectCard';

describe('ProjectCard Component', () => {
  const mockProject = {
    _id: '12345',
    title: 'Test Portfolio',
    category: 'full-stack',
    shortDescription: 'A modern web application portfolio.',
    description: 'Detailed description of the portfolio project.',
    status: 'completed',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind'],
    githubUrl: 'https://github.com/user/project',
    liveUrl: 'https://example.com',
    startDate: '2023-01-01',
    client: 'Acme Corp'
  };

  const renderComponent = (project) => {
    return render(
      <MemoryRouter>
        <ProjectCard project={project} />
      </MemoryRouter>
    );
  };

  it('renders project title, category, description and technologies', () => {
    renderComponent(mockProject);

    expect(screen.getByText('Test Portfolio')).toBeInTheDocument();
    expect(screen.getByText('full-stack')).toBeInTheDocument();
    expect(screen.getByText('A modern web application portfolio.')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('MongoDB')).toBeInTheDocument();
    expect(screen.getByText('+2 more')).toBeInTheDocument();
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();
  });

  it('renders iframe when liveUrl is present', () => {
    renderComponent(mockProject);
    const iframe = screen.getByTitle('Test Portfolio');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', 'https://example.com');
  });

  it('renders image when images array is present and liveUrl is missing', () => {
    const projectWithImage = {
      ...mockProject,
      liveUrl: null,
      images: ['https://example.com/image.jpg']
    };
    renderComponent(projectWithImage);

    const image = screen.getByAltText('Test Portfolio');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('renders fallback title initial when no liveUrl or images are provided', () => {
    const projectFallback = {
      ...mockProject,
      liveUrl: null,
      images: []
    };
    renderComponent(projectFallback);

    expect(screen.getByText('T')).toBeInTheDocument();
  });

  it('handles in-progress and default status badges correctly', () => {
    const projectInProgress = {
      ...mockProject,
      status: 'in-progress'
    };
    const { rerender } = renderComponent(projectInProgress);
    expect(screen.getByText('in-progress')).toHaveClass('bg-warning-100');

    const projectOtherStatus = {
      ...mockProject,
      status: 'planned'
    };
    rerender(
      <MemoryRouter>
        <ProjectCard project={projectOtherStatus} />
      </MemoryRouter>
    );
    expect(screen.getByText('planned')).toHaveClass('bg-secondary-100');
  });

  it('prevents event propagation when GitHub and Live Demo links are clicked', () => {
    renderComponent(mockProject);

    const githubLink = screen.getByTitle('View Code');
    const liveLink = screen.getByTitle('Live Demo');

    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
    const stopPropagationSpy = jest.spyOn(clickEvent, 'stopPropagation');

    fireEvent(githubLink, clickEvent);
    expect(stopPropagationSpy).toHaveBeenCalled();

    fireEvent(liveLink, clickEvent);
    expect(stopPropagationSpy).toHaveBeenCalled();
  });
});
