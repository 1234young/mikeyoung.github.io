import Navbar from './components/NavBar/Navbar.jsx';
import Hero from './components/Hero/Hero.jsx';
import Stats from './components/Stats/Stats.jsx';
import Program from './components/Programs/Program.jsx';
import Main from './components/Main/Main.jsx';
import WelcomeMarquee from './components/Welcome/WelcomeMarquee.jsx';
import AppPreview from './components/AppPreview/AppPreview.jsx';
import Action from './components/CTA/Action.jsx';
import Footer from './components/Footer/Footer.jsx';
import Pricing from './pages/Pricing/Pricing.jsx';
import Trainers from './pages/Trainers/Trainers.jsx';
import Contact from './pages/Contact/Contact.jsx';
import StrengthTraining from './pages/Training/StrengthTraining.jsx';
import { Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <>
      <Navbar />
      <WelcomeMarquee />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/programs" element={<Program />} />
        <Route path="/training" element={<Program />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/training/strength" element={<StrengthTraining />} />
       
      </Routes>

      <Stats />
      <Program />
      <Main />
      <AppPreview />
      <Action />
      <Footer />
    </>
  );
}
