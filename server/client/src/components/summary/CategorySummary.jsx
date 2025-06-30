import React, { useEffect, useState } from "react";
import axios from "axios";

import { useSelector } from "react-redux";

const CategorySummary = () => {
  const [summary, setSummary] = useState([]);
  const tableColor = useSelector((state) => state.theme.tableColor);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get("/api/top-categories");
    try {
      if (response.data) {
        setSummary(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-wrap items-center m-4 gap-4 ">
      {summary.map((item) => {
        return (
          <div
            key={item._id}
            className={`${tableColor} border p-4 m-3 max-w-xs rounded shadow-lg min-w-[150px] w-[200px]`}
            id={item._id}
          >
            <h1 className={`font-bold text-xl uppercase mb-4 ${tableColor}`}>
              {item._id}
            </h1>
            <p>{item.totalSpent}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CategorySummary;
