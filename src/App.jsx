import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Restaurant from "./pages/Restaurant";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./assets/components/Navbar";
import Footer from "./assets/components/Footer";
import { useEffect, useState } from "react";
import Reservations from "./pages/Reservations";
import ReservationForm from "./pages/ReservationForm";
import MenuForm from "./pages/MenuForm";
import User from "./pages/User";
import CreateRestaurant from "./pages/CreateRestaurant";
import UpdateUser from "./pages/UpdateUser";
import UpdateRestaurant from "./pages/UpdateRestaurant";
import UpdateMenu from "./pages/UpdateMenu";
import UpdateReservation from "./pages/UpdateReservation";
import MapLeaflet from "./assets/components/MapLeaflet";

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
    <div className="relative">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/user" element={<User />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register role="Customer" />} />
        <Route path="/user/update" element={<UpdateUser />} />
        <Route
          path="/register/resto"
          element={<Register role="Restaurant_Admin" />}
        />
        <Route path="/resto/create" element={<CreateRestaurant />} />
        <Route path="/resto/update" element={<UpdateRestaurant />} />
        <Route path="/reservation" element={<Reservations />} />
        <Route path="/reservation/add" element={<ReservationForm />} />
        <Route path="/reservation/update" element={<UpdateReservation />} />
        <Route path="/menu/add" element={<MenuForm />} />
        <Route path="/menu/update" element={<UpdateMenu />} />
        <Route path="/map" element={<MapLeaflet />} />
      </Routes>
      <Footer />
      <div
        className={
          (isTop ? "invisible " : "visible bg-[#ffedc3]") +
          " fixed bottom-7 right-7  z-50 flex h-[4rem] w-[4rem] cursor-pointer items-center justify-center rounded-full transition duration-700 ease-in-out hover:animate-pulse"
        }
        onClick={() => window.scrollTo(0, 0)}
      >
        <i className="mt-2 h-5 w-5 rotate-45 border-l-4 border-t-4 border-[#FFB100]" />
      </div>
      {/* will be delete after finished */}
      <div
        className={
          "fixed bottom-7 left-7 z-50 flex cursor-pointer items-center justify-center rounded-full bg-gray-400 p-10 text-2xl text-white hover:animate-pulse"
        }
      >
        <p>On Development</p>
      </div>
      {/* will be delete after finished */}
    </div>
  );
}

export default App;
