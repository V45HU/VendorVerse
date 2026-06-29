import {
  CheckCircle2,
  Star,
  ThumbsUp,
} from "lucide-react";

function ReviewCard({
  name,
  date,
  rating,
  review,
  helpful,
  image,
}) {
  return (
    <div
  className="
    min-w-[360px]
    max-w-[360px]
    snap-start
    bg-white
    border
    border-slate-200
    rounded-3xl
    p-6
    shadow-sm
    hover:shadow-lg
    hover:-translate-y-1
    transition-all
    duration-300
  "
>

      {/* Header */}

      <div className="flex justify-between items-start">

        <div className="flex gap-4">

          {/* Avatar */}

          <img
            src={image}
            alt={name}
            className="w-14 h-14 rounded-full object-cover"
          />

          <div>

            <h4 className="font-semibold text-lg text-slate-900">
              {name}
            </h4>

            <p className="text-sm text-slate-500">
              {date}
            </p>

            <div className="flex items-center gap-2 mt-2">

              <CheckCircle2
                size={16}
                className="text-emerald-600"
              />

              <span className="text-sm text-emerald-600 font-medium">
                Verified Booking
              </span>

            </div>

          </div>

        </div>

        {/* Rating */}

        <div className="flex gap-1">

          {[...Array(rating)].map((_, index) => (

            <Star
              key={index}
              size={18}
              fill="#facc15"
              className="text-yellow-400"
            />

          ))}

        </div>

      </div>

      {/* Review */}

      <p className="text-slate-600 leading-8 mt-6">

        {review}

      </p>

      {/* Footer */}

      <div className="flex items-center gap-2 mt-6">

        <ThumbsUp
          size={18}
          className="text-slate-500"
        />

        <span className="text-sm text-slate-500">

          Helpful ({helpful})

        </span>

      </div>

    </div>
  );
}

export default ReviewCard;