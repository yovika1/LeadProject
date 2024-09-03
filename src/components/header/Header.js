import Cookies from "js-cookie";
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";


export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
        <div className="relative inline-block text-left">
  <div
    id="dropdownDefaultButton"
    onClick={toggleDropdown}
    className="flex items-center justify-center w-6 h-6 border-2 border-dotted border-violet-700 text-violet-700 text-sm font-extrabold rounded-xl cursor-pointer duration-500 my-3"
    type="button"
    aria-haspopup="true"
    aria-expanded={isOpen ? "true" : "false"}
  >
    <FaUserCircle className="text-xl" />
  


            {isOpen && (
              <div className="origin-top-right absolute whitespace-pre right-0 mt-14 w-20 rounded-lg shadow-lg  dark:bg-gray-700">
                <ul
                  className=" px-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                  onClick={() => {
                    Cookies.remove("token");
                    window.location.reload();
                  }}
                >
                  <li>
                    <a
                      href="/#"
                      className="block px-2 py-2 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Log out
                    </a>
                  </li>
                </ul>
              </div>
              
            )}
          </div>
        </div>
      
    </>
  );
};