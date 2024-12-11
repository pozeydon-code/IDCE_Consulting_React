import { NotFound } from "@/pages";
import { ReactNode } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

export const RoutesWithNotFound = ({ children }: Props) => {
  return (
    <Routes>
      {children}
      <Route path="*" element={<Navigate to="/404" />} />
      <Route path="/404" element={<NotFound />} />
    </Routes>
  );
};
