import React from "react";
import { Sidebar, Menu, SubMenu, MenuItem } from "react-pro-sidebar";
import { useSelector } from "react-redux";

export const CustomSidebarForAuth = () => {
  const { role } = useSelector((state) => state.auth);
  return (
    <Sidebar className="px-2 py-4">
      <Menu>
        <MenuItem className="text-gray-800 font-grotesk"> Profile </MenuItem>
        <MenuItem className="text-gray-800 font-grotesk"> Dashboard </MenuItem>
        <MenuItem className="text-gray-800 font-grotesk">
          {" "}
          Billing and Payment{" "}
        </MenuItem>
        {role === "FREELANCER" && (
          <MenuItem className="text-gray-800 font-grotesk">
            {" "}
            Order{" "}
          </MenuItem>
        )}
        {role === "FREELANCER" && (
          <MenuItem className="text-green-500 font-grotesk">
            {" "}
            Switch to Seller{" "}
          </MenuItem>
        )}
        <MenuItem className="text-gray-800 font-grotesk font-semibold">
          {" "}
          General{" "}
        </MenuItem>
        <MenuItem className="text-gray-800 font-grotesk"> Home </MenuItem>
        <MenuItem className="text-gray-800 font-grotesk"> Logout </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default CustomSidebarForAuth;
