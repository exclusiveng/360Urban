import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import AreaPage from "./pages/AreaPage";
import AreasIndexPage from "./pages/AreasIndexPage";
import ListingsPage from "./pages/ListingsPage";
import PropertyPage from "./pages/PropertyPage";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddPropertyPage from "./pages/admin/AddPropertyPage";

function NotFound() {
  return (
    <div className="container-main py-24 text-center">
      <h1 className="text-4xl font-bold text-charcoal mb-4">404</h1>
      <p className="text-gray-text mb-6">Page not found</p>
      <a
        href="/"
        className="text-primary font-medium no-underline hover:text-primary-dark"
      >
        Go back home
      </a>
    </div>
  );
}

function PublicLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Website Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/areas" element={<AreasIndexPage />} />
            <Route path="/areas/:areaSlug" element={<AreaPage />} />
            <Route path="/listings" element={<ListingsPage />} />
            <Route path="/property/:slug" element={<PropertyPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Admin Dashboard Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="add" element={<AddPropertyPage />} />
            {/* Placeholder for settings */}
            <Route
              path="settings"
              element={
                <div className="text-center py-20 text-gray-text">
                  Settings coming soon
                </div>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
