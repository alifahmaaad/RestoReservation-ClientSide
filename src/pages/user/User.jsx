import { useEffect, useState } from "react";
import UserCard from "../../assets/components/AppAdmin/UserCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ErrorLabel from "../../assets/components/ErrorLabel";

const User = () => {
  const { token, dataUser } = useSelector(
    (state) => state.dataUserResponseRedux,
  );
  const navigate = useNavigate();
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setError] = useState([]);
  useEffect(() => {
    if (dataUser != "" && token != "") {
      dataUser.role != "App_Admin" ? navigate("/") : getUser();
    } else {
      navigate("/login");
    }
  }, []);
  const getUser = async () => {
    await axios
      .get(`${import.meta.env.VITE_HOST_URL}/api/user/appadmin`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setUsers(res.data.payload);
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
      });
  };
  return (
    <div className="flex min-h-[calc(100vh-55px)] flex-col items-center py-5 md:py-10">
      <ErrorLabel errorMsg={errorMsg} func={() => setError([])} />
      <div className="p-10">
        <h1 className="text-center text-2xl font-semibold">List User</h1>
      </div>
      <ul className="w-full max-w-5xl px-5">
        {users != null &&
          Object.entries(users).map((user, key) => {
            return <UserCard userData={user[1]} key={key} />;
          })}
      </ul>
    </div>
  );
};

export default User;
