import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

function ReviewCarousel({ children }) {
  const slider = useRef(null);

  const scrollLeft = () => {
    slider.current.scrollBy({
      left: -420,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    slider.current.scrollBy({
      left: 420,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      {/* Buttons */}

      <button
        onClick={scrollLeft}
        className="absolute -left-5 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-3 border hover:scale-105 transition"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={scrollRight}
        className="absolute -right-5 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-3 border hover:scale-105 transition"
      >
        <ChevronRight />
      </button>

      {/* Cards */}

      <div
        ref={slider}
        className="
          flex
          gap-6
          overflow-x-auto
          scroll-smooth
          snap-x
          snap-mandatory
          scrollbar-hide
          pb-2
        "
      >
        {children}
      </div>
    </div>
  );
}

export default ReviewCarousel;
