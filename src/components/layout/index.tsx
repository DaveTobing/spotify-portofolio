import React from "react";
import { Sidebar } from "../sidebar";
import Footer from "../footer";
import { LayoutProps } from "./interface";
import { playlists } from "@/data/playlist";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-row">
        <Sidebar playlists={playlists}/>
        <div className='flex-grow'>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
