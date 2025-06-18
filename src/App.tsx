import { useState } from "react";

// Components
import Body from "./components/Body";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SideBar from "./components/SideBar";

function App() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  return (
    <div className="w-full h-screen flex">
      <SideBar
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />
      <div className="flex-1 flex flex-col">
        <Header
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
        <Body />
        <Footer />
      </div>
    </div>
  );
}

export default App;
