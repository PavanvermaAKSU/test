
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
import NotFound from "./pages/404/notfound";
import Fleet from "./components/Fleets/fleets";



function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <Fleet/>
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
      <Route path="/" element={
        <>
          <HomeSEO/> 
          <HomePage/> 
        </>}
      />
      
      <Route path="/about" element={<CompanyOverview />} />
      <Route path= "/services" element={<Services/>}/>
      <Route path="/journey" element={<Journey/>}/>
      <Route path="/mining-transportation/overburden-removal" element={<MiningEarthwork/>} />
      <Route path="/mining-transportation/coal-supply-&-Trading" element={<CoalSupply/>} />
      <Route path="/mining-transportation/diesel-and-fuel-supply" element={<DieselSupply/>} />
      <Route path="/career" element={<Career/>}/>
      <Route path="/automotive/autoparts-&-lubricants" element={<AutoParts/>}/>
      <Route path="/contact" element={<Contact/>}/>

      <Route path="/admin" element={<AdminLogin />} />

      <Route
        path="/admin/dashboard"
        element={<AdminDashboard />}
      />
      <Route path="/location" element={<Serve/>}/>

      <Route
        path="*"
        element={<NotFound/>}
      />
    </Routes>
   </>
  );
}

export default App;
