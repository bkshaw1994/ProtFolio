import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import Chatbot from '../components/Chatbot/Chatbot';

const createMockStore = () =>
  configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware)
  });

describe('Chatbot Component', () => {
  it('renders trigger button when closed', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <Chatbot />
      </Provider>
    );

    const triggerBtn = screen.getByTestId('chatbot-container');
    expect(triggerBtn).toBeInTheDocument();
    expect(screen.getByLabelText(/Open AI Assistant Chatbot/i)).toBeInTheDocument();
  });

  it('opens chat window on clicking trigger button', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <Chatbot />
      </Provider>
    );

    const triggerBtn = screen.getByLabelText(/Open AI Assistant Chatbot/i);
    fireEvent.click(triggerBtn);

    expect(screen.getByText(/Bishal's AI Assistant/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ask about skills, projects, contact info/i)).toBeInTheDocument();
  });

  it('allows user to type message into input field', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <Chatbot />
      </Provider>
    );

    fireEvent.click(screen.getByLabelText(/Open AI Assistant Chatbot/i));

    const input = screen.getByPlaceholderText(/Ask about skills, projects, contact info/i);
    fireEvent.change(input, { target: { value: 'What are Bishal\'s skills?' } });

    expect(input.value).toBe('What are Bishal\'s skills?');
  });
});
