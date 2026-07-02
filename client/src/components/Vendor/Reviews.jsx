import { ChevronRight } from "lucide-react";
import RatingBars from "./RatingBars";
import ReviewCard from "./ReviewCard";
import ReviewCarousel from "./ReviewCarousel";
import { useState } from "react";
import WriteReviewModal from "./WriteReviewModal.jsx";

function Reviews({ reviews, onCreateReview }) {
  const [showReviewModal, setShowReviewModal] = useState(false);
  return (
    <section className="bg-white rounded-3xl shadow-md border border-slate-100 p-8 mt-8">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            Reviews & Ratings
          </h2>

          <p className="text-slate-500 mt-2">
            Genuine reviews from verified customers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowReviewModal(true)}
            className="
      bg-emerald-600
      text-white
      px-5
      py-3
      rounded-xl
      hover:bg-emerald-700
      transition
    "
          >
            Write Review
          </button>

          <button
            className="
      flex
      items-center
      gap-2
      text-emerald-600
      font-semibold
      hover:gap-3
      transition-all
    "
          >
            View All
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Rating Summary + Reviews */}

      <div className="grid lg:grid-cols-3 gap-8 mt-10">
        {/* Left */}

        <div>
          <RatingBars reviews={reviews} />
        </div>

        {/* Right */}

        <div className="lg:col-span-2">
          <ReviewCarousel>
            {reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </ReviewCarousel>
        </div>
      </div>
      <WriteReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        onSubmit={async (reviewData) => {
          await onCreateReview(reviewData);

          setShowReviewModal(false);
        }}
      />
    </section>
  );
}

export default Reviews;
