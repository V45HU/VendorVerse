function RatingBars() {

  const ratings = [
    { star: 5, count: 112, width: "88%" },
    { star: 4, count: 12, width: "22%" },
    { star: 3, count: 3, width: "8%" },
    { star: 2, count: 1, width: "4%" },
    { star: 1, count: 0, width: "0%" },
  ];

  return (

    <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">

      {/* Overall Rating */}

      <div className="text-center">

        <h1 className="text-6xl font-bold text-slate-900">
          4.9
        </h1>

        <div className="text-yellow-400 text-2xl mt-2">
          ★★★★★
        </div>

        <p className="text-slate-500 mt-2">
          Based on 128 Reviews
        </p>

      </div>

      {/* Divider */}

      <div className="border-t border-slate-200 my-8"></div>

      {/* Rating Distribution */}

      <div className="space-y-5">

        {ratings.map((rating) => (

          <div
            key={rating.star}
            className="flex items-center gap-3"
          >

            <span className="w-5 text-sm font-medium text-slate-600">

              {rating.star}

            </span>

            <span className="text-yellow-400">
              ★
            </span>

            {/* Progress */}

            <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden">

              <div
                className="h-full bg-emerald-500 rounded-full"
                style={{
                  width: rating.width,
                }}
              />

            </div>

            <span className="w-8 text-right text-sm text-slate-500">

              {rating.count}

            </span>

          </div>

        ))}

      </div>

    </div>

  );

}

export default RatingBars;