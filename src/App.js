import React from 'react';
import { AppProvider } from './context/AppContext';
import Routes from './Routes';
import './assets/styles/app.scss';

function App() {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
}

export default App;
