import { X, ChevronLeft, ChevronRight } from "lucide-react";

import { useEffect } from "react";

function PortfolioLightbox({ portfolio, selectedImage, setSelectedImage }) {
  if (selectedImage === null) return null;
  const current = portfolio[selectedImage];

  const previousImage = () => {
    setSelectedImage((prev) => (prev === 0 ? portfolio.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev === portfolio.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedImage]);

  //   When lightbox opens, background can't scroll, scrolling restored when lightbox closes

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (selectedImage === null) return;

      switch (event.key) {
        case "Escape":
          setSelectedImage(null);
          break;

        case "ArrowLeft":
          previousImage();
          break;

        case "ArrowRight":
          nextImage();
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);
  // Keyboard Shortcuts

  return (
    <div
      // If someone clicks the dark background, close the lightbox.
      onClick={() => setSelectedImage(null)}
      className="
      fixed
      inset-0
      bg-black/90
      backdrop-blur-md
      z-[100]
      flex
      items-center
      justify-center
      p-6
    "
    >
      {/* Close */}

      <button
        onClick={() => setSelectedImage(null)}
        className="
        absolute
        top-6
        right-6
        bg-white/10
        hover:bg-white/20
        rounded-full
        p-3
        transition
      "
      >
        <X className="text-white" />
      </button>

      {/* Previous */}

      <button
        onClick={previousImage}
        className="
        absolute
        left-6
        bg-white/10
        hover:bg-white/20
        rounded-full
        p-4
        transition
      "
      >
        <ChevronLeft className="text-white" />
      </button>

      {/* Image */}

      <div
        onClick={(e) => e.stopPropagation()}
        className="
        max-w-5xl
        w-full
      "
      >
        <img
          src={current.image}
          alt={current.title}
          className="
          w-full
          max-h-[80vh]
          object-contain
          rounded-3xl
        "
        />

        <div
          className="
          mt-6
          flex
          justify-between
          items-center
        "
        >
          <div>
            <h2
              className="
              text-3xl
              text-white
              font-bold
            "
            >
              {current.title}
            </h2>

            <p
              className="
              text-slate-300
              mt-2
            "
            >
              {current.description}
            </p>
          </div>

          <div
            className="
            text-white
            text-lg
            font-semibold
          "
          >
            {selectedImage + 1}
            {" / "}
            {portfolio.length}
          </div>
        </div>
      </div>

      {/* Next */}

      <button
        onClick={nextImage}
        className="
        absolute
        right-6
        bg-white/10
        hover:bg-white/20
        rounded-full
        p-4
        transition
      "
      >
        <ChevronRight className="text-white" />
      </button>
    </div>
  );
}

export default PortfolioLightbox;
