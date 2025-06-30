import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Transactions = () => {
  const formBg = useSelector((state) => state.theme.formColor);
  const [value, setValue] = useState({
    date: "",
    category: "",
    title: "",
    description: "",
    amount: "",
  });
  const [successMessage, setSuccessMessage] = useState(null);
  const [failureMessage, setFailureMessage] = useState(null);

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/submit", value);
      if (response.data.success) {
        setSuccessMessage(
          <div>
            <p>
              Form submitted successfully, please check your statement for
              detailed info.
            </p>
          </div>
        );
      }
      setValue({
        date: "",
        category: "",
        title: "",
        description: "",
        amount: "",
      });
    } catch (error) {
      console.log("error sending data", error);
      const message =
        error.response.data.message || "You must login to continue";
      setFailureMessage(
        <div>
          <p>{message}</p>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className={` shadow-lg rounded-lg p-6 w-full max-w-lg space-y-4 ${formBg}`}
      >
        <div className="flex flex-col">
          <label
            htmlFor="category"
            className={`mb-1 text-sm font-medium ${formBg}`}
          >
            Category
          </label>

          <select
            value={value.category}
            onChange={handleChange}
            name="category"
            id="category"
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="food">Food</option>
            <option value="snacks">Snacks</option>
            <option value="emi">EMI</option>
            <option value="ccbill">Credit card bill</option>
            <option value="health">Health issue</option>
            <option value="travel">Travel expense</option>
            <option value="clothes">Clothes</option>
            <option value="entertainment">Entertainment</option>
            <option value="grooming">Grooming</option>
            <option value="subscription">
              Subscription (Amazon, Netflix etc)
            </option>
            <option value="recharge">Recharge</option>
            <option value="others">Others</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="title"
            className={`mb-1 text-sm font-medium ${formBg}`}
          >
            Title
          </label>
          <input
            value={value.title}
            name="title"
            onChange={handleChange}
            id="title"
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="description"
            className={`mb-1 text-sm font-medium ${formBg}`}
          >
            Description
          </label>
          <textarea
            value={value.description}
            onChange={handleChange}
            name="description"
            id="description"
            rows="4"
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="date"
            className={`mb-1 text-sm font-medium ${formBg}`}
          >
            Date
          </label>
          <input
            value={value.date}
            onChange={handleChange}
            name="date"
            type="date"
            id="date"
            max={today}
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="amount"
            className={`mb-1 text-sm font-medium ${formBg}`}
          >
            Amount
          </label>
          <input
            value={value.amount}
            onChange={handleChange}
            name="amount"
            type="number"
            id="amount"
            className="border  rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Add Transaction
        </button>
        {successMessage && (
          <div className="text-green-700 bg-green-100 p-2 rounded-md text-center mt-4">
            {successMessage}
          </div>
        )}
        {failureMessage && (
          <div className="text-red-700 bg-red-100 p-2 rounded-md text-center mt-4">
            {failureMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default Transactions;
