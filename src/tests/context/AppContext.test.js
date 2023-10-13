import React from 'react';
import { render } from '@testing-library/react';
import { AppProvider } from '../../context/AppContext';
import '@testing-library/jest-dom/extend-expect';

describe('AppProvider', () => {
  it('renders children without crashing', () => {
    const { getByText } = render(
      <AppProvider>
        <div>Child Component</div>
      </AppProvider>
    );

    const childComponent = getByText('Child Component');
    expect(childComponent).toBeInTheDocument();
  });
});
