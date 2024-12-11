import { Navbar } from "@/components";
import { Center } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export const PublicGuard = () => {
  return (
    <>
      <Navbar />
      <Center minH="100svh">
        <Outlet />
      </Center>
    </>
  );
};
