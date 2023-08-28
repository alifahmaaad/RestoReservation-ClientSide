const SuccessLabel = ({ successMsg }) => {
  return (
    <div
      className={
        successMsg != 0
          ? "fixed left-1/2 top-[10%] block h-fit w-fit -translate-x-1/2   opacity-100 duration-500"
          : "top-0 -z-40 h-0 w-0 opacity-0"
      }
    >
      <div className="flex flex-col flex-wrap items-center justify-center gap-2">
        {successMsg.map((msg, i) => (
          <div
            key={i}
            className={
              (successMsg != 0 ? "opacity-100 duration-500" : "opacity-0") +
              " rounded-full bg-[#eaffea] px-7 font-serif font-semibold text-[#00880d]"
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
