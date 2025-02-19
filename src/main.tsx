import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import { CountryRankingPage } from './pages/country-ranking-page'
import { CountryDetailsPage } from './pages/country-details-page'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main className="relative w-full h-screen bg-zinc-800">
      <div className="w-full h-full p-16 z-10">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<CountryRankingPage/>}></Route>
            <Route path="/country/:countryName" element={<CountryDetailsPage/>}></Route>
          </Routes>
        </BrowserRouter>
      </div>

    </main>

  </StrictMode>,
)
