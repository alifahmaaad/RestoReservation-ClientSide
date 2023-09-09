import { useEffect, useState } from "react";
import CloseLabel from "../../assets/components/CloseLabel";
import OpenLabel from "../../assets/components/OpenLabel";
import TagLabel from "../../assets/components/TagLabel";
import MenuCard from "../../assets/components/MenuCard";
import ReservationLabel from "../../assets/components/ReservationLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ErrorLabel from "../../assets/components/ErrorLabel";

const Restaurant = () => {
  const [isOpen, setIsOpen] = useState(true);
  const param = useParams();
  const [restaurantData, setRestaurantData] = useState(null);
  const [menusData, setMenusData] = useState(null);
  const [errorMsg, setError] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getRestaurant();
  }, []);
  const getRestaurant = async () => {
    axios
      .get(`${import.meta.env.VITE_HOST_URL}/api/restaurant/${param.id}`)
      .then((res) => {
        if (res.data.payload != null) {
          res.data.payload.length == undefined || res.data.payload.length > 0
            ? setRestaurantData(res.data.payload)
            : res.data.payload.length == 0 && setRestaurantData(null);
        }
      })
      .catch((e) => {
        if (e.code == "ERR_NETWORK") {
          setError([...errorMsg, e.message]);
        } else if (
          typeof e.response.data != "object" &&
          e.response.status == 403
        ) {
          navigate("/login");
        } else {
          setError([...errorMsg, ...e.response.data.message]);
        }
      })
      .finally(() => getMenus());
  };
  const getMenus = async () => {
    await axios
      .get(`${import.meta.env.VITE_HOST_URL}/api/menu/all/${param.id}`)
      .then((res) => {
        if (res.data.payload != null) {
          res.data.payload.length == undefined || res.data.payload.length > 0
            ? setMenusData(res.data.payload)
            : res.data.payload.length == 0 && setMenusData(null);
        }
      })
      .catch((e) => {
        if (e.code == "ERR_NETWORK") {
          setError([...errorMsg, e.message]);
        } else if (
          typeof e.response.data != "object" &&
          e.response.status == 403
        ) {
          navigate("/login");
        } else {
          setError([...errorMsg, ...e.response.data.message]);
        }
      });
  };
  const handleDelete = () => {};
  return (
    <>
      <ErrorLabel errorMsg={errorMsg} func={() => setError([])} />
      {restaurantData != null && menusData != null ? (
        <div className="h-full">
          <div className="mx-auto flex w-[calc(100%_-_20px)] max-w-screen-xl items-center py-2 md:w-[calc(100%_-_64px)]">
            <div className="mx-2 flex aspect-square h-28 w-28 min-w-[7rem] rounded-xl object-cover md:h-32 md:w-32 md:justify-center lg:h-44 lg:w-44">
              <figure>
                <img
                  src={`${import.meta.env.VITE_HOST_URL}/${
                    restaurantData.photo
                  }`}
                  className="h-full w-full rounded-xl object-cover duration-500 hover:scale-105"
                  loading="lazy"
                  alt={restaurantData.description}
                />
              </figure>
            </div>
            <div className="h-full w-full py-2 md:py-3 lg:px-2">
              <div className="flex justify-between gap-2">
                <p className="text-normal font-semibold md:text-2xl " title="">
                  {restaurantData.name}
                </p>
                <ReservationLabel />
              </div>
              <div className="my-2 flex flex-wrap gap-2">
                <p className="flex items-center text-xs">Tags:</p>
                {JSON.parse(restaurantData.tags).map((tag, key) => {
                  return <TagLabel label={tag} key={key} />;
                })}
              </div>
              <p className="mb-2 line-clamp-3 text-xs md:text-sm" title="">
                {restaurantData.description}
              </p>
              <div className="flex items-center gap-1">
                {isOpen ? <OpenLabel /> : <CloseLabel />}
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <p
                  className="line-clamp-2 text-xs font-semibold text-gray-600 md:text-sm"
                  title=""
                >
                  {restaurantData.address}
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
              {Object.entries(menusData).map((menu, key) => {
                return (
                  <MenuCard
                    dataMenu={menu[1]}
                    key={key}
                    dataResto={restaurantData}
                  />
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-screen  w-full items-center justify-center gap-2 ">
          <p className="text-sm font-bold">Loading</p>
          <div className="h-5 w-5 animate-spin rounded-full border-t-2 border-black" />
        </div>
      )}
    </>
  );
};

export default Restaurant;
