import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Investments from './pages/Investments';
import LegalPage from './pages/LegalPage';
import { about, privacy, terms } from './content/pages';

function Layout({ children }) {
  useSmoothScroll();
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/investments" element={<Investments />} />
          <Route path="/about" element={<LegalPage {...about} />} />
          <Route path="/privacy-policy" element={<LegalPage {...privacy} />} />
          <Route path="/terms-and-conditions" element={<LegalPage {...terms} />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
