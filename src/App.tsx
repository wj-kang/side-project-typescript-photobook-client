import React from 'react';
import GlobalStyle from './styles/globalStyles';
import MainPage from './pages/MainPage';
import Layout from './pages/Layout';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <GlobalStyle />
      <Layout navbar={<Navbar />}>
        <MainPage />
      </Layout>
    </>
  );
}

export default App;
