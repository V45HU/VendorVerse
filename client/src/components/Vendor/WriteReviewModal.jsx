import { useState } from "react";
import { X, Star } from "lucide-react";

function WriteReviewModal({ isOpen, onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await onSubmit({
        title,
        comment,
        rating,
      });

      setTitle("");
      setComment("");
      setRating(5);

      onClose();
    } catch (error) {
      console.error(error);
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
        z-[100]
        bg-black/60
        backdrop-blur-sm
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
          max-w-xl
          p-8
        "
      >
        {/* Header */}

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Write a Review</h2>

          <button
            onClick={onClose}
            className="hover:bg-slate-100 rounded-full p-2"
          >
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}

          <div>
            <label className="font-medium">Rating</label>

            <div className="flex gap-2 mt-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                >
                  <Star
                    size={30}
                    fill={star <= rating ? "#FACC15" : "none"}
                    className={
                      star <= rating ? "text-yellow-400" : "text-slate-300"
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Title */}

          <div>
            <label className="font-medium">Review Title</label>

            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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

          {/* Comment */}

          <div>
            <label className="font-medium">Review</label>

            <textarea
              rows={5}
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="
                w-full
                mt-2
                border
                rounded-xl
                p-3
                outline-none
                resize-none
                focus:border-emerald-500
              "
            />
          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="
                px-5
                py-3
                rounded-xl
                border
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
    px-6
    py-3
    rounded-xl
    bg-emerald-600
    text-white
    hover:bg-emerald-700
    disabled:opacity-50
    disabled:cursor-not-allowed
  "
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WriteReviewModal;
