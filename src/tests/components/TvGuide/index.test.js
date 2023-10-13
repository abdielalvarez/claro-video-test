import React, { useReducer } from 'react';
import { render, screen, fireEvent, renderHook } from '@testing-library/react';
import ChannelsList from '../../../components/TvGuide/ChannelsList'; // Asegúrate de importar el componente correcto
import { AppContext } from '../../../context/AppContext';
import AppReducer from '../../../context/AppReducer';
import { initialStateMock } from '../../../utils/mocks';
import '@testing-library/jest-dom/extend-expect';

describe('ChannelsList', () => {
    it('renders channels correctly', () => {
        
        const { result } = renderHook(() => useReducer(AppReducer, initialStateMock));
        const [ state, dispatch ] = result.current

        render(
            <AppContext.Provider value={{ state, dispatch }}>
                <ChannelsList modifiedChannels={state.data.response.channels} />
            </AppContext.Provider>
        );

        const backButton = screen.getByTestId('back-button');
        const forwardButton = screen.getByTestId('forward-button');
        fireEvent.click(backButton);
        fireEvent.click(forwardButton);
    });
});
