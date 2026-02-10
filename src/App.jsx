import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import AreaPage from "./pages/AreaPage";
import AreasIndexPage from "./pages/AreasIndexPage";
import ListingsPage from "./pages/ListingsPage";
import PropertyPage from "./pages/PropertyPage";

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

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/areas" element={<AreasIndexPage />} />
            <Route path="/areas/:areaSlug" element={<AreaPage />} />
            <Route path="/listings" element={<ListingsPage />} />
            <Route path="/property/:slug" element={<PropertyPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
}
