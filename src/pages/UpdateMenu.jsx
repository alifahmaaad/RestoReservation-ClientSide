import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SuccessLabel from "../assets/components/SuccessLabel";
import ErrorLabel from "../assets/components/ErrorLabel";
import Loading from "../assets/components/Loading";
import { useSelector } from "react-redux";
const UpdateMenu = () => {
  const { token, dataUser } = useSelector(
    (state) => state.dataUserResponseRedux,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setError] = useState([]);
  const [successMsg, setSuccess] = useState([]);
  const [previewIMG, setPreviewIMG] = useState();
  const [idResto, setIdResto] = useState(null);
  const [restoName, setRestoName] = useState(null);
  const navigate = useNavigate();
  const getRestaurant = async () => {
    await axios
      .get(`http://localhost:8080/api/restaurant/owner/${dataUser.id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        !res.data.status && navigate("/");
        console.log(res.data);
        setIdResto(res.data.payload.id);
        setRestoName(res.data.payload.name);
      })
      .catch((e) => {
        if (e.code == "ERR_NETWORK") {
          setError([...errorMsg, e.message]);
        } else {
          setError([...errorMsg, ...e.response.data.message]);
        }
      });
  };
  useEffect(() => {
    if (dataUser != "" && token != "") {
      dataUser.role == "Customer" && navigate("/");
      dataUser.role == "Restaurant_Admin" && getRestaurant();
    } else {
      navigate("/login");
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataform = new FormData(e.currentTarget);
    const data = {
      restaurant: idResto != null && idResto,
      name: dataform.get("name"),
      price: dataform.get("price"),
      description: dataform.get("description"),
      photo: dataform.get("photo"),
    };
    setIsLoading(true);
    await axios
      .post(
        "http://localhost:8080/api/restaurant/api/menu/restaurant/create",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        },
      )
      .then((res) => {
        setSuccess([...successMsg, res.data.message]);
        setTimeout(() => {
          if (res.data.status) {
            navigate("/restaurant/" + idResto);
          }
        }, 1000);
      })
      .catch((e) => {
        if (e.code == "ERR_NETWORK") {
          setError([...errorMsg, e.message]);
        } else {
          setError([...errorMsg, ...error.response.data.message]);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="relative flex min-h-[calc(100svh-55px)] items-center justify-center bg-white ">
      <div className="relative z-10 flex h-full w-full bg-white py-5 sm:max-h-[45rem] sm:max-w-[45rem] sm:rounded-lg sm:shadow-xl md:py-20">
        <div className="absolute left-0 top-0 hidden items-center gap-2 p-5 sm:flex">
          <p className="text-3xl font-bold">
            RR<b className="text-[#FFB100]">.</b>
          </p>
          <p className="font-mono font-bold">RestoReserve</p>
        </div>
        <div className="flex w-full flex-col items-center justify-center sm:max-w-7xl">
          <p className="py-4 font-serif text-3xl font-bold text-[#FFB100]">
            Update Menu
          </p>
          <form
            className="flex h-full w-full flex-col justify-center gap-3 px-10"
            onSubmit={(e) => {
              e.preventDefault();
              console.log(e.target);
            }}
          >
            <label htmlFor="restaurantname">Restaurant Name</label>
            <input
              type="text"
              className="rounded-md border p-2 px-4 before:content-['Hello\_World']"
              placeholder="restaurantname"
              name="restaurantname"
              value="restaurantname"
              disabled
            />
            <label htmlFor="name">Menu Name</label>
            <input
              type="text"
              className="rounded-md border p-2 px-4"
              placeholder="name"
              name="name"
            />
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className="rounded-md border p-2 px-4 "
              placeholder="Number of guest"
              name="price"
            />
            <label htmlFor="description">Description</label>
            <textarea
              className="rounded-md border p-2 px-4 "
              placeholder="Description"
              name="description"
            />
            <button
              className="rounded-full bg-[#FFB100] py-3 text-white"
              type="submit"
            >
              Update Menu
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateMenu;
