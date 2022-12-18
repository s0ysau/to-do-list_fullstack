import { StrictMode } from "react";
import { createRoot } from "react-dom/client"
import 'src/styles.css';
import App from './components/pages/App/App';

import { BrowserRouter as Router } from 'react-router-dom';

const rootElement = document.getElementById('root')
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);


