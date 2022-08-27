import './App.css';
import React from 'react';
import Frame from './hoc/frame/frame';
import Main from './components/main/Main';
import Login from './components/login/Login';
import {Route, Routes, Navigate} from 'react-router-dom';
import ProtectedRoute from './components/protected-route/ProtectedRoute';

const App: React.FC = () => {
  return (
    <Frame>
      <Routes>
        <Route path={'/'} element={<Login/>}/>
        <Route path={'/contact'} element={<ProtectedRoute><Main/></ProtectedRoute>}/>
        <Route path={'*'} element={<Navigate replace to={'/'}/>}/>
      </Routes>
    </Frame>
  );
};

export default App;

