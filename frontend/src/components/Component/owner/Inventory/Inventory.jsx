import React, { useState, useRef } from "react";
import "./Inventory.css";

const Inventory = () => {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Mock Data: Existing History
  const [inventoryList, setInventoryList] = useState([
    { id: 1, name: "Menu_Oct_2023.pdf", date: "Oct 24, 2023", size: "1.2 MB", status: "Processed" },
    { id: 2, name: "Wine_List_v2.pdf", date: "Oct 20, 2023", size: "0.8 MB", status: "Processed" },
    { id: 3, name: "Specials_Weekend.pdf", date: "Oct 15, 2023", size: "2.4 MB", status: "Failed" },
  ]);

  // 1. Trigger the hidden file input
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // 2. Handle File Selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type !== "application/pdf") {
        alert("Please upload a PDF file.");
        return;
      }
      startUploadSimulation(file);
    }
  };

  // 3. Simulate a professional upload progress
  const startUploadSimulation = (file) => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          completeUpload(file);
          return 100;
        }
        return prev + 10;
      });
    }, 200); // Speed of simulation
  };

  // 4. Finalize Upload
  const completeUpload = (file) => {
    setTimeout(() => {
      const newItem = {
        id: inventoryList.length + 1,
        name: file.name,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        status: "Processed", // Assumed success for demo
      };
      setInventoryList([newItem, ...inventoryList]);
      setIsUploading(false);
      setUploadProgress(0);
    }, 500);
  };

  const handleDelete = (id) => {
    setInventoryList(inventoryList.filter((item) => item.id !== id));
  };

  return (
    <div className="dashboard-container">
      {/* --- HEADER --- */}
      <header className="page-header">
        <div className="header-text">
          <h1>Inventory Management</h1>
          <p>Upload and manage your PDF menus and stock lists.</p>
        </div>
        
        {/* The Action Button */}
        <button className="btn-new-inventory" onClick={handleUploadClick} disabled={isUploading}>
          {isUploading ? `Uploading ${uploadProgress}%...` : "+ New Inventory"}
        </button>

        {/* Hidden Input for File Selection */}
        <input
          type="file"
          accept="application/pdf"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </header>

      {/* --- PROGRESS BAR (Visible only when uploading) --- */}
      {isUploading && (
        <div className="upload-bar-container">
          <div className="upload-bar-fill" style={{ width: `${uploadProgress}%` }}></div>
        </div>
      )}

      {/* --- MAIN CONTENT: HISTORY TABLE --- */}
      <div className="table-card">
        <div className="card-header">
          <h3>Upload History</h3>
        </div>
        
        {inventoryList.length > 0 ? (
          <table className="modern-table">
            <thead>
              <tr>
                <th width="40%">FILE NAME</th>
                <th width="20%">DATE UPLOADED</th>
                <th width="15%">SIZE</th>
                <th width="15%">STATUS</th>
                <th width="10%">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {inventoryList.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="file-info">
                      <span className="file-icon">📄</span>
                      <span className="file-name">{item.name}</span>
                    </div>
                  </td>
                  <td>{item.date}</td>
                  <td>{item.size}</td>
                  <td>
                    <span className={`status-pill ${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <button className="icon-btn delete" onClick={() => handleDelete(item.id)} title="Delete">
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <p>No inventory files uploaded yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;