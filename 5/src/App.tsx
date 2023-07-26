import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ContactUsPage from "./pages/ContactUsPage";
import AppLayout from "./AppLayout";
export default function App(): JSX.Element {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
      </Route>
    </Routes>
  );
}
