import  { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';  // Make sure this line is present
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
