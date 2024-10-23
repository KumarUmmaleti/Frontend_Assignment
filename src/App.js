import React, { useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import DashBoard from './components/DashBoard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllData } from './Actions/DataAction'; // Ensure this is correctly defined
import Loader from './components/Loader';

const App = () => {
  const dispatch = useDispatch();
  const ticketsData = useSelector(state => state.DataReducer.allTickets);
  const loading = useSelector(state => state.DataReducer.loading); // Check loading state

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchAllData());
  }, [dispatch]);

  return (
    <div style={{ paddingTop: '10px' }}>
      {loading ? ( // Use loading state here
        <Loader />
      ) : (
        <>
          <NavBar />
          <hr style={{ marginTop: '10px' }} />
          <DashBoard />
        </>
      )}
    </div>
  );
};

export default App;
