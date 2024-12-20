import { Navigate, Route, Routes } from "react-router";
import Layout from "./Layout/Layout";
import { lazy, Suspense } from "react";
import Keywords from "./FilmDetailsComponents/Keywords/Keywords";
import Loader from "./Loader/Loader";
import Changes from "./FilmDetailsComponents/Changes/Changes";
import Cast from "./FilmDetailsComponents/Cast/Cast";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const FilmDetailsPage = lazy(() =>
  import("../pages/FilmDetailsPage/FilmDetailsPage")
);
const FilmsPage = lazy(() => import("../pages/FilmsPage/FilmsPage"));
const ReviewPage = lazy(() => import("../pages/ReviewPage/ReviewPage"));
const SearchPage = lazy(() => import("../pages/SearchPage/SearchPage"));
const CompanyPage = lazy(() => import("../pages/CompanyPage/CompanyPage"));

function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="films" element={<FilmsPage />} />
            <Route path="films/:filmID" element={<FilmDetailsPage />}>
              <Route path="keywords" element={<Keywords />} />
              <Route path="changes" element={<Changes />} />
              <Route path="cast" element={<Cast />} />
            </Route>
            <Route path="reviews/:reviewID" element={<ReviewPage />} />
            <Route path="company/:companyID" element={<CompanyPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="*" element={<Navigate to={"/"} />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
