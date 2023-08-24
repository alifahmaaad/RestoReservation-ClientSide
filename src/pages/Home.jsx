import { useDispatch, useSelector } from "react-redux";
import { set } from "../redux/slices/dataUserResponse";
import { useState } from "react";

const Home = () => {
  const dataSelector = useSelector((state) => state.dataUserResponseRedux);
  const dispatch = useDispatch();
  return (
    <>
      <div className="my-2 flex" onClick={() => dispatch(set(data))}>
        Home
      </div>
      <button onClick={() => console.log(dataSelector)}>BUTTON</button>
    </>
  );
};

export default Home;
