import { useDispatch, useSelector } from "react-redux";
import { set } from "../redux/slices/dataUserResponse";
import { useState } from "react";
import RestoCard from "../assets/components/RestoCard";

const Home = () => {
  const dataSelector = useSelector((state) => state.dataUserResponseRedux);
  const dispatch = useDispatch();
  return (
    <div className="mx-auto h-full w-[calc(100%_-_48px)] max-w-screen-xl py-6 md:w-[calc(100%_-_64px)] lg:pb-16">
      <div
        className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10 lg:grid-cols-4 "
        onClick={() => dispatch(set(data))}
      >
        <RestoCard />
        <RestoCard />
        <RestoCard />
        <RestoCard />
        <RestoCard />
      </div>
      <button onClick={() => console.log(dataSelector)}>BUTTON</button>
    </div>
  );
};

export default Home;
