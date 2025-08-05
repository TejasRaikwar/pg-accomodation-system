import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar"
import "./App.css"
const App = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen p-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
