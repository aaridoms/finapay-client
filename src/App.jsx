import { useContext, useState } from "react";
import "tailwindcss/tailwind.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { isMobile } from "react-device-detect";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Error from "./pages/Error";
import Navbar from "./components/Navbar";
import NavbarUser from "./components/NavbarUser";
import { AuthContext } from "./context/auth.context";
import Summary from "./pages/Summary";
import Profile from "./pages/Profile";
import Expenses from "./pages/Expenses";
import ExpenseDetails from "./pages/ExpenseDetails";
import Investment from "./pages/Investment";
import NavBarUserMovile from "./components/NavBarUserMovile";
import Footer from "./components/Footer";

function App() {
  const { isUserActive } = useContext(AuthContext);
  const [newData, setNewData] = useState(false);

  return (
    <>
      {isUserActive === true ? (
        isMobile ? (
          // Componente de Navbar para dispositivos móviles
          <NavBarUserMovile newData={newData} setNewData={setNewData} />
        ) : (
          // Componente de Navbar para escritorio y tablet
          <NavbarUser newData={newData} setNewData={setNewData}/>
        )
      ) : (
        <Navbar />
      )}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/account/summary" element={<Summary setNewData={setNewData} />} />
        <Route path="/account/profile" element={<Profile setNewData={setNewData} />} />
        <Route path="/account/expenses" element={<Expenses />} />
        <Route
          path="/account/expenses/:idExpense/details"
          element={<ExpenseDetails />}
        />
        <Route path="/account/investment" element={<Investment />} />

        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
