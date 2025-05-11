import React from "react";
import { Sidebar, Menu, SubMenu, MenuItem } from "react-pro-sidebar";

export const CustomSidebar = () => {
  return (
    <Sidebar className="px-2 py-4">
      <Menu>
        <MenuItem><p className="text-white font-roboto font-bold rounded-sm px-6 py-2 bg-black w-31">Join Fiverr</p></MenuItem>
        <MenuItem className="text-gray-800 font-grotesk"> Sign in </MenuItem>
        <MenuItem className="text-gray-800 font-grotesk"> Try Fiverr Go <span className="px-2 rounded-sm bg-[#D95F83] text-white font-semibold text-sm">New</span> </MenuItem>
        <SubMenu className="text-gray-800 font-grotesk" label="Browse categories">
          <MenuItem> Graphics & Design </MenuItem>
          <MenuItem> Programming & Tech </MenuItem>
          <MenuItem> Digital Marketing</MenuItem>
          <MenuItem> Video & Animation </MenuItem>
          <MenuItem> Writing & Translation</MenuItem>
          <MenuItem> Music & Audio</MenuItem>
          <MenuItem> Business</MenuItem>
          <MenuItem> Finance</MenuItem>
        </SubMenu>
        <SubMenu className="text-gray-800 font-grotesk" label="Explorer">
          <MenuItem> Go </MenuItem>
          <MenuItem> Community </MenuItem>
          <MenuItem> Podcast</MenuItem>
          <MenuItem> Blog</MenuItem>
          <MenuItem> Answers </MenuItem>
          <MenuItem> Guides </MenuItem>
          <MenuItem> Learn</MenuItem>
          <MenuItem> Logo Maker</MenuItem>
        </SubMenu>
        <br />
        <MenuItem className="text-gray-800 font-grotesk font-semibold"> General </MenuItem>
        <MenuItem className="text-gray-800 font-grotesk"> Home </MenuItem>  
      </Menu>
    </Sidebar>
  );
};

export default CustomSidebar;
