import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import { CountryRankingPage } from './pages/country-ranking-page'
import { CountryDetailsPage } from './pages/country-details-page'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main className="relative w-full h-svh text-xs lg:text-base">
      <div className="w-full h-full z-10 md:pt-52 md:px-16">
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
