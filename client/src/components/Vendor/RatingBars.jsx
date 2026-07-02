import { Star } from "lucide-react";

function RatingBars({ reviews }) {
  const totalReviews = reviews.length;

  const averageRating = totalReviews
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
    : "0.0";

  const ratings = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.rating === star).length;

    return {
      star,

      count,

      width: totalReviews ? `${(count / totalReviews) * 100}%` : "0%",
    };
  });

  return (
    <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
      {/* Overall Rating */}

      <div className="text-center">
        <h1 className="text-6xl font-bold text-slate-900">{averageRating}</h1>

        <div className="flex justify-center gap-1 mt-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={22}
              fill={
                star <= Math.round(Number(averageRating)) ? "#FACC15" : "none"
              }
              className={
                star <= Math.round(Number(averageRating))
                  ? "text-yellow-400"
                  : "text-slate-300"
              }
            />
          ))}
        </div>

        <p className="text-slate-500 mt-2">
          Based on {totalReviews} {totalReviews === 1 ? "Review" : "Reviews"}
        </p>
      </div>

      {/* Divider */}

      <div className="border-t border-slate-200 my-8"></div>

      {/* Rating Distribution */}

      <div className="space-y-5">
        {ratings.map((rating) => (
          <div key={rating.star} className="flex items-center gap-3">
            <span className="w-5 text-sm font-medium text-slate-600">
              {rating.star}
            </span>

            <span className="text-yellow-400">★</span>

            {/* Progress */}

            <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-700"
                style={{
                  width: rating.width,
                }}
              />
            </div>

            <span className="w-8 text-right text-sm text-slate-500">
              {rating.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RatingBars;
