import { Camera } from "lucide-react";

const images = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800",
  "https://images.unsplash.com/photo-1529636798458-92182e662485?w=800",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800",
];

function VendorPortfolio() {
  return (
    <section className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8 mt-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-3xl font-bold text-slate-900">
            Portfolio
          </h2>

          <p className="text-slate-500 mt-2">
            A glimpse of recent work.
          </p>

        </div>

        <button className="text-emerald-600 font-semibold hover:underline">

          View All (48)

        </button>

      </div>

      {/* Gallery */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {images.map((image, index) => (

          <div
            key={index}
            className="relative overflow-hidden rounded-2xl group cursor-pointer"
          >

            <img
              src={image}
              alt=""
              className="w-full h-56 object-cover transition duration-500 group-hover:scale-110"
            />

            {/* Overlay */}

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-300 flex items-center justify-center">

              <div className="opacity-0 group-hover:opacity-100 transition">

                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg">

                  <Camera className="text-emerald-600" />

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default VendorPortfolio;