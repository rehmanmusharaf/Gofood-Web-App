import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nopage from "./Screens/Nopage";
import Home from "./Screens/Home";
import Signup from "./Screens/Signup";
import Login from "./Screens/Login";
import Orders from "./Screens/Orders";
// import { useCart, useDispatchcart } from "../Compoenents/ContextReducer.jsx";
import { ContextReducer } from "./Compoenents/ContextReducer";
function App() {
  return (
    <ContextReducer>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/orders" element={<Orders />} />
          <Route exact path="/*" element={<Nopage />} />
        </Routes>
      </BrowserRouter>
    </ContextReducer>
  );
}

export default App;
