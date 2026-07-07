import { useEffect, useState } from "react";
import { Star, MessageSquareQuote } from "lucide-react";

import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import EmptyState from "../../components/Dashboard/EmptyState";
import LoadingState from "../../components/Dashboard/LoadingState";

import { customerMenu } from "../../components/Dashboard/dashboardMenus";
import API from "../../api/axios";

function CustomerReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setLoading(true);
        const response = await API.get("/dashboard/customer");
        setReviews(response.data.recentReviews || []);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  if (loading) return <LoadingState />;

  if (error) {
    return (
      <DashboardLayout menuItems={customerMenu}>
        <div className="text-red-500 text-xl">{error}</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout menuItems={customerMenu}>
      <DashboardHeader
        title="My Reviews"
        description="Look back at the vendor feedback you’ve shared."
      />

      {reviews.length === 0 ? (
        <EmptyState
          title="No reviews yet"
          description="Leave reviews after your bookings to build trust."
        />
      ) : (
        <div className="grid gap-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-lg">
                    {review.vendorId?.businessName || "Vendor"}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    {review.comment}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <Star key={index} size={16} fill="currentColor" />
                  ))}
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                <MessageSquareQuote size={15} />
                <span>{review.title || "Review submitted"}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

export default CustomerReviews;
