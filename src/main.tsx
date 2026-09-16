import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { ProgressProvider } from './state/ProgressContext';
import './styles/global.css';
import './styles/map.css';
import './styles/level.css';
import './styles/questions.css';

const container = document.getElementById('root');
if (!container) throw new Error('#root is missing from index.html');

createRoot(container).render(
  <StrictMode>
    <ProgressProvider>
      <App />
    </ProgressProvider>
  </StrictMode>,
);
