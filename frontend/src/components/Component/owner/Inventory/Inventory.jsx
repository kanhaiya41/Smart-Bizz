import React, { useState, useRef } from "react";
import "./Inventory.css";

const inventoryRecords = [
  {
    id: "REC-001",
    name: "Medicine Inventory",
    type: "PDF",
    size: "2.3 MB",
    actions: ["View", "Delete"]
  },
  {
    id: "REC-002",
    name: "Lab Test List",
    type: "Excel",
    size: "1.1 MB",
    actions: ["View", "Delete"]
  },
  {
    id: "REC-003",
    name: "Prescription Rules",
    type: "PDF",
    size: "900 KB",
    actions: ["View", "Delete"]
  },
  {
    id: "REC-004",
    name: "Inventory Backup",
    type: "ZIP",
    size: "5.4 MB",
    actions: ["View", "Delete"]
  },
  {
    id: "REC-005",
    name: "Pricing Sheet",
    type: "CSV",
    size: "650 KB",
    actions: ["View", "Delete"]
  },
  {
    id: "REC-006",
    name: "Supplier Details",
    type: "PDF",
    size: "1.8 MB",
    actions: ["View", "Delete"]
  },
  {
    id: "REC-007",
    name: "Bot Rules",
    type: "TXT",
    size: "120 KB",
    actions: ["View", "Delete"]
  },
  {
    id: "REC-008",
    name: "Monthly Report",
    type: "PDF",
    size: "3.2 MB",
    actions: ["View", "Delete"]
  },
  {
    id: "REC-009",
    name: "Stock Summary",
    type: "Excel",
    size: "2.0 MB",
    actions: ["View", "Delete"]
  },
  {
    id: "REC-010",
    name: "Customer FAQ",
    type: "DOCX",
    size: "700 KB",
    actions: ["View", "Delete"]
  }
];

const Inventory = () => {


  return (
        <div className="inventory-div">
        <div className="inventory-heading">
          <p>Documents</p>
        </div>

          <div className="inventory-doccumentdiv">
            <div className="fileInput">
              <div>
              <p>Drop your Documents</p>
               <p>.csv ,.pdf</p>
              <input type="file" />
              </div>

            </div>

            <div className="inventory-list">
              <div className="inventory-list-filter">
                 
                <p>Documents</p>
                <div className="inventory-list-filter-search">
                  <input type="search" placeholder="search" />               
                </div>
              </div>
              <div className="inventory-list-div">
              <div className="inventory-list-headings">
                <p>Record ID</p>
                <p>Record Name</p>
                <p>Record Type</p>
                <p>File Size</p>
                <p>Actions</p>
              </div>

<div className="inventory-list-items">
{inventoryRecords.map((item) => (
  <div className="inventory-list-items-card" key={item.id}>
    <p>{item.id}</p>
    <p>{item.name}</p>
    <p>{item.type}</p>
    <p>{item.size}</p>
    <p>
      {item.actions.map(action => (
        <button key={action}>{action}</button>
      ))}
    </p>
  </div>
))}

              </div>
              </div>

            </div>
          </div>
        </div>
     
  );
}

export default Inventory;