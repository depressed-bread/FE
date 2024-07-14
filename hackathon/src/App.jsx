import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Start from './Pages/Start';
import Login from './Pages/Login';
import FindId from './Pages/FindId';
import SendTempPassword from './Pages/SendTempPassword';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import InputPage from './Pages/InputPage';
import LoadingPage from './Pages/LoadingPage';
import ViewPage from './Pages/ViewPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<Login />} />
        <Route path="/find-id" element={<FindId />} />
        <Route path="/send-temp-password" element={<SendTempPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/inputpage" element={<InputPage />} />
        <Route path="/loadingpage" element={<LoadingPage />} />
        <Route path="/viewpage" element={<ViewPage />} />
      </Routes>
    </Router>
  );
};

export default App;
