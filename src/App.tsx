import { BrowserRouter, Route, Routes } from "react-router";

// Components
import Body from "./components/Body";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NewChat from "./components/NewChat";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<NewChat />} />
            <Route path="/chat/:id" element={<Chat />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route path="*" element={<div>Not Found</div>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
