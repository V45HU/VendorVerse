import EmptyState from "../EmptyState";
import ReviewItem from "./ReviewItem";

function RecentReviews({ reviews }) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Recent Reviews</h2>

      {reviews.length === 0 ? (
        <EmptyState
          title="No Reviews Yet"
          description="Customer reviews will appear here."
        />
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewItem key={review._id} review={review} />
          ))}
        </div>
      )}
    </section>
  );
}

export default RecentReviews;
