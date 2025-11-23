import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Homepage from "./components/User/Homepage/Homepage";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ProtectedRoute from "./components/User/ProtectedRoute/ProtectedRoute";
import AboutUs from "./components/User/AboutUs/AboutUs";
import AccountMN from "./components/User/AccountMN/AccountMN";
import GameZone from "./components/User/GameZone/GameZone";
import Newspaper from "./components/User/Newspaper/Newspaper";
import Contact from "./components/User/Contact/Contact";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerifyCode from "./components/Register/VerifyCode";
import ResetPassword from "./components/ForgotPassword/ResetPassword";
import HomeStaff from "./components/Staff/Home/HomeStaff";
import MachineMN from "./components/Staff/MachineMN/MachineMN";
import Chat from "./components/Staff/Chat/Chat";
import AccountMNad from "./components/Admin/AccountMNad/AccountMNad";
import Statistical from "./components/Staff/Statistical/statistical";
import { HomeAD } from "./components/Admin/HomeAD/HomeAD";
import ChatApp from "./test/testMessenger"; // ✅ giữ route test từ Tuan-Dev

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔹 Route test chat */}
        <Route path="/chatTest" element={<ChatApp />} />

        {/* 🔹 Auth & Reset */}
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/VerifyCode" element={<VerifyCode />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />

        {/* 🔹 Trang người dùng */}
        <Route
          path="/trangchu"
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AboutUs"
          element={
            <ProtectedRoute>
              <AboutUs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AccountMN"
          element={
            <ProtectedRoute>
              <AccountMN />
            </ProtectedRoute>
          }
        />
        <Route
          path="/GameZone"
          element={
            <ProtectedRoute>
              <GameZone />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Newspaper"
          element={
            <ProtectedRoute>
              <Newspaper />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />

        {/* 🔹 Staff */}
        <Route
          path="/staff"
          element={
            <ProtectedRoute>
              <HomeStaff />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff/MachineMN"
          element={
            <ProtectedRoute>
              <MachineMN />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff/Chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff/Statistical"
          element={
            <ProtectedRoute>
              <Statistical />
            </ProtectedRoute>
          }
        />

        {/* 🔹 Admin */}
        <Route
          path="/admin/AccountMNad"
          element={
            <ProtectedRoute>
              <AccountMNad />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <HomeAD />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* 🔹 Toast hiển thị thông báo */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
        toastStyle={{ zIndex: 9999 }}
      />
    </BrowserRouter>
  );
}

export default App;








//Code cũ xung đột 
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import "./App.css";
// import Login from "./components/Login/Login";
// import Register from "./components/User/Register/Register";
// import Homepage from "./components/User/Homepage/Homepage";
// import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
// <<<<<<< Tuan-Dev
// import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
// import AboutUs from "./components/AboutUs/AboutUs";
// import AccountMN from "./components/AccountMN/AccountMN";
// import GameZone from "./components/GameZone/GameZone";
// import Newspaper from "./components/Newspaper/Newspaper";
// import Contact from "./components/Contact/Contact";
// import ChatApp from "./test/testMessenger";
// =======
// import ProtectedRoute from "./components/User/ProtectedRoute/ProtectedRoute";
// import AboutUs from "./components/User/AboutUs/AboutUs";
// import AccountMN from "./components/User/AccountMN/AccountMN";
// import GameZone from "./components/User/GameZone/GameZone";
// import Newspaper from "./components/User/Newspaper/Newspaper";
// import Contact from "./components/User/Contact/Contact";
// import { ToastContainer } from "react-toastify"; 
// import "react-toastify/dist/ReactToastify.css";  
// import VerifyCode from "./components/User/Register/VerifyCode";
// import ResetPassword from "./components/ForgotPassword/ResetPassword";
// import HomeStaff from "./components/Staff/Home/HomeStaff";
// import MachineMN from "./components/Staff/MachineMN/MachineMN";
// import Chat from "./components/Staff/Chat/Chat";
// import AccountMNad from "./components/Admin/AccountMNad/AccountMNad";
// import Statistical from "./components/Staff/Statistical/statistical";
// import { HomeAD } from "./components/Admin/HomeAD/HomeAD";


// >>>>>>> DEV
// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
// <<<<<<< Tuan-Dev
//         <Route path="/chatTest" element={<ChatApp />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/" element={<Login />} />
// =======
//         <Route path="/ResetPassword" element={<ResetPassword />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/" element={<Login />} />
//         <Route path="/VerifyCode" element={<VerifyCode />} />
// >>>>>>> DEV
//         <Route
//           path="/trangchu"
//           element={
//             <ProtectedRoute>
//               <Homepage />
//             </ProtectedRoute>
//           }
//         />
//         <Route path="/forgotPassword" element={<ForgotPassword />} />
//         <Route
//           path="/AboutUs"
//           element={
//             <ProtectedRoute>
//               <AboutUs />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/AccountMN"
//           element={
//             <ProtectedRoute>
//               <AccountMN />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/GameZone"
//           element={
//             <ProtectedRoute>
//               <GameZone />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/Newspaper"
//           element={
//             <ProtectedRoute>
//               <Newspaper />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/Contact"
//           element={
//             <ProtectedRoute>
//               <Contact />
//             </ProtectedRoute>
//           }
//         />
// <<<<<<< Tuan-Dev
// =======
//         {/* Staff */}
//         <Route
//           path="/staff"
//           element={
//             <ProtectedRoute>
//               <HomeStaff />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/staff/MachineMN"
//           element={
//             <ProtectedRoute>
//               <MachineMN />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/staff/Chat"
//           element={
//             <ProtectedRoute>
//               <Chat />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/staff/Statistical"
//           element={
//             <ProtectedRoute>
//               <Statistical />
//             </ProtectedRoute>
//           }
//         />
//         {/* Admin */}
//         <Route
//           path="/admin/AccountMNad"
//           element={
//             <ProtectedRoute>
//               <AccountMNad />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute>
//               <HomeAD />
//             </ProtectedRoute>
//           }
//         />
// >>>>>>> DEV
//       </Routes>

//       {/* 👇 Thêm ToastContainer ở đây */}
//       <ToastContainer
//         position="top-center"
//         autoClose={2000}
//         hideProgressBar={false}
//         closeOnClick
//         pauseOnHover
//         draggable
//         theme="colored"
//         toastStyle={{ zIndex: 9999 }}
//       />
//     </BrowserRouter>
//   );
// }

// export default App;
