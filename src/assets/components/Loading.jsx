const Loading = () => {
  return (
    <div className="absolute right-0 top-0 m-5  flex items-center gap-2">
      <p className="text-sm font-bold">Loading</p>
      <div className="h-5 w-5 animate-spin rounded-full border-t-2 border-black" />
    </div>
  );
};

export default Loading;
