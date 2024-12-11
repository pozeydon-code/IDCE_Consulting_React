import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Provider from './Provider';
import './css/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider />
  </StrictMode>,
);