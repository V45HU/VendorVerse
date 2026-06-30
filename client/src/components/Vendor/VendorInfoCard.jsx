import VendorHeroInfo from "./VendorHeroInfo";
import VendorStats from "./VendorStats";

function VendorInfoCard({ vendor }) {
  return (
    <section className="bg-slate-50">
      {/* width is controlled by */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="-mt-24 relative z-20">
          {/* main container of floating card & height controlled by */}
          <div className="bg-white rounded-[28px] shadow-2xl p-10">
            <VendorHeroInfo vendor={vendor} />

            <VendorStats vendor={vendor} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default VendorInfoCard;
