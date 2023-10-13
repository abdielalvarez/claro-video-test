import React from 'react';
import { render, screen } from '@testing-library/react';
import withMainLayout from '../../layouts/MainLayout';
import '@testing-library/jest-dom/extend-expect';

describe('withMainLayout', () => {
  it('should render the wrapped component correctly', () => {
    const WrappedComponent = () => <div>Wrapped Component</div>;
    const MainLayoutComponent = withMainLayout(WrappedComponent);
    render(<MainLayoutComponent />);
    const wrappedComponent = screen.getByText('Wrapped Component');
    expect(wrappedComponent).toBeInTheDocument();
  });

  it('should pass props to the wrapped component correctly', () => {
    const WrappedComponent = (props) => <div>{props.text}</div>;
    const text = 'Sample Text';
    const MainLayoutComponent = withMainLayout(WrappedComponent);
    render(<MainLayoutComponent text={text} />);
    const wrappedComponent = screen.getByText(text);
    expect(wrappedComponent).toBeInTheDocument();
  });
});
