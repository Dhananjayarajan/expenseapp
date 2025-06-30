import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DailySummary from "./summary/DailySummary";
import WeeklySummary from "./summary/WeeklySummary";
import MonthToDateSummary from "./summary/MonthToDateSummary";
import LastWeekSummary from "./summary/LastWeekSummary";
import CategorySummary from "./summary/CategorySummary";

const Summary = () => {
  const tableColor = useSelector((state) => state.theme.tableColor);
  return (
    <div>
      <h1
        className={`${tableColor} uppercase text-3xl font-bold text-center mb-4`}
      >
        Summary
      </h1>
      <div>
        <div className="flex items-center gap-4">
          <DailySummary />
          <WeeklySummary />
          <MonthToDateSummary />
        </div>
        <div>
          <h1
            className={`${tableColor} uppercase text-3xl font-bold text-center mb-4`}
          >
            Top 5 Most spending Categories in this month
          </h1>
          <CategorySummary />
        </div>
      </div>
    </div>
  );
};

export default Summary;
