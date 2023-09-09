import headerImg from "../assets/img/img.jpg";
import RestoCard from "../assets/components/RestoCard";
import { useEffect, useState } from "react";
import axios from "axios";
import ErrorLabel from "../assets/components/ErrorLabel";

const Home = () => {
  const [restaurants, setRestaurants] = useState(null);
  const [errorMsg, setError] = useState([]);
  useEffect(() => {
    getRestaurants();
  }, []);
  const getRestaurants = async () => {
    await axios
      .get(`${import.meta.env.VITE_HOST_URL}/api/restaurant/all`)
      .then((res) => {
        if (res.data.payload != null) {
          res.data.payload.length > 0
            ? setRestaurants(res.data.payload)
            : setRestaurants(1);
        }
      })
      .catch((e) => {
        if (e.code == "ERR_NETWORK") {
          setError([...errorMsg, e.message]);
        } else {
          setError([...errorMsg, ...e.response.data.message]);
        }
      });
  };
  return (
    <div className="h-full">
      <ErrorLabel errorMsg={errorMsg} func={() => setError([])} />
      <div className="relative z-10 mx-2 my-2 mb-10 flex h-72 flex-col items-center justify-center rounded-2xl bg-[#FFB100] px-5 py-[13rem]">
        <div className="text-4xl font-extrabold text-white md:text-6xl">
          RR.
        </div>
        <h1 className="max-w-[30rem] py-5 text-center text-2xl  font-bold text-white md:text-4xl">
          <span className="text-[#e52535]">Hungry?</span> Just book your favorit
          restaurant
        </h1>
        <p className="max-w-[25rem] text-center text-sm text-white md:text-lg">
          You can book restaurant in this website, just one click in our
          website.
        </p>
        <div className="absolute bottom-0 left-[50%] h-12 w-[calc(100vw-48px)] max-w-[25rem] -translate-x-[50%] translate-y-[60%] rounded-full bg-white shadow-lg">
          <input
            type="text"
            placeholder="Filter Search"
            className="h-full w-full rounded-full px-10 focus:outline-none"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 top-0 -z-10 w-full overflow-hidden rounded-2xl opacity-70">
          <img
            src={headerImg}
            className="h-full w-full rounded-2xl object-cover"
            loading="lazy"
            alt=""
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center py-10">
        <h2 className="text-2xl font-semibold">Looking for Restaurant?</h2>
        <p className="max-w-[25rem] text-center">
          Find restaurants with popular dishes and the best deals in your area.
        </p>
      </div>
      <div className="mx-auto h-full w-[calc(100%_-_48px)] max-w-screen-xl py-6 md:w-[calc(100%_-_64px)] lg:pb-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10 lg:grid-cols-4 ">
          {restaurants != null ? (
            restaurants == 1 ? (
              <p>No restaurant Found</p>
            ) : (
              Object.entries(restaurants).map((restaurant, key) => {
                return <RestoCard dataResto={restaurant[1]} key={key} />;
              })
            )
          ) : (
            <div className="flex h-full w-[calc(100vw_-_50px)] items-center justify-center gap-2">
              <p className="text-sm font-bold">Loading</p>
              <div className="h-5 w-5 animate-spin rounded-full border-t-2 border-black" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
