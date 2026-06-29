function VendorCover() {
  return (
    <section className="bg-slate-50">

      <div className="max-w-[1400px] mx-auto px-6 pt-8">

        <div className="h-[450px] rounded-3xl overflow-hidden shadow-lg">

          <img
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1600"
            alt="Vendor Cover"
            className="w-full h-full object-cover"
          />

        </div>

      </div>

    </section>
  );
}

export default VendorCover;