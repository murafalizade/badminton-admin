import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './components/pages/Login/Login';
import 'bootstrap/dist/css/bootstrap.css';
import { DashboardNews } from './components/pages/dashboardNews/DashboardNews';
import { NewsCreate } from './components/pages/dashboardNews/create/NewsCreate';
import { NewsEdit } from './components/pages/dashboardNews/edit/NewsEdit';
import { DashboardAchieves } from './components/pages/dashboardAchieves/DashboardAchieves';
import { AchieveCreate } from './components/pages/dashboardAchieves/create/AchieveCreate';
import { AchieveEdit } from './components/pages/dashboardAchieves/edit/AchieveEdit';
import { DashboardGaleries } from './components/pages/dashboardGaleries/DashboardGaleries';
import { GaleryCreate } from './components/pages/dashboardGaleries/create/GaleryCreate';
import { GaleryEdit } from './components/pages/dashboardGaleries/edit/GaleryEdit';


function App() {
  return (
      <Router>
        <Routes>
          <Route path='/'  element={<Login/>} />
          <Route path='/dashboard/news'  element={<DashboardNews/>} />
          <Route path='/dashboard/news-add'  element={<NewsCreate/>} />
          <Route path='/dashboard/news-edit/:id'  element={<NewsEdit/>} />
          <Route path='/dashboard/achievements'  element={<DashboardAchieves/>} />
          <Route path='/dashboard/achievement-add'  element={<AchieveCreate/>} />
          <Route path='/dashboard/achievement-edit/:id'  element={<AchieveEdit/>} />
          <Route path='/dashboard/galeries'  element={<DashboardGaleries/>} />
          <Route path='/dashboard/galeries-add'  element={<GaleryCreate/>} />
          <Route path='/dashboard/galeries-edit/:id'  element={<GaleryEdit/>} />
        </Routes>
      </Router>
  );
}

export default App;
