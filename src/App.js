import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Login from "./auth/Login";
import SignUp from "./auth/Signup";
import Dashboead from "./componets/dashboard/Dashboard";
import LeadList from "./componets/lead/LeadList";
import UserList from "./componets/user/UserList";
import ProjectList from "./componets/project/ProjectList";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import UserDetails from "./componets/user/UserDetails";
import UpdateUser from "./componets/user/UpdateUser";
import "./context/theme.css";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />

        <div style={{ marginLeft: "220px", padding: "20px" }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            <Route path="/" element={<Dashboead />} />
            <Route path="/leads" element={<LeadList />} />
            {/* ✅ Parent route */}
            <Route path="/users">
              <Route index element={<UserList />} />          {/* /users */}
              <Route path=":id" element={<UserDetails />} />  {/* /users/1 */}
              <Route path="/users/:id/edit" element={<UpdateUser />} />
            </Route>          <Route path="/projects" element={<ProjectList />} />
          </Routes>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;