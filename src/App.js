import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Login from "./auth/Login";
import SignUp from "./auth/Signup";
import Dashboead from "./componets/dashboard/Dashboard";
import LeadList from "./componets/lead/LeadList";
import UserList from "./componets/user/UserList";
import ProjectList from "./componets/project/ProjectList";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Already protected via HOC */}
          <Route path="/" element={<Dashboead />} />
          <Route path="/leads" element={<LeadList />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/projects" element={<ProjectList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;