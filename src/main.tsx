import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HashRouter, Route, Routes } from 'react-router'
import { CountryRankingPage } from './pages/country-ranking-page'
import { CountryDetailsPage } from './pages/country-details-page'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main className="relative w-full h-svh text-xs lg:text-base">
      <div className="w-full h-full flex flex-col justify-center items-center p-2 md:p-16">
        <HashRouter>
          <Routes>
            <Route path="/" element={<CountryRankingPage/>}></Route>
            <Route path="/country/:countryName" element={<CountryDetailsPage/>}></Route>
          </Routes>
        </HashRouter>
      </div>

    </main>

  </StrictMode>,
)
