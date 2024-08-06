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
import Setting from './Pages/Setting';
import EditInfo from './Pages/EditInfo';
import ResetPassword from './Pages/ResetPassword';
import DetailPage from './Pages/DetailPage';
import EditDetail from './Pages/EditDetail';
import PrivateRoute from './Pages/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<Login />} />
        <Route path="/find-id" element={<FindId />} />
        <Route path="/send-temp-password" element={<SendTempPassword />} />
        <Route path="/signup" element={<Signup />} />
        {/* Private Routes */}
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/inputpage" element={<PrivateRoute element={<InputPage />} />} />
        <Route path="/loadingpage" element={<PrivateRoute element={<LoadingPage />} />} />
        <Route path="/viewpage" element={<PrivateRoute element={<ViewPage />} />} />
        <Route path="/setting" element={<PrivateRoute element={<Setting />} />} />
        <Route path="/edit-info" element={<PrivateRoute element={<EditInfo />} />} />
        <Route path="/reset-password" element={<PrivateRoute element={<ResetPassword />} />} />
        <Route path="/detail" element={<PrivateRoute element={<DetailPage />} />} />
        <Route path="/editdetail" element={<PrivateRoute element={<EditDetail />} />} />
      </Routes>
    </Router>
  );
};

export default App;
