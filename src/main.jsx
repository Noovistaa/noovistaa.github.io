import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/theme.css'
import './styles/global.css'
import './components/effects/effects.css'
import './components/layout/layout.css'
import './components/sections/sections.css'
import './pages/pages.css'

// On GitHub Pages the site lives under /<repo-name>/, so the router needs that prefix.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>
)
