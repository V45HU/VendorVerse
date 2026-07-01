import { Camera, Images } from "lucide-react";
import { useState } from "react";
import PortfolioLightbox from "./PortfolioLightbox";
import PortfolioImage from "./PortfolioImage";

function VendorPortfolio({ portfolio }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const hasPortfolio = portfolio.length > 0;

  return (
    <section className="bg-white rounded-3xl shadow-md border border-slate-100 p-8 mt-8">
      {/* Header */}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Portfolio</h2>

          <p className="text-slate-500 mt-2">
            {portfolio.length} Project
            {portfolio.length !== 1 && "s"}
          </p>
        </div>

        {hasPortfolio && (
          <button
            className="
            text-emerald-600
            font-semibold
            hover:text-emerald-700
            transition
          "
          >
            View All
          </button>
        )}
      </div>

      {/* Empty State */}

      {!hasPortfolio && (
        <div
          className="
          rounded-3xl
          border-2
          border-dashed
          border-slate-200
          py-20
          flex
          flex-col
          items-center
          justify-center
        "
        >
          <div
            className="
            w-20
            h-20
            rounded-full
            bg-emerald-50
            flex
            items-center
            justify-center
          "
          >
            <Images className="text-emerald-600" size={36} />
          </div>

          <h3
            className="
            text-2xl
            font-bold
            mt-6
            text-slate-800
          "
          >
            Portfolio Coming Soon
          </h3>

          <p
            className="
            mt-3
            text-slate-500
            max-w-md
            text-center
            leading-7
          "
          >
            This vendor hasn't uploaded any portfolio images yet. Check back
            later.
          </p>
        </div>
      )}

      {/* Gallery */}

      {hasPortfolio && (
        <div
          className="
          grid
          grid-cols-2
          md:grid-cols-3
          gap-5
        "
        >
          {portfolio.map((item, index) => (
            <PortfolioImage
              key={item.id}
              item={item}
              index={index}
              onClick={setSelectedImage}
            />
          ))}

          <p className="mt-4 text-sm text-slate-500">
            Selected Image :{selectedImage === null ? "None" : selectedImage}
          </p>
        </div>
      )}

      <PortfolioLightbox
        portfolio={portfolio}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </section>
  );
}

export default VendorPortfolio;
