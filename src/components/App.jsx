import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import Layout from "./Layout/Layout";
import { lazy } from "react";

const RegisterPage = lazy(() => import("../pages/RegisterPage/RegisterPage"));
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const FilmDetailsPage = lazy(() => import('../pages/FilmDetailsPage/FilmDetailsPage'));
const FilmsPage = lazy(() => import("../pages/FilmsPage/FilmsPage"));

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="films" element={<FilmsPage />} />
          <Route path="films/:filmID" element={<FilmDetailsPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;