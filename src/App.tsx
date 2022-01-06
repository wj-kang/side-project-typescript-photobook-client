import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import GlobalStyle from './styles/globalStyles';
import Layout from './pages/Layout';
import LandingPage from './pages/LandingPage';
import Upload from './features/upload/Upload';
import Album from './features/album/Album';
import AlbumList from './features/albumList/AlbumList';

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="main" element={<Layout />}>
          <Route path="albums" element={<AlbumList />} />
          <Route path="albums/:albumTag" element={<Album />} />
          <Route path="albums/:albumTag/upload" element={<Upload />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
