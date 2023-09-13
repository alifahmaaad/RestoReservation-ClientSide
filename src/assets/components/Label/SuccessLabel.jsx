const SuccessLabel = ({ successMsg }) => {
  return (
    <div
      className={
        successMsg != 0
          ? "fixed left-1/2 top-[10%] z-10 block h-fit w-full -translate-x-1/2   px-5 opacity-100 duration-500"
          : "left-1/2 top-0 -z-40 h-0 w-0 -translate-x-1/2 opacity-0"
      }
    >
      <div className="flex flex-col flex-wrap items-center justify-center gap-2">
        {successMsg.map((msg, i) => (
          <div
            key={i}
            className={
              (successMsg != 0 ? "opacity-100 duration-500" : "opacity-0") +
              " rounded-md bg-[#eaffea] px-4 py-1 text-center font-serif text-[#00880d]"
            }
          >
            {msg}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuccessLabel;
