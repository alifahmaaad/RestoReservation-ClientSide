import TagLabel from "./TagLabel";

const RestoCard = () => {
  return (
    <a
      className="relative flex flex-row p-2 hover:cursor-pointer hover:shadow-2xl lg:flex-col"
      href="#"
    >
      <div className="flex h-36 w-28 min-w-[7rem] rounded-xl object-cover md:justify-center lg:h-60 lg:w-full xl:h-64">
        <figure>
          <img
            src="https://placehold.co/600x400"
            className="h-full w-full rounded-xl object-cover lg:h-60 xl:h-64"
          />
        </figure>
      </div>
      <div className="h-full w-full py-2 pl-3 pr-4 md:py-3 lg:px-2">
        <div className="flex flex-wrap gap-2">
          <p className="flex items-center text-xs">Tags:</p>
          <TagLabel label={"labelda"} />
          <TagLabel label={"labelda"} />
          <TagLabel label={"labelda"} />
        </div>
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
    </a>
  );
};

export default RestoCard;
