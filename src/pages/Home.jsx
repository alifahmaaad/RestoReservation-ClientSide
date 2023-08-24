import { useDispatch, useSelector } from "react-redux";
import { set } from "../redux/slices/dataUserResponse";
import headerImg from "../assets/img/img.jpg";
import RestoCard from "../assets/components/RestoCard";

const Home = () => {
  const dataSelector = useSelector((state) => state.dataUserResponseRedux);
  const dispatch = useDispatch();
  return (
    <div className="h-full">
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
        <div className="absolute bottom-0 left-[50%] h-14 w-[calc(100vw-48px)] max-w-[25rem] -translate-x-[50%] translate-y-[60%] rounded-full bg-white shadow-lg"></div>
        <div className="absolute bottom-0 left-0 right-0 top-0 -z-10 w-full overflow-hidden rounded-2xl">
          <img
            src={headerImg}
            className="h-full w-full rounded-2xl object-cover"
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
          <RestoCard />
          <RestoCard />
          <RestoCard />
          <RestoCard />
          <RestoCard />
        </div>
      </div>
    </div>
  );
};

export default Home;
