import UserCard from "../assets/components/AppAdmin/UserCard";

const User = () => {
  return (
    <div className="flex min-h-[calc(100vh-55px)] flex-col items-center py-5 md:py-10">
      <div className="p-10">
        <h1 className="text-center text-2xl font-semibold">List User</h1>
      </div>
      <ul className="w-full max-w-5xl px-5">
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </ul>
    </div>
  );
};

export default User;
