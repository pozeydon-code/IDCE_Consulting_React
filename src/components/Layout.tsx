import { ReactNode } from "react"
import { Helmet } from "react-helmet";
interface Props {
  children: ReactNode;
  title: string;
}
export const Layout = ({ children, title }: Props) => {
  const titlePage = `${title}`;
  return (
    <>{title && (
      <Helmet>
        <title>{titlePage}</title>
      </Helmet>
    )}
      {children}
    </>
  )
}
