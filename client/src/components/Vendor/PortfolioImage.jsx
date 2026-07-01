function PortfolioImage({ item, index, onClick }) {
  return (
    <div
      onClick={() => onClick(index)}
      className="
        relative
        overflow-hidden
        rounded-3xl
        cursor-pointer
        group
      "
    >
      <img
        src={item.image}
        alt={item.title}
        className="
          h-72
          w-full
          object-cover
          duration-500
          transition
          group-hover:scale-110
        "
      />

      {/* Overlay */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/80
          via-black/10
          to-transparent
          opacity-0
          group-hover:opacity-100
          transition
        "
      >
        <div
          className="
            absolute
            bottom-5
            left-5
            right-5
          "
        >
          <h3
            className="
              text-white
              text-lg
              font-bold
            "
          >
            {item.title}
          </h3>

          <p
            className="
              text-white/80
              text-sm
              mt-1
            "
          >
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PortfolioImage;
