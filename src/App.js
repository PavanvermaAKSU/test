
import { Routes, Route } from "react-router-dom";

import HomeSEO from "./HomeSEO";
import Navbar from "./components/Navbar/navbar";
import Hero from "./components/Hero/hero";
import About from "./components/About/about";
import Services from "./components/Service/service";
import Clients from "./components/Products/product";
import Vision from "./components/Visionmission/visionmission";
import Banner from "./components/Banner/banner";
import Contact from "./components/Contact/contact";
import VisitorTracker from "./pages/VisitorTracker/visitortracker";
import AdminLogin from "./pages/Admin/adminlogin";
import AdminDashboard from "./pages/Admin/admindashboard";
import Serve from "./components/Serve/serve";
import ScrollToTop from "./components/Navbar/ScrollToTop";
import Career from "./pages/Career/career";
import CompanyOverview from "./pages/companyoverview/overview";
import Journey from "./pages/Journey/journey";
import MiningEarthwork from "./pages/EarthworkMining/earthwork";
import CoalSupply from "./pages/CoalSupply/coalsupply";
import DieselSupply from "./pages/DieselSupply/dieselsupply";
import AutoParts from "./pages/Autoparts/autoparts";

function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <HomeSEO />
        <About />
        <Banner />
        <Vision />
        <Services />
        <Clients />
        <Serve/>
        <Contact />
      </main>
    </>
  );
}

function App() {
  return (
   <>
    <Navbar />

    <ScrollToTop/>
    <VisitorTracker/>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<CompanyOverview />} />
      <Route path= "/services" element={<Services/>}/>
      <Route path="/journey" element={<Journey/>}/>
      <Route path="/services/mining" element={<MiningEarthwork/>} />
      <Route path="/services/coal_supply_&_Trading" element={<CoalSupply/>} />
      <Route path="/services/diesel_and_fuel" element={<DieselSupply/>} />
      <Route path="/career" element={<Career/>}/>
      <Route path="/services/autopart" element={<AutoParts/>}/>
      <Route path="/contact" element={<Contact/>}/>

      <Route path="/admin" element={<AdminLogin />} />

      <Route
        path="/admin/dashboard"
        element={<AdminDashboard />}
      />

      <Route
        path="*"
        element={<h1>404 - Page Not Found</h1>}
      />
    </Routes>
   </>
  );
}

export default App;
