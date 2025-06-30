import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import GoogleButton from "react-google-button";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, getUser } from "../Slices/userSlice";
import Transactions from "./Transactions";
import { changeTheme } from "../Slices/themeSlice";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const themeBg = useSelector((state) => state.theme.headerBg);
  const themeButton = useSelector((state) => state.theme.headerButton);
  const isDark = useSelector((state) => state.theme.isDark);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const handleTheme = () => {
    dispatch(changeTheme());
  };

  return (
    <div className={themeBg}>
      <div>
        <h1 className="text-3xl">Expense Tracker</h1>
      </div>
      <div className="flex gap-1">
        <Link to="/" element={<Transactions />} className={themeButton}>
          Summary
        </Link>
        <Link
          to="/transactions"
          element={<Transactions />}
          className={themeButton}
        >
          Add Expense
        </Link>
        <Link
          to="/statement"
          element={<Transactions />}
          className={themeButton}
        >
          Statement
        </Link>
        <Link to="/docs" element={<Transactions />} className={themeButton}>
          Docs
        </Link>
      </div>
      <div>
        <button onClick={handleTheme}>
          {isDark ? (
            <i className="ri-sun-line text-4xl"></i>
          ) : (
            <i className="ri-moon-line p-2 text-3xl "></i>
          )}
        </button>
      </div>
      <div className="flex items-center gap-2">
        {user ? (
          <div className="flex items-center gap-2">
            <h1 className="text-2xl"> Hi {user.name} </h1>
            <button
              onClick={() => (window.location.href = "api/logout")}
              className="bg-blue-500 text-gray-300 text-2xl rounded-2xl p-2.5"
            >
              Signout
            </button>
          </div>
        ) : (
          <GoogleButton
            onClick={() => {
              window.location.href = "/auth/google";
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
