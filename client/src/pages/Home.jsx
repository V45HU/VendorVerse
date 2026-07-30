import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FeaturedVendors from "../components/FeaturedVendors";
import Stats from "../components/Stats";
import HowItWorks from "../components/HowItWorks";
import WhyChooseUs from "../components/WhyChooseUs";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FeaturedVendors />
      <Stats />
      <Categories />
      <HowItWorks />
      <WhyChooseUs />
      <CTA />
      <Footer />
    </main>
  );
}

export default Home;
