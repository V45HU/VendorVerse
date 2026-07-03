import { Star } from "lucide-react";

function ReviewItem({ review }) {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        border-slate-200
        p-5
      "
    >
      <div className="flex justify-between">
        <h3 className="font-semibold">{review.userId.name}</h3>

        <div className="flex items-center gap-1">
          <Star size={18} fill="#facc15" className="text-yellow-400" />

          {review.rating}
        </div>
      </div>

      {review.title && <h4 className="mt-3 font-medium">{review.title}</h4>}

      <p className="mt-3 text-slate-600">{review.comment}</p>
    </div>
  );
}

export default ReviewItem;
