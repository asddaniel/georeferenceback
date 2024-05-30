import React from 'react'
import {createRoot} from 'react-dom/client'
import AppNav from './layouts/NavBar.tsx'
import Home from './pages/Home.tsx'
import { Carte } from './pages/Carte.tsx'
import './index.css'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Itineraire } from './pages/Itineraire.tsx'
import { MyItineraire } from './pages/MyItineraire.tsx'

const Application = ()=>{

  return <>
      <Router>
      <AppNav></AppNav>
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/carte" element={<Carte />} />
          <Route path="/itineraire" element={<Itineraire />} />
          <Route path="/myitineraire" element={<MyItineraire />} />
        </Routes>
      </Router>
  </>
}

if(document.getElementById("root")){

  const root = createRoot(document.getElementById("root") as HTMLElement)
  root.render(<Application/>)
}
