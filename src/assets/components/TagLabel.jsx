const TagLabel = ({ label, isDeletable, func, index }) => {
  return (
    <>
      {isDeletable ? (
        <button
          className="cursor-pointer rounded-3xl border border-[#FFB100] px-2 py-1 text-xs font-semibold hover:bg-black hover:bg-opacity-50"
          onClick={() => func(index)}
          type="button"
        >
          {label}
        </button>
      ) : (
        <div className="rounded-3xl border border-[#FFB100] px-2 py-1 text-xs font-semibold">
          {label}
        </div>
      )}
    </>
  );
};

export default TagLabel;
