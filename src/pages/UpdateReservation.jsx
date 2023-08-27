const UpdateReservation = () => {
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
          <p className="font-serif text-3xl font-bold text-[#FFB100]">
            Update Reservation Data
          </p>
          <form
            className="flex h-full w-full flex-col justify-center gap-3 px-10"
            onSubmit={(e) => {
              e.preventDefault();
              console.log(e.target);
            }}
          >
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="rounded-md border p-2 px-4"
              placeholder="username"
              name="username"
              value="namanamanamn"
              disabled
            />
            <label htmlFor="restaurantname">Restaurant Name</label>
            <input
              type="text"
              className="rounded-md border p-2 px-4"
              placeholder="restaurantname"
              name="restaurantname"
              value="restaurantname"
              disabled
            />
            <label htmlFor="datetime">Datetime</label>
            <input
              type="datetime-local"
              className="rounded-md border p-2 px-4"
              placeholder="Datetime"
              name="datetime"
            />
            <label htmlFor="numberofguest">Number of guest</label>
            <input
              type="number"
              className="rounded-md border p-2 px-4 "
              placeholder="Number of guest"
              name="numberofguest"
            />
            <button
              className="rounded-full bg-[#FFB100] py-3 text-white"
              type="submit"
            >
              Reservation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateReservation;
