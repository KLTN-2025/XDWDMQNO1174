import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");

  // Nếu không có token => quay lại trang đăng nhập
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Nếu có token => cho phép truy cập
  return <>{children}</>;
};

export default ProtectedRoute;
