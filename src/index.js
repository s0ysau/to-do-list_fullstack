import './styles.css';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client"
import App from './components/pages/App/App';

import { BrowserRouter as Router } from 'react-router-dom';

const rootElement = document.getElementById('root')
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Router>
      <h1>My To Do List</h1>
      <App />
    </Router>
  </StrictMode>
);


