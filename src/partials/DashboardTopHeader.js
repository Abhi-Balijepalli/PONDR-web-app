import React from "react";
import UserMenu from "../partials/UserMenu";
import SearchModal from "../partials/SearchModal";
import Notifications from "../partials/Notifications";
import Help from "../partials/Help";

function Header({ sidebarOpen, setSidebarOpen }) {
  return (
    <header className="relative flex-grow bg-white border-gray-200 z-auto w-max -ml-20 -mt-16 -mr-16 items-end">
      <div className="px-20 py-30 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px -mt-10 -mt-36 p-max ">
          {/* Header: Left side */}
          <div className="flex">
            {/* Hamburger button */}
            <button
              className="text-gray-500 hover:text-gray-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
          </div>

          {/* Header: Right side */}
          {/*
             <div className="flex items-center">
            <SearchModal />
            <Notifications />
            <Help />
            <hr className="w-px h-6 bg-gray-200 mx-3" />
            
          </div>
            */}
          <div className={'flex justify-end'}>
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
