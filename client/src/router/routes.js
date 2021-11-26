import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import CreatePage from "../pages/CreatePage";
import DetailPage from "../pages/DetailPage";
import LinksPage from "../pages/LinksPage";

export const useRoutes = (isAuthenticated) => {
  console.log(isAuthenticated);
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/links" element={<LinksPage />} />
        <Route path="/" element={<CreatePage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
    </Routes>
  );
};
