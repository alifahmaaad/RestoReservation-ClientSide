import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Restaurant from "./pages/Restaurant";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./assets/components/Navbar";
import Footer from "./assets/components/Footer";
import { useEffect, useState } from "react";

function App() {
  const [isTop, setIsTop] = useState(true);
  const checkTop = () => {
    if (window.scrollY === 0) setIsTop(true);
    else setIsTop(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", checkTop);
  });
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
      <div
        className={
          (isTop ? "invisible " : "visible bg-[#ffedc3]") +
          " fixed bottom-7 right-7  flex h-[4rem] w-[4rem] cursor-pointer items-center justify-center rounded-full transition duration-700 ease-in-out hover:animate-pulse "
        }
        onClick={() => window.scrollTo(0, 0)}
      >
        <i className="mt-2 h-5 w-5 rotate-45 border-l-4 border-t-4 border-[#FFB100]" />
      </div>
    </>
  );
}

export default App;
