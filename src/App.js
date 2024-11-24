import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShopPage from './ShopPage';  // หน้าร้านค้า
import AdminPage from './AdminPage';  // หน้า Admin

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShopPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;