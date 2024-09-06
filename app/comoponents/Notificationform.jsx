"use client";
import React, { useState, useEffect } from "react";
import Spinner from "../comoponents/Spinner";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";

export default function NotificationForm({ existingData }) {
  // console.log("existingData is",existingData)
  const [notification, setNotification] = useState({
    type: existingData?.type || "",
    image: existingData?.image || "",
    title: existingData?.title || "",
    message: existingData?.message || "",
    date: existingData?.date || "",
    notificationData: existingData?.notificationData || "",
    table: existingData?.table || [
      {
        id: 1,
        tableHeading: "",
        tableRow: [],
        tableCol: [],
        tableFooter: "",
      },
    ],
  });

  useEffect(() => {
    if (existingData) {
      setNotification({
        type: existingData.type || "normal",
        image: existingData.image || "",
        title: existingData.title || "",
        message: existingData.message || "",
        date: existingData.date || "",
        notificationData: existingData.notificationData || "",
        table: existingData.table || [
          {
            id: 1,
            tableHeading: "",
            tableRow: [],
            tableCol: [],
            tableFooter: "",
          },
        ],
      });
    }
  }, [existingData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotification((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTableChange = (e, tableId, rowId, colId) => {
    const { name, value } = e.target;
    setNotification((prev) => {
      const updatedtable = prev.table.map((table) =>
        table.id === tableId
          ? {
              ...table,
              tableRow: table.tableRow.map((row) =>
                row.id === rowId
                  ? {
                      ...row,
                      row: row.row.map((col) =>
                        col.id === colId ? { ...col, colData: value } : col
                      ),
                    }
                  : row
              ),
            }
          : table
      );
      return { ...prev, table: updatedtable };
    });
  };

  const handleAddRow = (tableId) => {
    setNotification((prev) => {
      const table = prev.table.find((t) => t.id === tableId);
      const newRowId = table.tableRow.length + 1;
      const newTable = {
        ...table,
        tableRow: [
          ...table.tableRow,
          {
            id: newRowId,
            row: table.tableCol.map((col) => ({ id: col.id, colData: "" })),
          },
        ],
      };
      return {
        ...prev,
        table: prev.table.map((t) => (t.id === tableId ? newTable : t)),
      };
    });
  };

  const handleAddCol = (tableId) => {
    setNotification((prev) => {
      const table = prev.table.find((t) => t.id === tableId);
      const newColId = table.tableCol.length + 1;
      const newTable = {
        ...table,
        tableCol: [...table.tableCol, { id: newColId, col: "" }],
        tableRow: table.tableRow.map((row) => ({
          ...row,
          row: [...row.row, { id: newColId, colData: "" }],
        })),
      };
      return {
        ...prev,
        table: prev.table.map((t) => (t.id === tableId ? newTable : t)),
      };
    });
  };

  const handleAddTable = () => {
    setNotification((prev) => ({
      ...prev,
      table: [
        ...prev.table,
        {
          id: prev.table.length + 1,
          tableHeading: "",
          tableRow: [],
          tableCol: [],
          tableFooter: "",
        },
      ],
    }));
  };

  const handleRemoveTable = (tableId) => {
    setNotification((prev) => ({
      ...prev,
      table: prev.table.filter((table) => table.id !== tableId),
    }));
  };

  const handleRemoveCol = (tableId, colId) => {
    setNotification((prev) => {
      const table = prev.table.find((t) => t.id === tableId);
      const newTable = {
        ...table,
        tableCol: table.tableCol.filter((col) => col.id !== colId),
        tableRow: table.tableRow.map((row) => ({
          ...row,
          row: row.row.filter((col) => col.id !== colId),
        })),
      };
      return {
        ...prev,
        table: prev.table.map((t) => (t.id === tableId ? newTable : t)),
      };
    });
  };

  const handleTableInputChange = (e, tableId) => {
    const { name, value } = e.target;
    setNotification((prev) => ({
      ...prev,
      table: prev.table.map((table) =>
        table.id === tableId ? { ...table, [name]: value } : table
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (existingData._id) {
        // If `notification.id` exists, we are updating an existing notification
        await axios.put(`/api/notification/${notification.title}`, notification); // Replace with your API URL
        alert("Notification updated successfully!");
      } else {
        // If `notification.id` does not exist, we are creating a new notification
        await axios.post("/api/notification", notification); // Replace with your API URL
        alert("Notification sent successfully!");
      }
    } catch (error) {
      console.error("Error sending notification:", error);
      alert("Failed to send notification");
    }
    
    console.log(notification);
  };
  

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      {/* Notification Basic Information */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <select
          name="type"
          value={notification.type}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        >
          <option value="">Select Type</option>
          <option value="normal">Normal</option>
          <option value="live">Live</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Image URL
        </label>
        <input
          type="text"
          name="image"
          value={notification.image}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={notification.title}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Message
        </label>
        <textarea
          name="message"
          value={notification.message}
          onChange={handleChange}
          rows="4"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          name="date"
          value={notification.date}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Notification Data
        </label>
        <input
          type="text"
          name="notificationData"
          value={notification.notificationData}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* Table Management */}
      {notification.table.map((table) => (
        <div
          key={table.id}
          className="mt-6 p-4 border border-gray-300 rounded-md"
        >
          <h2 className="text-lg font-semibold">Table {table.id}</h2>
          <button
            type="button"
            onClick={() => handleRemoveTable(table.id)}
            className="text-red-500 hover:text-red-700"
          >
            Remove Table
          </button>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Table Heading
            </label>
            <input
              type="text"
              name="tableHeading"
              value={table.tableHeading}
              onChange={(e) => handleTableInputChange(e, table.id)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Table Columns
            </label>
            {table.tableCol.map((col) => (
              <div key={col.id} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={col.col}
                  onChange={(e) =>
                    setNotification((prev) => ({
                      ...prev,
                      table: prev.table.map((t) =>
                        t.id === table.id
                          ? {
                              ...t,
                              tableCol: t.tableCol.map((c) =>
                                c.id === col.id
                                  ? { ...c, col: e.target.value }
                                  : c
                              ),
                            }
                          : t
                      ),
                    }))
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  placeholder="Column Name"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveCol(table.id, col.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove Column
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddCol(table.id)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Column
            </button>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Table Rows
            </label>
            {table.tableRow.map((row) => (
              <div key={row.id} className="mt-2">
                {row.row.map((cell) => (
                  <input
                    key={cell.id}
                    type="text"
                    value={cell.colData}
                    onChange={(e) =>
                      handleTableChange(e, table.id, row.id, cell.id)
                    }
                    className="mr-2 mt-1 block w-1/4 border border-gray-300 rounded-md shadow-sm"
                  />
                ))}
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddRow(table.id)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Row
            </button>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Table Footer
            </label>
            <input
              type="text"
              name="tableFooter"
              value={table.tableFooter}
              onChange={(e) => handleTableInputChange(e, table.id)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddTable}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Add Table
      </button>

      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
}
