import { useState } from "react";

import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";

import { vendorMenu } from "../../components/Dashboard/dashboardMenus";

import LoadingState from "../../components/Dashboard/LoadingState";
import EmptyState from "../../components/Dashboard/EmptyState";

import BookingFilters from "../../components/Dashboard/Bookings/BookingFilters";
import BookingTable from "../../components/Dashboard/Bookings/BookingTable";
import BookingDetailsModal from "../../components/Dashboard/Bookings/BookingDetailsModal";

import useVendorBookings from "../../hooks/useVendorBookings";

import {
  updateBookingStatus,
  sendQuotation,
} from "../../services/bookingDashboardService";

import QuotationModal from "../../components/Dashboard/Bookings/QuotationModal";

function VendorBookings() {
  const [status, setStatus] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showQuotation, setShowQuotation] = useState(false);

  const { bookings, loading, error, refreshBookings } =
    useVendorBookings(status);

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setShowQuotation(false);
  };

  const handleOpenQuotation = () => {
    setShowQuotation(true);
  };

  const handleCloseDetails = () => {
    setSelectedBooking(null);
    setShowQuotation(false);
  };

  const handleCloseQuotation = () => {
    setShowQuotation(false);
    setSelectedBooking(null);
  };

  const handleStatus = async (status) => {
    await updateBookingStatus(selectedBooking._id, status);
    refreshBookings();
    handleCloseDetails();
  };

  const handleQuotation = async (quotation, vendorNotes) => {
    await sendQuotation(selectedBooking._id, quotation, vendorNotes);
    refreshBookings();
    handleCloseQuotation();
  };

  if (loading) return <LoadingState />;

  if (error)
    return (
      <DashboardLayout menuItems={vendorMenu}>
        <div className="text-red-500">{error}</div>
      </DashboardLayout>
    );

  return (
    <DashboardLayout menuItems={vendorMenu}>
      <DashboardHeader
        title="Booking Requests"
        description="Manage all incoming booking requests."
      />

      <BookingFilters status={status} setStatus={setStatus} />

      {bookings.length === 0 ? (
        <EmptyState
          title="No Bookings"
          description="Bookings will appear here."
        />
      ) : (
        <BookingTable bookings={bookings} onView={handleViewBooking} />
      )}

      {selectedBooking && !showQuotation && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={handleCloseDetails}
          onStatus={handleStatus}
          onQuotation={handleOpenQuotation}
        />
      )}

      {selectedBooking && showQuotation && (
        <QuotationModal
          booking={selectedBooking}
          onClose={handleCloseQuotation}
          onSubmit={handleQuotation}
        />
      )}
    </DashboardLayout>
  );
}

export default VendorBookings;
