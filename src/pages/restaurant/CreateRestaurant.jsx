import { useEffect, useState } from "react";
import TagLabel from "../../assets/components/Label/TagLabel";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorLabel from "../../assets/components/Label/ErrorLabel";
import SuccessLabel from "../../assets/components/Label/SuccessLabel";
import MapLeaflet from "../../assets/components/MapLeaflet";
import Loading from "../../assets/components/Loading";

const CreateRestaurant = () => {
  const [tags, setTags] = useState([]);
  const [tagText, setTagText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStillChecking, setIsStillChecking] = useState(true);
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
      .get(
        `${import.meta.env.VITE_HOST_URL}/api/restaurant/owner/${dataUser.id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      )
      .then((res) => {
        if (res.data.status) {
          setSuccess([
            ...successMsg,
            ["You already have Restaurant, Navigate to home"],
          ]);
          setTimeout(() => {
            setIsStillChecking(false);
            navigate("/");
          }, 1500);
        } else {
          setIsStillChecking(false);
        }
      })
      .catch((e) => {
        if (typeof e.response.data != "object" && e.response.status == 403) {
          navigate("/login");
        } else if (e.code == "ERR_NETWORK") {
          setError([...errorMsg, e.message]);
        }
      });
  };
  useEffect(() => {
    if (dataUser != "" && token != "") {
      dataUser.role != "Restaurant_Admin" ? navigate("/") : checkRestaurant();
    } else {
      navigate("/login");
    }
  }, []);
  const handleDeleteTag = (key) => {
    const arr = [...tags];
    arr.splice(key, 1);
    setTags(arr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    const data = new FormData(e.currentTarget);
    setIsLoading(true);
    await axios
      .post(
        `${import.meta.env.VITE_HOST_URL}/api/restaurant/create`,
        {
          name: data.get("name"),
          owner: dataUser.id,
          tags: JSON.stringify(tags),
          photo: data.get("photo"),
          address: data.get("address"),
          location: JSON.stringify(location),
        },
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
            navigate("/restaurant/" + res.data.payload.id);
          }
        }, 1500);
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
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleLocation = (location) => {
    setLocation(location);
  };
  return (
    <div className="relative flex min-h-[calc(100svh-55px)] items-center justify-center bg-white">
      <ErrorLabel errorMsg={errorMsg} func={() => setError([])} />
      <SuccessLabel successMsg={successMsg} />
      <div className="relative z-10 flex h-full w-full bg-white px-4 py-20 sm:max-w-[45rem] sm:rounded-lg sm:shadow-xl">
        <div className="absolute left-0 top-0 hidden items-center gap-2 p-5 sm:flex">
          <p className="text-3xl font-bold">
            RR<b className="text-[#FFB100]">.</b>
          </p>
          <p className="font-mono font-bold">RestoReservation</p>
        </div>
        {isLoading && <Loading />}
        <div className="flex w-full flex-col items-center justify-center sm:max-w-7xl">
          <p className="py-4 font-serif text-3xl font-bold text-[#FFB100]">
            Restaurant Register
          </p>
          {isStillChecking ? (
            <Loading />
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateRestaurant;
