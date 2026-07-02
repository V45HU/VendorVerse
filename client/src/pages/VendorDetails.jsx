import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getVendorById,
  getVendorPortfolio,
} from "../services/vendorServices.js";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import VendorBreadcrumb from "../components/Vendor/VendorBreadcrumb";
import VendorCover from "../components/Vendor/VendorCover";
import VendorInfoCard from "../components/Vendor/VendorInfoCard";
import VendorAbout from "../components/Vendor/VendorAbout";
import VendorPortfolio from "../components/Vendor/VendorPortfolio";
import VendorServices from "../components/Vendor/VendorServices";
import BookingSidebar from "../components/Vendor/BookingSidebar";
import BookingModal from "../components/Booking/BookingModal";

import Reviews from "../components/Vendor/Reviews.jsx";
import { getVendorReviews, createReview } from "../services/reviewServices.js";

function VendorDetails() {
  const { id } = useParams();

  const [vendor, setVendor] = useState(null);

  const [portfolio, setPortfolio] = useState([]);

  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true);

  const [bookingOpen, setBookingOpen] = useState(false);

  const loadReviews = async () => {
    try {
      const reviewData = await getVendorReviews(id);
      setReviews(reviewData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateReview = async (reviewData) => {
    try {
      await createReview({
        vendorId: id,
        ...reviewData,
      });

      alert("Review submitted successfully.");

      // Refresh reviews
      await loadReviews();

      // Refresh vendor
      const updatedVendor = await getVendorById(id);

      setVendor(updatedVendor);
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Failed to submit review.");
    }
  };

  // useEffect
  useEffect(() => {
    const loadVendor = async () => {
      try {
        const vendorData = await getVendorById(id);

        const portfolioData = await getVendorPortfolio(id);

        setVendor(vendorData);

        setPortfolio(portfolioData);

        await loadReviews();
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadVendor();
  }, [id]);

  // Loading State; before rendering
  if (loading || !vendor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Vendor...
      </div>
    );
  }

  console.log("Vendor:", vendor);

  console.log("Portfolio:", portfolio);

  console.log("Reviews:", reviews);

  return (
    <>
      <Navbar />

      <VendorBreadcrumb />

      <VendorCover />

      <VendorInfoCard vendor={vendor} />

      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <VendorAbout vendor={vendor} />

            <VendorPortfolio portfolio={portfolio} />

            <VendorServices vendor={vendor} />

            <Reviews reviews={reviews} onCreateReview={handleCreateReview} />
          </div>

          <BookingSidebar vendor={vendor} onBook={() => setBookingOpen(true)} />
        </div>
      </section>

      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        vendor={vendor}
      />

      <Footer />
    </>
  );
}

export default VendorDetails;
