"use client"
import React from "react";
import { Sidebar } from "../sidebar";
import Footer from "../footer";
import { LayoutProps } from "./interface";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
    <div className='flex flex-col'>
      <div className='flex flex-row'>
        <Sidebar/>
        <div className=''>{children}</div>
      </div>
      <Footer />
    </div>
    </QueryClientProvider>
  );
};

export default Layout;
