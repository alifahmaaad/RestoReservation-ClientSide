import { useState } from "react";
import CloseLabel from "../assets/components/CloseLabel";
import OpenLabel from "../assets/components/OpenLabel";
import TagLabel from "../assets/components/TagLabel";
import MenuCard from "../assets/components/MenuCard";

const Restaurant = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="h-full">
      <div className="mx-auto flex w-[calc(100%_-_48px)] max-w-screen-xl items-center md:w-[calc(100%_-_64px)] ">
        <div className="h-full w-full py-2 pl-3 pr-4 md:py-3 lg:px-2">
          <p className="text-normal font-semibold md:text-2xl " title="">
            Restaurant Name
          </p>
          <div className="my-2 flex flex-wrap gap-2">
            <p className="flex items-center text-xs">Tags:</p>
            <TagLabel label={"labelda"} />
            <TagLabel label={"labelda"} />
            <TagLabel label={"labelda"} />
          </div>
          <p className="mb-2 line-clamp-3 text-xs md:text-sm" title="">
            Restaurant Desc Restaurant DescRestaurant DescRestaurant
            DescRestaurant DescRestaurant DescRestaurant DescRestaurant
            DescRestaurant DescRestaurant DescRestaurant DescRestaurant
            DescRestaurant Desc
          </p>
          <div className="flex items-center">
            {isOpen ? <OpenLabel /> : <CloseLabel />}
            <p
              className="line-clamp-2 px-2 text-xs font-semibold text-gray-600 md:text-sm"
              title=""
            >
              Restaurant Address
            </p>
          </div>
        </div>
        <div className="flex aspect-square h-28 w-28 min-w-[7rem] rounded-xl object-cover md:h-32 md:w-32 md:justify-center">
          <figure>
            <img
              src="https://placehold.co/600x400"
              className="h-full w-full rounded-xl object-cover duration-500 hover:scale-105"
            />
          </figure>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center py-4 md:py-10">
        <h2 className="text-2xl font-semibold">Restaurant Menu</h2>
        <p className="max-w-[25rem] text-center">
          Check the menu before reservations to this restaurant.
        </p>
      </div>
      <div className="mx-auto w-[calc(100%_-_48px)] max-w-screen-xl py-6 md:w-[calc(100%_-_64px)] lg:pb-16">
        <div className="grid grid-cols-2 justify-items-center gap-6 md:grid-cols-3 md:gap-10 lg:grid-cols-4">
          <MenuCard />
          <MenuCard />
          <MenuCard />
          <MenuCard />
          <MenuCard />
          <MenuCard />
          <MenuCard />
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
