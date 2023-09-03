const ErrorLabel = ({ errorMsg, func }) => {
  return (
    <div
      className={
        errorMsg != 0
          ? "fixed left-1/2 top-1/2 z-20 block h-full w-full  -translate-x-1/2 -translate-y-1/2"
          : "hidden"
      }
    >
      <div className="absolute left-0 top-0 z-50 h-full w-full bg-gray-500 bg-opacity-70 blur-xl" />
      <div className="fixed left-1/2 top-1/2 z-50 flex max-h-[25rem] w-[calc(100vw-5rem)] max-w-[30rem] -translate-x-1/2 -translate-y-1/2  items-center justify-center rounded-xl bg-white py-10">
        <button
          className="absolute right-0 top-0 m-8 flex items-center font-bold"
          onClick={() => func()}
        >
          X
        </button>
        <div className="flex flex-col flex-wrap items-center justify-center gap-2">
          <p className="py-5 font-serif  font-semibold">Error Message</p>
          {errorMsg != undefined &&
            errorMsg.map((err, i) => (
              <div
                key={i}
                className="rounded-full bg-[#f8e4e4] px-4 py-2 text-center font-serif text-sm text-[#e52535] md:text-base"
              >
                {err}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ErrorLabel;
