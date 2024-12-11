import { Link, LinkProps } from "@chakra-ui/react";
import { ReactNode } from "react";
import { NavLink, Link as ReactRouterLink, useLocation } from "react-router-dom"

interface Props {
  to: string;
  children: ReactNode;
}

export const LinkItem = ({ to, children, ...props }: Props) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      as={ReactRouterLink}
      to={to}
      p={2}
      borderRadius={10}
      bg={isActive ? '#77b800' : undefined}
      color={isActive ? "white" : 'gray200'}
      {...props}
    >
      {children}
    </Link>
  )
}
