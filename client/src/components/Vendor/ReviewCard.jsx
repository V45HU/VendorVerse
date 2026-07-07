import { CheckCircle2, MessageSquareQuote, Star, ThumbsUp } from "lucide-react";

function ReviewCard({ review }) {
  return (
    <div className="min-w-[360px] max-w-[360px] snap-start rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <img
            src={review.userId?.profileImage || "https://i.pravatar.cc/150"}
            alt={review.userId?.name || "User"}
            className="h-14 w-14 rounded-full object-cover"
          />

          <div>
            <h4 className="text-lg font-semibold text-slate-900">
              {review.userId?.name}
            </h4>

            <p className="text-sm text-slate-500">
              {new Date(review.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>

            {review.isVerifiedBooking && (
              <div className="mt-2 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600" />
                <span className="text-sm font-medium text-emerald-600">
                  Verified Booking
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-1">
          {[...Array(review.rating)].map((_, index) => (
            <Star
              key={index}
              size={18}
              fill="#facc15"
              className="text-yellow-400"
            />
          ))}
        </div>
      </div>

      <p className="mt-6 leading-8 text-slate-600">{review.comment}</p>

      <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
        <MessageSquareQuote size={16} />
        <span>Helpful and honest feedback</span>
      </div>
    </div>
  );
}

export default ReviewCard;
