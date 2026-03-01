import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'flowbite/dist/flowbite.css';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ContextShare from './ContextShareAPI/ContextShare.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId="944768595186-bk96101hee8ct26vd4s51058oe33u730.apps.googleusercontent.com">
        <ContextShare>
          <App />
        </ContextShare>
      </GoogleOAuthProvider>
    </BrowserRouter>

  </StrictMode>,
)
