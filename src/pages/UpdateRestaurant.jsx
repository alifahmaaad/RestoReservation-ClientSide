import { useState } from "react";
import TagLabel from "../assets/components/TagLabel";

const UpdateRestaurant = () => {
  const [showPass, setShowPass] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagText, setTagText] = useState("");
  const handleDeleteTag = (key) => {
    const arr = [...tags];
    arr.splice(key, 1);
    setTags(arr);
  };
  return (
    <div className="relative flex min-h-[calc(100svh-55px)] items-center justify-center bg-white py-20">
      <div className="relative z-10 flex h-full w-full bg-white px-4 py-20 sm:max-w-[45rem] sm:rounded-lg sm:shadow-xl">
        <div className="absolute left-0 top-0 hidden items-center gap-2 p-5 sm:flex">
          <p className="text-3xl font-bold">
            RR<b className="text-[#FFB100]">.</b>
          </p>
          <p className="font-mono font-bold">RestoReserve</p>
        </div>
        <div className="flex w-full flex-col items-center justify-center sm:max-w-7xl">
          <p className="py-4 font-serif text-3xl font-bold text-[#FFB100]">
            Restaurant Update Data
          </p>
          <form
            className="flex h-full w-full flex-col justify-center gap-3 px-10"
            onSubmit={(e) => {
              e.preventDefault();
              console.log(e.target);
            }}
          >
            <label htmlFor="name">Restaurant Name</label>
            <input
              type="text"
              className="rounded-md border p-2 px-4"
              placeholder="Restorant Name"
              name="name"
            />
            <label htmlFor="ownername">Admin Name</label>
            <input
              type="text"
              className="rounded-md border p-2 px-4"
              placeholder="ownername"
              name="ownername"
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
            <label htmlFor="photo">Restaurant Photo</label>
            <input
              type="file"
              className="h-full rounded-md border p-2 px-4"
              placeholder="photo"
              name="photo"
              accept="image/*"
            />
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
