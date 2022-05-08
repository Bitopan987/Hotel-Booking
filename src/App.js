import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/common/Header';
import HotelList from './components/hotels';
import Hotel from './components/hotels/Hotel';
import Home from './components/Home';
import Login from './components/common/Login';
import NoMatch from './components/common/NoMatch';

import { UserProvider } from './context/UserContext';
import { LOCAL_STORAGE_KEY } from './utils/constants';
import { USER } from './utils/constants';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.setItem(LOCAL_STORAGE_KEY, null);
    navigate(`/`);
  };

  useEffect(() => {
    const email = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (email && email === USER.email) {
      setUser(USER);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <UserProvider
      value={{
        isLoggedIn: isLoggedIn,
        user: user,
        setUser: setUser,
        setIsLoggedIn: setIsLoggedIn,
      }}
    >
      <Header handleLogout={handleLogout} />
      {isLoggedIn ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </UserProvider>
  );
}

function AuthenticatedApp(props) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hotels" element={<HotelList />} />
      <Route path="/hotels/:id" element={<Hotel />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}

function UnAuthenticatedApp(props) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/hotels" element={<HotelList />} />
      <Route path="/hotels/:id" element={<Hotel />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}

export default App;
