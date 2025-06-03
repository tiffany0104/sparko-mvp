import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import MessagesPage from './MessagesPage';
import ChatRoomPage from './ChatRoomPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/messages" element={<MessagesPage />} />
      <Route path="/chat/:id" element={<ChatRoomPage />} />
    </Routes>
  </BrowserRouter>
);