import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "./pages/admin/AdminDashboard";
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import TenantDashboard from "./pages/tenant/TenantDashboard";
import HomePage from "./pages/public/HomePage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import App from "./App";
import ProtectedRoute from "./routes/ProtectedRoute";
import RegisterPG from "./pages/owner/RegisterPG";
import ViewListedPGs from "./pages/owner/ViewListedPGs";
import OwnerLayout from "./layouts/OwnerLayout";
import AdminLayout from "./layouts/AdminLayout";
import TenantLayout from "./layouts/TenantLayout";
import MyBookings from "./pages/tenant/MyBookings";
import AvailablePGs from "./pages/tenant/AvailablePGs";
import OwnerTenants from "./pages/owner/OwnerTenants";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminPGs from "./pages/admin/AdminPGs";
import AdminBookings from "./pages/admin/AdminBookings";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      // ADMIN
      {
        element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
        children: [
          {
            path: "admin",
            element: <AdminLayout />,
            children: [
              { path: "dashboard", element: <AdminDashboard /> },
              { path: "users", element: <AdminUsers /> },
              { path: "pgs", element: <AdminPGs /> },
              { path: "bookings", element: <AdminBookings /> },
            ],
          },
        ],
      },

      // OWNER
      {
        element: <ProtectedRoute allowedRoles={["OWNER"]} />,
        children: [
          {
            path: "owner",
            element: <OwnerLayout />,
            children: [
              { path: "dashboard", element: <OwnerDashboard /> },
              { path: "register-pg", element: <RegisterPG /> },
              { path: "pg-list", element: <ViewListedPGs /> },
              { path: "tenants", element: <OwnerTenants /> },
            ],
          },
        ],
      },

      // TENANT
      {
        element: <ProtectedRoute allowedRoles={["TENANT"]} />,
        children: [
          {
            path: "tenant",
            element: <TenantLayout />,
            children: [
              { path: "dashboard", element: <TenantDashboard /> },
              { path: "my-bookings", element: <MyBookings /> },
              { path: "available-pgs", element: <AvailablePGs /> },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;









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




// import { createBrowserRouter } from "react-router-dom";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import OwnerDashboard from "./pages/owner/OwnerDashboard";
// import TenantDashboard from "./pages/tenant/TenantDashboard";
// import HomePage from "./pages/public/HomePage";
// import Login from "./pages/auth/Login";
// import App from "./App";
// import Register from "./pages/auth/Register";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       { index: true, element: <HomePage /> },
//       { path: "login", element: <Login /> },
//       { path: "register", element: <Register /> },

//       // Removed ProtectedRoute wrappers
//       { path: "admin/dashboard", element: <AdminDashboard /> },
//       { path: "owner/dashboard", element: <OwnerDashboard /> },
//       { path: "tenant/dashboard", element: <TenantDashboard /> },
//     ],
//   },
// ]);

// export default router;



