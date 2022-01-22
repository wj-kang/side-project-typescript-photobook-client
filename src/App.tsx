import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/globalStyles';
import MainPageLayout from './pages/MainPageLayout';
import LandingPage from './pages/LandingPage';
import Upload from './features/upload/Upload';
import Album from './features/album/Album';
import AlbumList from './features/albumList/AlbumList';
import AccountPage from './pages/AccountPage';
import SharedPage from './pages/SharedPage';

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/shared/:albumTag" element={<SharedPage />} />
        <Route path="main" element={<MainPageLayout />}>
          <Route path="" element={<AlbumList />} />
          <Route path=":albumTag" element={<Album />} />
          <Route path=":albumTag/upload" element={<Upload />} />
          <Route path="account" element={<AccountPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
