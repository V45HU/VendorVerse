import { X, ChevronLeft, ChevronRight } from "lucide-react";

import { useEffect } from "react";

function PortfolioLightbox({ portfolio, selectedImage, setSelectedImage }) {
  const isOpen = selectedImage !== null;

  const current = isOpen ? portfolio[selectedImage] : null;

  const previousImage = () => {
    setSelectedImage((prev) => (prev === 0 ? portfolio.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev === portfolio.length - 1 ? 0 : prev + 1));
  };

  /*
  ------------------------------------
  Lock Background Scroll
  ------------------------------------
  */

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /*
  ------------------------------------
  Keyboard Controls
  ------------------------------------
  */

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
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

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, portfolio.length]);

  if (!isOpen) return null;

  return (
    <div
      onClick={() => setSelectedImage(null)}
      className="
        fixed
        inset-0
        z-[100]
        bg-black/90
        backdrop-blur-md
        flex
        items-center
        justify-center
        p-6
      "
    >
      {/* Close */}

      <button
        onClick={(e) => {
          e.stopPropagation();
          setSelectedImage(null);
        }}
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
        onClick={(e) => {
          e.stopPropagation();
          previousImage();
        }}
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

      {/* Content */}

      <div onClick={(e) => e.stopPropagation()} className="max-w-5xl w-full">
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
                font-bold
                text-white
              "
            >
              {current.title}
            </h2>

            <p
              className="
                mt-2
                text-slate-300
              "
            >
              {current.description}
            </p>
          </div>

          <div
            className="
              text-lg
              font-semibold
              text-white
            "
          >
            {selectedImage + 1} / {portfolio.length}
          </div>
        </div>
      </div>

      {/* Next */}

      <button
        onClick={(e) => {
          e.stopPropagation();
          nextImage();
        }}
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
