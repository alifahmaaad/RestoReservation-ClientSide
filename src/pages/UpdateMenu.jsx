import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const param = useParams();
  const [menuData, setDataMenu] = useState({
    id: null,
    name: null,
    restoName: null,
    restoId: null,
    price: null,
    description: null,
    photo: null,
  });
  const navigate = useNavigate();
  const getMenu = async () => {
    await axios
      .get(`${import.meta.env.VITE_HOST_URL}/api/menu/${param.id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        !res.data.status && navigate("/");
        setDataMenu({
          ...menuData,
          id: res.data.payload.id,
          name: res.data.payload.name,
          restoName: res.data.payload.restaurant.name,
          restoId: res.data.payload.restaurant.id,
          price: res.data.payload.price,
          photo: res.data.payload.photo,
          description: res.data.payload.description,
        });
      })
      .catch((e) => {
        if (typeof e.response.data != "object" && e.response.status == 403) {
          navigate("/login");
        } else if (e.code == "ERR_NETWORK") {
          setError([...errorMsg, e.message]);
        } else {
          setError([...errorMsg, ...e.response.data.message]);
        }
      });
  };
  useEffect(() => {
    if (dataUser != "" && token != "") {
      dataUser.role == "Customer" && navigate("/");
      dataUser.role == "Restaurant_Admin" && getMenu();
    } else {
      navigate("/login");
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    const dataform = new FormData(e.currentTarget);
    let data = {
      id: menuData.id,
      restaurant: menuData.restoId,
      name: dataform.get("name"),
      price: dataform.get("price"),
      description: dataform.get("description"),
    };
    if (dataform.get("photo").size != 0) {
      data = { ...data, photo: data.get("photo") };
    }
    setIsLoading(true);
    await axios
      .put(
        `${import.meta.env.VITE_HOST_URL}/api/menu/restaurant/update`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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
        console.log(e);
        if (typeof e.response.data != "object" && e.response.status == 403) {
          navigate("/login");
        } else if (e.code == "ERR_NETWORK") {
          setError([...errorMsg, e.message]);
        } else {
          setError([...errorMsg, ...e.response.data.message]);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="relative flex min-h-[calc(100svh-55px)] items-center justify-center bg-white ">
      <div className="relative z-10 flex h-full w-full bg-white py-5 sm:max-h-[45rem] sm:max-w-[45rem] sm:rounded-lg sm:shadow-xl md:py-20">
        <SuccessLabel successMsg={successMsg} />
        <ErrorLabel errorMsg={errorMsg} func={() => setError([])} />
        <div className="absolute left-0 top-0 hidden items-center gap-2 p-5 sm:flex">
          <p className="text-3xl font-bold">
            RR<b className="text-[#FFB100]">.</b>
          </p>
          <p className="font-mono font-bold">RestoReserve</p>
        </div>
        {isLoading && <Loading />}
        <div className="flex w-full flex-col items-center justify-center sm:max-w-7xl">
          <p className="py-4 font-serif text-3xl font-bold text-[#FFB100]">
            Update Menu
          </p>
          <form
            className="flex h-full w-full flex-col justify-center gap-3 px-10"
            onSubmit={handleSubmit}
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
            <label htmlFor="photo">Menu Photo</label>
            <input
              type="file"
              className="h-full rounded-md border p-2 px-4"
              placeholder="photo"
              name="photo"
              accept="image/*"
              onChange={(e) =>
                setPreviewIMG(URL.createObjectURL(e.target.files[0]))
              }
            />
            {(previewIMG || menuData.photo) && (
              <div id="previewIMG">
                <label>Preview Image :</label>
                <figure className="flex aspect-square h-28 w-28 min-w-[7rem] rounded-xl object-cover md:h-32 md:w-32 md:justify-center lg:h-44 lg:w-44">
                  <img
                    src={
                      previewIMG
                        ? previewIMG
                        : import.meta.env.VITE_HOST_URL + "/" + menuData.photo
                    }
                    className="h-full w-full rounded-xl object-cover"
                    loading="lazy"
                    alt=""
                  />
                </figure>
              </div>
            )}
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
