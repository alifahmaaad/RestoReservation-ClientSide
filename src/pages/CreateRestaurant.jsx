import { useEffect, useState } from "react";
import TagLabel from "../assets/components/TagLabel";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorLabel from "../assets/components/ErrorLabel";
import SuccessLabel from "../assets/components/SuccessLabel";
import MapLeaflet from "../assets/components/MapLeaflet";

const CreateRestaurant = () => {
  const [tags, setTags] = useState([]);
  const [tagText, setTagText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setError] = useState([]);
  const [successMsg, setSuccess] = useState([]);
  const [previewIMG, setPreviewIMG] = useState();
  const [location, setLocation] = useState();
  const navigate = useNavigate();
  const { token, dataUser } = useSelector(
    (state) => state.dataUserResponseRedux,
  );
  const checkRestaurant = async () => {
    await axios
      .get(`http://localhost:8080/api/restaurant/${dataUser.id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        !res.data.status && navigate("/");
        console.log(res);
      })
      .catch((e) => {
        if (e.code == "ERR_NETWORK") {
          setError([...errorMsg, e.message]);
        }
      });
  };
  useEffect(() => {
    if (dataUser != "" && token != "") {
      dataUser.role != "Restaurant_Admin" ? navigate("/") : checkRestaurant();
    } else {
      navigate("/");
    }
  }, []);
  const handleDeleteTag = (key) => {
    console.log(token);
    const arr = [...tags];
    arr.splice(key, 1);
    setTags(arr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.files);
    const data = new FormData(e.currentTarget);
    setIsLoading(true);
    await axios
      .post(
        "http://localhost:8080/api/restaurant/create",
        {
          name: data.get("name"),
          owner: dataUser.id,
          tags: JSON.stringify(tags),
          photo: data.get("photo"),
          address: data.get("address"),
          location: location,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        },
      )
      .then((res) => console.log(res))
      .catch((e) => console.log(e))
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleLocation = (location) => {
    setLocation(location);
  };
  return (
    <div className="relative flex min-h-[calc(100svh-55px)] items-center justify-center bg-white">
      <ErrorLabel errorMsg={errorMsg} func={() => navigate("/")} />
      <SuccessLabel successMsg={successMsg} />
      <div className="relative z-10 flex h-full w-full bg-white px-4 py-20 sm:max-w-[45rem] sm:rounded-lg sm:shadow-xl">
        <div className="absolute left-0 top-0 hidden items-center gap-2 p-5 sm:flex">
          <p className="text-3xl font-bold">
            RR<b className="text-[#FFB100]">.</b>
          </p>
          <p className="font-mono font-bold">RestoReserve</p>
        </div>
        <div className="flex w-full flex-col items-center justify-center sm:max-w-7xl">
          <p className="py-4 font-serif text-3xl font-bold text-[#FFB100]">
            Restaurant Register
          </p>
          <form
            className="flex h-full w-full flex-col justify-center gap-3 px-10"
            onSubmit={handleSubmit}
          >
            <label htmlFor="name">Restaurant Name</label>
            <input
              type="text"
              className="rounded-md border p-2 px-4"
              placeholder="Restorant Name"
              name="name"
            />
            <label htmlFor="tags">Tags</label>
            <div className="flex">
              <input
                type="text"
                className="w-full rounded-md border p-2 px-4"
                placeholder="Add Tags"
                name="tags"
                onChange={(val) => setTagText(val.target.value)}
                value={tagText}
              />
              <button
                className="flex h-full w-fit items-center justify-center rounded-md border bg-[#FFB100] px-4 font-bold text-white"
                onClick={() => {
                  if (tagText != "") {
                    setTags([...tags, tagText]);
                    setTagText("");
                  }
                }}
                type="button"
              >
                +
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((val, key) => (
                <TagLabel
                  key={key}
                  label={val}
                  isDeletable={true}
                  func={handleDeleteTag}
                  index={key}
                />
              ))}
            </div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="rounded-md border p-2 px-4"
              placeholder="Address"
              name="address"
            />
            <label htmlFor="location">Location</label>
            <MapLeaflet func={handleLocation} />
            <label htmlFor="photo">Restaurant Photo</label>
            <input
              type="file"
              className="h-fit rounded-md border p-2 px-4"
              placeholder="photo"
              name="photo"
              accept="image/*"
              onChange={(e) =>
                setPreviewIMG(URL.createObjectURL(e.target.files[0]))
              }
            />
            {previewIMG && (
              <div id="previewIMG">
                <label>Preview Image :</label>
                <figure className="flex aspect-square h-28 w-28 min-w-[7rem] rounded-xl object-cover md:h-32 md:w-32 md:justify-center lg:h-44 lg:w-44">
                  <img
                    src={previewIMG}
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
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRestaurant;
