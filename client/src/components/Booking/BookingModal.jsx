import { useState } from "react";

import { X, Calendar, MapPin, Users, Wallet, FileText } from "lucide-react";

import { createBooking } from "../../services/bookingService";

function BookingModal({ open, onClose, vendor }) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    eventType: "",
    eventDate: "",
    city: "",
    venue: "",
    guestCount: "",
    budget: "",
    requirements: "",
  });

  if (!open) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createBooking({
        vendorId: vendor._id,
        ...formData,
      });

      alert("Booking request sent successfully!");

      onClose();

      setFormData({
        eventType: "",
        eventDate: "",
        city: "",
        venue: "",
        guestCount: "",
        budget: "",
        requirements: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="
        fixed
        inset-0
        bg-black/60
        backdrop-blur-md
        z-[100]
        flex
        items-center
        justify-center
        p-6
      "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          bg-white
          rounded-3xl
          shadow-2xl
          w-full
          max-w-3xl
          max-h-[90vh]
          overflow-y-auto
        "
      >
        {/* Header */}

        <div
          className="
            flex
            items-center
            justify-between
            px-8
            py-6
            border-b
          "
        >
          <div>
            <h2 className="text-3xl font-bold">Book {vendor.businessName}</h2>

            <p className="text-slate-500 mt-2">Fill in your event details.</p>
          </div>

          <button
            onClick={onClose}
            className="
              p-2
              rounded-full
              hover:bg-slate-100
            "
          >
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div
            className="
        grid
        md:grid-cols-2
        gap-6
        "
          >
            {/* Event Type */}
            <div>
              <label className="font-medium">Event Type</label>

              <select
                name="eventType"
                required
                value={formData.eventType}
                onChange={handleChange}
                className="
        w-full
        mt-2
        border
        rounded-xl
        p-3
        "
              >
                <option value="">Select Event</option>

                <option>Wedding</option>

                <option>Birthday</option>

                <option>Corporate</option>

                <option>Engagement</option>

                <option>Reception</option>

                <option>Other</option>
              </select>
            </div>

            {/* Event Date */}
            <div>
              <label className="font-medium">Event Date</label>

              <input
                type="date"
                name="eventDate"
                required
                value={formData.eventDate}
                onChange={handleChange}
                className="
        w-full
        mt-2
        border
        rounded-xl
        p-3
        "
              />
            </div>

            {/* City */}
            <div>
              <label className="font-medium">City</label>

              <input
                type="text"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                placeholder="Raipur"
                className="
        w-full
        mt-2
        border
        rounded-xl
        p-3
        "
              />
            </div>

            {/* Venue */}
            <div>
              <label className="font-medium">Venue</label>

              <input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                placeholder="Venue Name"
                className="
        w-full
        mt-2
        border
        rounded-xl
        p-3
        "
              />
            </div>

            {/* Guest Count */}
            <div>
              <label className="font-medium">Guest Count</label>

              <input
                type="number"
                name="guestCount"
                min="1"
                required
                value={formData.guestCount}
                onChange={handleChange}
                placeholder="250"
                className="
            w-full
            mt-2
            border
            rounded-xl
            p-3
            outline-none
            focus:border-emerald-500
            "
              />
            </div>

            {/* Budget */}
            <div>
              <label className="font-medium">Budget (₹)</label>

              <input
                type="number"
                name="budget"
                min="0"
                value={formData.budget}
                onChange={handleChange}
                placeholder="50000"
                className="
            w-full
            mt-2
            border
            rounded-xl
            p-3
            outline-none
            focus:border-emerald-500
            "
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="font-medium">Special Requirements</label>

            <textarea
              rows={5}
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              placeholder="Tell the vendor about your event..."
              className="
            w-full
            mt-2
            border
            rounded-xl
            p-4
            resize-none
            outline-none
            focus:border-emerald-500
            "
            />
          </div>

          <div
            className="
    mt-8
    bg-slate-50
    rounded-2xl
    p-5
    border
  "
          >
            <div className="flex items-center gap-4">
              <img
                src={vendor.profileImage}
                alt={vendor.businessName}
                className="
        w-16
        h-16
        rounded-2xl
        object-cover
      "
              />

              <div>
                <h3 className="font-semibold text-lg">{vendor.businessName}</h3>

                <p className="text-slate-500">{vendor.category}</p>

                <p className="text-emerald-600 font-medium">
                  Starting from ₹{vendor.startingPrice.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div
            className="
    flex
    justify-end
    gap-4
    mt-8
  "
          >
            <button
              type="button"
              onClick={onClose}
              className="
      px-6
      py-3
      rounded-xl
      border
      border-slate-300
      hover:bg-slate-100
      transition
    "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
      px-7
      py-3
      rounded-xl
      bg-emerald-600
      text-white
      hover:bg-emerald-700
      disabled:opacity-60
      transition
    "
            >
              {loading ? "Sending..." : "Send Booking Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookingModal;
