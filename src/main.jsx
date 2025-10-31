import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App.jsx';
import Inclusao from './Inclusao.jsx';
import Pesquisa from './Pesquisa.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/inclusao" element={<Inclusao />} />
        <Route path="/pesquisa" element={<Pesquisa />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
