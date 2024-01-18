import React from "react";
import { Sidebar } from "../sidebar";
import Footer from "../footer";
import { LayoutProps } from "./interface";
import { playlists } from "@/data/playlist";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col justify-start">
      <Sidebar playlists={playlists}/>
      <div className='min-h-screen'>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
