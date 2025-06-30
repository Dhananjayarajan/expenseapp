import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Transactions from "./components/Transactions";
import Summary from "./components/Summary";
import { useDispatch, useSelector } from "react-redux";
import Statement from "./components/Statement";

const App = () => {
  const dispatch = useDispatch();
  const bodyBg = useSelector((state) => state.theme.bodyBg);

  return (
    <div className={`${bodyBg} min-h-screen`}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/" element={<Summary />} />
          <Route path="/statement" element={<Statement />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
