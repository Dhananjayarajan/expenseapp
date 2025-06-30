import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const WeeklySummary = () => {
  const [weeklySummary, setWeeklySummary] = useState([]);
  const tableColor = useSelector((state) => state.theme.tableColor);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    const response = await axios.get("/api/weeklySummary");
    try {
      if (response.data) {
        setWeeklySummary(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const amount = weeklySummary.map((item) => {
    return item.amount;
  });

  const sum = amount.reduce((accumulator, total) => {
    return accumulator + total;
  }, 0);

  return (
    <div
      className={` ${tableColor} max-w-xs rounded overflow-hidden shadow-lg border p-4 m-3`}
    >
      <h1 className={`${tableColor} uppercase text-xl font-bold mb-4`}>
        Weekly expenses
      </h1>
      <p className={`${tableColor}`}>{sum}</p>
    </div>
  );
};

export default WeeklySummary;
