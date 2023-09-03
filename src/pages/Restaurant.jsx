import { useState } from "react";
import CloseLabel from "../assets/components/CloseLabel";
import OpenLabel from "../assets/components/OpenLabel";
import TagLabel from "../assets/components/TagLabel";
import MenuCard from "../assets/components/MenuCard";
import ReservationLabel from "../assets/components/ReservationLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const Restaurant = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="h-full">
      <div className="mx-auto flex w-[calc(100%_-_20px)] max-w-screen-xl items-center py-2 md:w-[calc(100%_-_64px)]">
        <div className="mx-2 flex aspect-square h-28 w-28 min-w-[7rem] rounded-xl object-cover md:h-32 md:w-32 md:justify-center lg:h-44 lg:w-44">
          <figure>
            <img
              src="https://placehold.co/600x400"
              className="h-full w-full rounded-xl object-cover duration-500 hover:scale-105"
              loading="lazy"
              alt=""
            />
          </figure>
        </div>
        <div className="h-full w-full py-2 md:py-3 lg:px-2">
          <div className="flex justify-between gap-2">
            <p className="text-normal font-semibold md:text-2xl " title="">
              Restaurant Name
            </p>
            <ReservationLabel />
          </div>
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
          <div className="flex items-center gap-1">
            {isOpen ? <OpenLabel /> : <CloseLabel />}
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <p
              className="line-clamp-2 text-xs font-semibold text-gray-600 md:text-sm"
              title=""
            >
              Restaurant Address
            </p>
          </div>
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
