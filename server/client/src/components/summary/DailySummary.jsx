import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DailySummary = () => {
  const tableColor = useSelector((state) => state.theme.tableColor);
  const [dailySummary, setDailySummary] = useState([]);
  useEffect(() => {
    todaySummary();
  }, []);

  const todaySummary = async () => {
    const response = await axios.get("/api/dailysummary");
    try {
      if (response.data) {
        setDailySummary(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAmount = dailySummary.map((item) => {
    return item.amount;
  });

  const sum = getAmount.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

  return (
    <div
      className={` ${tableColor} max-w-xs rounded overflow-hidden shadow-lg border p-4 m-3`}
    >
      <h1 className={`${tableColor} uppercase text-xl font-bold mb-4`}>
        Today's Expenses
      </h1>
      <p className={`${tableColor}`}>{sum}</p>
    </div>
  );
};

export default DailySummary;
