import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const MonthToDateSummary = () => {
  const tableColor = useSelector((state) => state.theme.tableColor);
  const [mtdSummary, setMtdSummary] = useState([]);

  useEffect(() => {
    mtdData();
  }, []);

  const mtdData = async () => {
    const response = await axios.get("/api/mtdsummary");
    try {
      if (response.data) {
        setMtdSummary(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const amount = mtdSummary.map((item) => {
    return item.amount;
  });

  const sum = amount.reduce((accumulator, total) => {
    return accumulator + total;
  }, 0);

  return (
    <div
      className={`${tableColor} border p-4 m-3 max-w-xs rounded shadow-lg  `}
    >
      <h1 className={`font-bold text-xl uppercase mb-4 ${tableColor}`}>
        Month to date expenses
      </h1>
      <p className={`${tableColor}`}>{sum}</p>
    </div>
  );
};

export default MonthToDateSummary;
