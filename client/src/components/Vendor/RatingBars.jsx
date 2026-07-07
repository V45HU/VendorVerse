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
    <div className="rounded-3xl border border-slate-100 bg-slate-50 p-8">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-slate-900">{averageRating}</h1>

        <div className="mt-3 flex justify-center gap-1">
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

        <p className="mt-2 text-slate-500">
          Based on {totalReviews} {totalReviews === 1 ? "Review" : "Reviews"}
        </p>
      </div>

      <div className="my-8 border-t border-slate-200" />

      <div className="space-y-5">
        {ratings.map((rating) => (
          <div key={rating.star} className="flex items-center gap-3">
            <span className="w-5 text-sm font-medium text-slate-600">
              {rating.star}
            </span>

            <span className="text-yellow-400">★</span>

            <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-700"
                style={{ width: rating.width }}
              />
            </div>

            <span className="w-8 text-right text-sm text-slate-500">
              {rating.count}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl bg-white p-4 text-sm text-slate-600">
        Customers consistently praise this vendor for professionalism and
        communication.
      </div>
    </div>
  );
}

export default RatingBars;
