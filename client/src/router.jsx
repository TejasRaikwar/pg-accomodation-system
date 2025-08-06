// import { createBrowserRouter } from "react-router-dom";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import OwnerDashboard from "./pages/owner/OwnerDashboard";
// import TenantDashboard from "./pages/tenant/TenantDashboard";
// import HomePage from "./pages/public/HomePage";
// import Login from "./pages/auth/Login"
// import App from "./App";
// import Register from "./pages/auth/Register";
// import ProtectedRoute from "./routes/ProtectedRoute";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       { index: true, element: <HomePage /> },
//       { path: "login", element: <Login /> },
//       { path: "register", element: <Register /> },

//       {
//         element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
//         children: [{ path: "admin/dashboard", element: <AdminDashboard /> }],
//       },
//       {
//         element: <ProtectedRoute allowedRoles={["OWNER"]} />,
//         children: [{ path: "owner/dashboard", element: <OwnerDashboard /> }],
//       },
//       {
//         element: <ProtectedRoute allowedRoles={["TENANT"]} />,
//         children: [{ path: "tenant/dashboard", element: <TenantDashboard /> }],
//       },
//     ],
//   },
// ]);

// export default router;




import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "./pages/admin/AdminDashboard";
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import TenantDashboard from "./pages/tenant/TenantDashboard";
import HomePage from "./pages/public/HomePage";
import Login from "./pages/auth/Login";
import App from "./App";
import Register from "./pages/auth/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      // Removed ProtectedRoute wrappers
      { path: "admin/dashboard", element: <AdminDashboard /> },
      { path: "owner/dashboard", element: <OwnerDashboard /> },
      { path: "tenant/dashboard", element: <TenantDashboard /> },
    ],
  },
]);

export default router;
