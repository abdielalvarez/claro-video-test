import React, { Component, lazy, Suspense } from 'react';
import { fetchData } from '../services/api';
import { AppContext } from '../context/AppContext';
import CustomPopup from '../components/CustomPopup';
import withMainLayout from '../layouts/MainLayout';

const LazyEntryButton = lazy(() => import('../components/EntryButton'));

class Home extends Component {
  static contextType = AppContext;
  
  componentDidMount() {
    const { state } = this.context;
    const { data } = state;

    if (!data) {
      this.fetchDataAsync();
    }
  }

  fetchDataAsync = async () => {
    try {
      const { dispatch } = this.context;
      const endpoint = 'services/epg/channel';
      const queries =
        '?device_id=web&device_category=web&device_model=web&device_type=web&device_so=Chrome&format=json&device_manufacturer=generic&authpn=webclient&authpt=tfg1h3j4k6fd7&api_version=v5.93&region=guatemala&HKS=web61144bb49d549&user_id=54343080&date_from=20210812200256&date_to=20210813200256&quantity=200';
      const result = await fetchData(`${endpoint}${queries}`);
      dispatch({ type: 'SET_DATA', payload: result });
    } catch (err) {
      console.error(err);
    }
  };

  handlePopup = () => {
    const { state, dispatch } = this.context;
    const { isPopupOpen } = state;
    dispatch({ type: 'TOGGLE_POPUP', payload: !isPopupOpen });
  };

  render() {
    const { state } = this.context;
    const { isPopupOpen } = state;

    return (
      <div className="home-page">
        <CustomPopup
          isOpen={isPopupOpen}
          closeModal={this.handlePopup}
        />
        <Suspense
          fallback={<div>Wait until the app loads</div>}
        >
          <LazyEntryButton
            handlePopup={this.handlePopup}
          />
        </Suspense>
      </div>
    );
  }
}

const HomeWithMainLayout = withMainLayout(Home)

export default HomeWithMainLayout;
