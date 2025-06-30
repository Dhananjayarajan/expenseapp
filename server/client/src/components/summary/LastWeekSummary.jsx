import React, { useEffect, useState } from "react";
import axios from "axios";

const LastWeekSummary = () => {
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get("/api/weeklySummary");
    try {
      if (response.data) {
        setSummary(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(summary);
  return <div></div>;
};

export default LastWeekSummary;
