import React from "react";
import Navbar from "../navbar";
import Footer from "../footer";
import { LayoutProps } from "./interface";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className='min-h-screen'>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
