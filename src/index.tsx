// import React from 'react';
// import ReactDOM from 'react-dom/client'; 
// import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );




import React from 'react';
import ReactDOM from 'react-dom/client';  // Use React 18's 'createRoot' import
import App from './App';
// import './styles.css';
import './index.css'

// Using `createRoot` for React 18
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



