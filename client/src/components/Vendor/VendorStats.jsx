import { CalendarDays, Camera, Clock3, Languages } from "lucide-react";

function VendorStats({ vendor }) {
  return (
    <>
      {/* Stats */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
        {/* Experience */}

        <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center">
            <CalendarDays className="text-emerald-600" />
          </div>

          <div>
            <p className="text-sm text-slate-500">Experience</p>

            <p className="font-semibold">
              {vendor.experience > 0 ? `${vendor.experience}+ Years` : "New"}
            </p>
          </div>
        </div>

        {/* Projects */}

        <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center">
            <Camera className="text-emerald-600" />
          </div>

          <div>
            <p className="text-sm text-slate-500">Projects</p>

            <p className="font-semibold">{vendor.portfolioCount}</p>
          </div>
        </div>

        {/* Response */}

        <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center">
            <Clock3 className="text-emerald-600" />
          </div>

          <div>
            <p className="text-sm text-slate-500">Response Time</p>

            <p className="font-semibold">
              {vendor.responseTime || "Not specified"}
            </p>
          </div>
        </div>

        {/* Languages */}

        <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center">
            <Languages className="text-emerald-600" />
          </div>

          <div>
            <p className="text-sm text-slate-500">Languages</p>

            <p className="font-semibold">
              {vendor.languages?.length
                ? vendor.languages.join(", ")
                : "Not specified"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default VendorStats;
