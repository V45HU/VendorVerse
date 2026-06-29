import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import VendorBreadcrumb from "../components/Vendor/VendorBreadcrumb";
import VendorCover from "../components/Vendor/VendorCover";
import VendorInfoCard from "../components/Vendor/VendorInfoCard";
import VendorAbout from "../components/Vendor/VendorAbout";
import VendorPortfolio from "../components/Vendor/VendorPortfolio";
import VendorServices from "../components/Vendor/VendorServices";
import BookingSidebar from "../components/Vendor/BookingSidebar";

import Reviews from "../components/Vendor/Reviews";

function VendorDetails() {
  return (
    <>
      <Navbar />

        <VendorBreadcrumb />

        <VendorCover />

        <VendorInfoCard />

      <section className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid lg:grid-cols-3 gap-10">

          <div className="lg:col-span-2">

            <VendorAbout />

            <VendorPortfolio />

            <VendorServices />

            <Reviews />

          </div>

          <BookingSidebar />

        </div>

      </section>

      <Footer />
    </>
  );
}

export default VendorDetails;