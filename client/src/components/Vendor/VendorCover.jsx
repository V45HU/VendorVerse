function VendorCover({ vendor }) {
  const coverImage =
    vendor?.coverImage ||
    vendor?.profileImage ||
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1600";

  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-[1400px] px-6 pt-8">
        <div className="h-[450px] overflow-hidden rounded-3xl shadow-lg">
          <img
            src={coverImage}
            alt={vendor?.name || "Vendor Cover"}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default VendorCover;
