import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Header } from "./components/Header/Header.jsx";
import { MedicalList } from "./components/MedicalList/MedicalList.jsx";
import { RegistrationPage } from "./components/RegistrationPage/RegistrationPage.jsx";
import { LoginPage } from "./components/RegistrationPage/LoginPage.jsx";
import { Popup } from "./components/Popup/Popup.jsx";
import { useSelector } from "react-redux";

function App() {
const show = useSelector(state => state.dataReducer.popup.show)
  return (
    <>
      <Router>
      <Header />
      {show && <Popup />}
        <Routes>
          <Route path="/" element={<>home</>} />
          <Route path="/pills" element={<MedicalList />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/logout" element={<>LogOut</>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
