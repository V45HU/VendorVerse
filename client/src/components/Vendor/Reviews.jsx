import { ChevronRight } from "lucide-react";
import RatingBars from "./RatingBars";
import ReviewCard from "./ReviewCard";
import ReviewCarousel from "./ReviewCarousel";

function Reviews() {
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

        <button className="flex items-center gap-2 text-emerald-600 font-semibold hover:gap-3 transition-all">

          View All

          <ChevronRight size={18} />

        </button>

      </div>

      {/* Rating Summary + Reviews */}

      <div className="grid lg:grid-cols-3 gap-8 mt-10">

        {/* Left */}

        <div>

          <RatingBars />

        </div>

        {/* Right */}

        <div className="lg:col-span-2">

            <ReviewCarousel>

    <ReviewCard
        name="Amit Verma"
        date="12 May 2025"
        rating={5}
        helpful={18}
        image="https://i.pravatar.cc/100?img=11"
        review="Amazing experience! The photographers were extremely professional, arrived on time, and captured every important moment beautifully. The final album exceeded our expectations."
    />

    <ReviewCard
        name="Priya Sharma"
        date="28 April 2025"
        rating={5}
        helpful={12}
        image="https://i.pravatar.cc/100?img=25"
        review="Very cooperative team. They suggested creative poses and made everyone comfortable. The candid shots were absolutely stunning."
    />

    <ReviewCard
        name="Rahul Singh"
        date="10 March 2025"
        rating={4}
        helpful={7}
        image="https://i.pravatar.cc/100?img=15"
        review="Photography quality was excellent. Album delivery took slightly longer than expected, but the final results were worth waiting for."
    />

            </ReviewCarousel>
</div>

      </div>

    </section>
  );
}

export default Reviews;