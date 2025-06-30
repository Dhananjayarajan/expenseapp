import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Transactions from "./Transactions";

const Statement = () => {
  const formBg = useSelector((state) => state.theme.formColor);
  const [statement, setStatement] = useState([]);
  const tableColor = useSelector((state) => state.theme.tableColor);
  const [openForm, setOpenForm] = useState(false);
  const [value, setValue] = useState({
    date: "",
    category: "",
    title: "",
    description: "",
    amount: "",
  });
  const [editingId, setEditingId] = useState(null);

  const getStatement = async () => {
    try {
      const response = await axios.get("/api/statement");
      setStatement(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const currentEntry = await axios.get(`/api/currenttransaction/${id}`);
      const isoDate = new Date(currentEntry.data.date);
      const formattedDate = isoDate.toISOString().split("T")[0];
      setValue({
        date: formattedDate,
        category: currentEntry.data.category,
        title: currentEntry.data.title,
        description: currentEntry.data.description,
        amount: currentEntry.data.amount,
      });
      setEditingId(id);
      setOpenForm(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`/api/update/${editingId}`, value);
      setOpenForm(false);
      setEditingId(null);
      await getStatement();
    } catch (e) {
      console.error("Error updating record:", e);
    }
  };

  //const handleUpdateForm = () => {};

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/delete/${id}`);
      setStatement(statement.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStatement();
  }, []);

  useEffect(() => {
    if (openForm) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [openForm]);

  return (
    <div className="p-4">
      <h1
        className={`text-3xl font-bold uppercase ${
          openForm ? "mb-20" : "mb-4"
        } text-center ${tableColor}`}
      >
        {" "}
        Statement
      </h1>
      {statement.length === 0 ? (
        <p className="text-gray-500 text-center ">No Statement found</p>
      ) : (
        <div>
          <div className={`overflow-x-auto ${openForm ? "blur-sm" : ""}`}>
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Date
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Category
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Title
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Description
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Amount
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {statement.map((entry) => (
                  <tr key={entry._id}>
                    <td
                      className={`border border-gray-300 px-4 py-2 text-center ${tableColor}`}
                    >
                      {new Date(entry.date).toLocaleDateString()}
                    </td>
                    <td
                      className={`border border-gray-300 px-4 py-2 text-center ${tableColor}`}
                    >
                      {entry.category}
                    </td>
                    <td
                      className={`border border-gray-300 px-4 py-2 text-center ${tableColor}`}
                    >
                      {entry.title}
                    </td>
                    <td
                      className={`border border-gray-300 px-4 py-2 text-center ${tableColor}`}
                    >
                      {entry.description}
                    </td>
                    <td
                      className={`border border-gray-300 px-4 py-2 text-center ${tableColor}`}
                    >
                      ₹{entry.amount}
                    </td>
                    <td
                      className={`border border-gray-300 px-4 py-2 text-center ${tableColor}`}
                    >
                      <div>
                        <i
                          onClick={() => handleUpdate(entry._id)}
                          className="ri-edit-2-line px-2 py-1 rounded hover:bg-gray-800 hover:text-white cursor-pointer "
                        ></i>
                        <i
                          onClick={() => handleDelete(entry._id)}
                          className="ri-delete-bin-line px-2 py-1 rounded hover:bg-gray-800 hover:text-white cursor-pointer"
                        ></i>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {openForm && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded shadow-lg">
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
                      //max={today}
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
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition cursor-pointer"
                  >
                    Update Transaction
                  </button>
                  <button
                    onClick={() => openForm(false)}
                    className="w-full bg-red-600 text-white py-2 px-4 rounded hover:red-blue-700 transition cursor-pointer"
                  >
                    cancel
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Statement;
