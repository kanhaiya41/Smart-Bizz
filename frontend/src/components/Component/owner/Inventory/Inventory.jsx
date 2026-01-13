import React, { useState } from "react";
import { FileText, Search, Trash2, Eye, UploadCloud, FileSpreadsheet } from "lucide-react";
import "./Inventory.css";

const inventoryRecords = [
  { id: "REC-001", name: "Medicine Inventory", type: "PDF", size: "2.3 MB" },
  { id: "REC-002", name: "Lab Test List", type: "Excel", size: "1.1 MB" },
  { id: "REC-003", name: "Prescription Rules", type: "PDF", size: "900 KB" },
  { id: "REC-004", name: "Inventory Backup", type: "ZIP", size: "5.4 MB" },
  { id: "REC-005", name: "Pricing Sheet", type: "CSV", size: "650 KB" },
  { id: "REC-006", name: "Supplier Details", type: "PDF", size: "1.8 MB" },
];

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="inventory-div">
      <div className="inventory-header-section">
        <div className="inventory-heading">
          <h1>Document Library</h1>
          <p>Manage and organize your business inventory files</p>
        </div>
      </div>

      <div className="inventory-main-grid">
        {/* UPLOAD SECTION */}
        <div className="upload-card">
          <div className="file-drop-area">
            <input type="file" id="file-upload" hidden />
            <label htmlFor="file-upload" className="drop-label">
              <div className="icon-circle">
                <UploadCloud size={32} color="#4f46e5" />
              </div>
              <h3>Click or Drag to Upload</h3>
              <p>Supports .CSV, .PDF, .XLSX (Max 10MB)</p>
            </label>
          </div>
        </div>

        {/* LIST SECTION */}
        <div className="inventory-content-card">
          <div className="inventory-list-filter">
            <div className="filter-text">
              <h3>All Documents</h3>
              <span className="count-tag">{inventoryRecords.length} Files</span>
            </div>
            <div className="search-box-modern">
              <Search size={18} color="#94a3b8" />
              <input
                type="text"
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="table-container">
            <div className="table-header-grid">
              <span>Record ID</span>
              <span>Name</span>
              <span>Type</span>
              <span>Size</span>
              <span className="text-center">Actions</span>
            </div>

            <div className="inventory-scroll-area">
              {inventoryRecords.map((item) => (
                <div className="inventory-row-card" key={item.id}>
                  <span className="id-text">{item.id}</span>
                  <div className="name-with-icon">
                    {item.type === "Excel" || item.type === "CSV" ? (
                      <FileSpreadsheet size={18} color="#10b981" />
                    ) : (
                      <FileText size={18} color="#ef4444" />
                    )}
                    <span className="file-name">{item.name}</span>
                  </div>
                  <span>
                    <span className={`type-badge ${item.type.toLowerCase()}`}>
                      {item.type}
                    </span>
                  </span>
                  <span className="size-text">{item.size}</span>
                  <div className="action-buttons">
                    <button className="icon-btn view" title="View"><Eye size={16} /></button>
                    <button className="icon-btn delete" title="Delete"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;