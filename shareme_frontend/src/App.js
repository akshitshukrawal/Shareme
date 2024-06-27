//import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './container/Home';
import { gapi } from 'gapi-script';
const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
}

gapi.load("client:auth2", () => {
  gapi.client.init({
    clientId:
      "*****.apps.googleusercontent.com",
    plugin_name: "chat",
  });
});

export default App;
