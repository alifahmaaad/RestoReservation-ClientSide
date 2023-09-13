import TagLabel from "../Label/TagLabel";

const RestoCard = ({ dataResto }) => {
  return (
    <a
      className="relative flex flex-row p-2 hover:cursor-pointer hover:shadow-2xl lg:flex-col"
      href={`/restaurant/${dataResto.id}`}
    >
      <div className="flex h-36 w-28 min-w-[7rem] rounded-xl object-cover md:justify-center lg:h-60 lg:w-full xl:h-64">
        <figure>
          <img
            src={`${import.meta.env.VITE_HOST_URL}/${dataResto.photo}`}
            className="h-full w-full rounded-xl object-cover lg:h-60 xl:h-64"
            alt={dataResto.description}
            loading="lazy"
          />
        </figure>
      </div>
      <div className="h-full w-full py-2 pl-3 pr-4 md:py-3 lg:px-2">
        <div className="flex flex-wrap gap-2">
          <p className="flex items-center text-xs">Tags:</p>
          {JSON.parse(dataResto.tags).map((tag, key) => {
            return <TagLabel label={tag} key={key} />;
          })}
        </div>
        <p
          className="mb-2 line-clamp-2 text-sm font-semibold md:text-base"
          title={dataResto.name}
        >
          {dataResto.name}
        </p>
        <p
          className="mb-2 line-clamp-3 text-xs md:text-sm"
          title={dataResto.description}
        >
          {dataResto.description}
        </p>
        <p
          className="mb-2 line-clamp-3 text-xs md:text-sm"
          title={dataResto.address}
        >
          {dataResto.address}
        </p>
      </div>
    </a>
  );
};

export default RestoCard;
