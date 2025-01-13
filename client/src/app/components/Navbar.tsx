import React from "react";
// import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Card } from "@/components/ui/card";

interface NavbarProps {
  // define your props here
}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <nav className="flex justify-between items-center shadow-md border border-[#27272A] px-2 py-3 rounded-lg">
      {/* <div className="flex flex-row items-center gap-5">
      
        <a href="/" className="no-underline text-white hover:text-grey">
          Overview
        </a>
        <a href="#features" className="text-white hover:text-grey">
          Customer
        </a>
        <a href="/" className="no-underline text-white hover:text-grey">
          Proucts
        </a>
        <a href="#features" className="text-white hover:text-grey">
          Setting
        </a>
      </div> */}
      <h1 className="text-xl md:text-2xl font-extrabold text-[#FAFAFA]">
        DashBoard
      </h1>
      <div className="flex justify-between items-center space-x-2 md:space-x-6 text-white">
        {/* <Input className="text-white w-32 outline-none" placeholder="Search..." /> */}
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};

export default Navbar;
