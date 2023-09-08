import { useEffect, useState } from "react";
import TagLabel from "../assets/components/TagLabel";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import MapLeaflet from "../assets/components/MapLeaflet";
import ErrorLabel from "../assets/components/ErrorLabel";
import SuccessLabel from "../assets/components/SuccessLabel";
import Loading from "../assets/components/Loading";

const UpdateRestaurant = () => {
  const [tagText, setTagText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setError] = useState([]);
  const [successMsg, setSuccess] = useState([]);
  const [previewIMG, setPreviewIMG] = useState();
  const [restoData, setDataResto] = useState({
    id: null,
    name: null,
    ownerId: null,
    ownerName: null,
    tags: [],
    photo: null,
    address: null,
    location: null,
  });
  const navigate = useNavigate();
  const { token, dataUser } = useSelector(
    (state) => state.dataUserResponseRedux,
  );
  useEffect(() => {
    if (token != "") getDataResto();
  }, []);
  const getDataResto = async () => {
    await axios
      // .get("http://localhost:8080/api/restaurant/owner/" + dataUser.id, {
      .get(
        "https://restoreserve.azurewebsites.net/api/restaurant/owner/" +
          dataUser.id,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      )
      .then((res) => {
        setDataResto({
          ...restoData,
          id: res.data.payload.id,
          name: res.data.payload.name,
          ownerId: res.data.payload.userOwner.id,
          ownerName: res.data.payload.userOwner.fullName,
          address: res.data.payload.address,
          photo: res.data.payload.photo,
          tags: JSON.parse(res.data.payload.tags),
          location: JSON.parse(res.data.payload.location),
        });
      })
      .catch((e) => {
        console.log(e);
        if (e.response.data.includes("Authentication failed: JWT expired")) {
          navigate("/login");
        } else if (e.code == "ERR_NETWORK") {
          setError([...errorMsg, e.message]);
        } else {
          setError([...errorMsg, ...e.response.data.message]);
        }
      });
  };
  const handleDeleteTag = (key) => {
    const arr = [...restoData.tags];
    arr.splice(key, 1);
    setDataResto({ ...restoData, tags: arr });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    const data = new FormData(e.currentTarget);
    let filledData = {
      id: restoData.id,
      name: data.get("name"),
      owner: dataUser.id,
      tags: JSON.stringify(restoData.tags),
      address: data.get("address"),
      location: JSON.stringify(restoData.location),
    };
    if (data.get("photo").size != 0) {
      filledData = { ...filledData, photo: data.get("photo") };
    }
    setIsLoading(true);
    console.log(filledData);
    await axios
      // .put("http://localhost:8080/api/restaurant/update", filledData, {
      .put(
        "https://restoreserve.azurewebsites.net/api/restaurant/update",
        filledData,
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
        }, 1000);
      })
      .catch((e) => {
        if (e.response.data.includes("Authentication failed: JWT expired")) {
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
  const handleLocation = (location) => {
    setDataResto({ ...restoData, location: location });
  };
  return (
    <div className="relative flex min-h-[calc(100svh-55px)] items-center justify-center bg-white py-20">
      <ErrorLabel errorMsg={errorMsg} func={() => setError([])} />
      <SuccessLabel successMsg={successMsg} />
      <div className="relative z-10 flex h-full w-full bg-white px-4 py-20 sm:max-w-[45rem] sm:rounded-lg sm:shadow-xl">
        <div className="absolute left-0 top-0 hidden items-center gap-2 p-5 sm:flex">
          <p className="text-3xl font-bold">
            RR<b className="text-[#FFB100]">.</b>
          </p>
          <p className="font-mono font-bold">RestoReserve</p>
        </div>
        {isLoading && <Loading />}
        <div className="flex w-full flex-col items-center justify-center sm:max-w-7xl">
          <p className="py-4 font-serif text-3xl font-bold text-[#FFB100]">
            Restaurant Update Data
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
              defaultValue={restoData.name}
            />
            <label htmlFor="ownername">Admin Name</label>
            <input
              type="text"
              className="rounded-md border p-2 px-4"
              placeholder="Admin Name"
              name="ownername"
              defaultValue={restoData.ownerName}
              disabled
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
                    setDataResto({
                      ...restoData,
                      tags: [...restoData.tags, tagText],
                    });
                    setTagText("");
                  }
                }}
                type="button"
              >
                +
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {restoData.tags.map((val, key) => (
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
              defaultValue={restoData.address}
            />
            <label htmlFor="location">Location</label>
            {restoData.location != null && (
              <MapLeaflet
                func={handleLocation}
                islocated={restoData.location}
              />
            )}
            <label htmlFor="photo">Restaurant Photo</label>
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
            {(previewIMG || restoData.photo) && (
              <div id="previewIMG">
                <label>Preview Image :</label>
                <figure className="flex aspect-square h-28 w-28 min-w-[7rem] rounded-xl object-cover md:h-32 md:w-32 md:justify-center lg:h-44 lg:w-44">
                  <img
                    src={
                      previewIMG
                        ? previewIMG
                        : "http://localhost:8080/" + restoData.photo
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
              Update Restaurant Data
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateRestaurant;
