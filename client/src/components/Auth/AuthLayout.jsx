{
  /* This is the shared page layout.

It gives us

left branding section
right authentication card
responsive layout

Both Login and Register will use it. */
}

import { Link } from "react-router-dom";

function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left */}

      <div
        className="
          hidden
          lg:flex
          lg:w-1/2
          bg-gradient-to-br
          from-emerald-700
          via-emerald-600
          to-teal-700
          text-white
          p-16
          flex-col
          justify-between
        "
      >
        <div>
          <Link
            to="/"
            className="
              text-4xl
              font-black
              tracking-tight
            "
          >
            VendorVerse
          </Link>

          <h1
            className="
              text-6xl
              font-black
              leading-tight
              mt-20
            "
          >
            Find trusted vendors.
            <br />
            Book confidently.
          </h1>

          <p
            className="
              text-lg
              text-emerald-50/90
              mt-8
              leading-8
              max-w-xl
            "
          >
            India's premium marketplace for verified photographers, decorators,
            caterers, makeup artists and event professionals.
          </p>
        </div>

        <div className="space-y-5">
          <Feature text="Verified Professionals" />

          <Feature text="Transparent Reviews" />

          <Feature text="Secure Booking Requests" />

          <Feature text="Trusted Event Marketplace" />
        </div>
      </div>

      {/* Right */}

      <div
        className="
          flex-1
          flex
          items-center
          justify-center
          p-8
        "
      >
        <div
          className="
            w-full
            max-w-md
          "
        >
          <div className="mb-10">
            <h2
              className="
                text-4xl
                font-bold
                text-slate-900
              "
            >
              {title}
            </h2>

            <p
              className="
                text-slate-500
                mt-3
              "
            >
              {subtitle}
            </p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}

function Feature({ text }) {
  return (
    <div className="flex items-center gap-4">
      <div
        className="
          w-3
          h-3
          rounded-full
          bg-white
        "
      />

      <span className="text-lg">{text}</span>
    </div>
  );
}

export default AuthLayout;
