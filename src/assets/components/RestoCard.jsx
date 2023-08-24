const RestoCard = () => {
  return (
    <div className="relative flex flex-row p-2 lg:flex-col">
      <div className="flex h-40 w-28 min-w-[10rem] rounded-xl object-cover md:h-60 md:justify-center lg:h-64 lg:w-full">
        <figure>
          <img
            src="https://placehold.co/600x400"
            className="h-full w-full rounded-xl object-cover md:h-60 xl:h-64"
          />
        </figure>
      </div>
      <div className="h-full w-full py-2 pl-3 pr-4 md:py-3 lg:px-2">
        <p
          className="mb-2 line-clamp-2 text-sm font-semibold md:text-base"
          title=""
        >
          Restaurant Name
        </p>
        <p className="mb-2 line-clamp-3 text-xs md:text-sm" title="">
          Restaurant Desc
        </p>
        <p className="mb-2 line-clamp-3 text-xs md:text-sm" title="">
          Restaurant Address
        </p>
      </div>
    </div>
  );
};

export default RestoCard;
