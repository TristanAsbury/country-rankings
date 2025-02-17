import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import { CountryRankingPage } from './pages/country-ranking-page'
import { CountryDetailsPage } from './pages/country-details-page'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CountryRankingPage/>}></Route>
        <Route path="/:id" element={<CountryDetailsPage/>}></Route>
      </Routes>
    
    </BrowserRouter>
  </StrictMode>,
)
