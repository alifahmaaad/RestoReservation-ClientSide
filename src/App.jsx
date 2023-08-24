import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Restaurant from "./pages/Restaurant";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
