import Navbar from "../components/Navbar";
import VendorSearch from "../components/VendorSearch";
import VendorGrid from "../components/VendorGrid";
import Footer from "../components/Footer";

function Vendors() {
  return (
    <>
      <Navbar />

      <VendorSearch />

      <VendorGrid />

      <Footer />
    </>
  );
}

export default Vendors;