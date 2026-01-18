import React, { useEffect, useState } from "react";
import { FileText, Search, Trash2, Eye, UploadCloud, FileSpreadsheet, BookOpen, ClipboardList } from "lucide-react";
import "./Inventory.css";
import { useApi } from "../../../api/useApi";
import businessOwnerApi from "../../../api/apiService";
import { toast } from "react-toastify";

// const inventoryRecords = [
//   { id: "REC-001", name: "Medicine Inventory", type: "PDF", size: "2.3 MB", category: "Inventory" },
//   { id: "REC-002", name: "Refund Policy v1", type: "PDF", size: "1.1 MB", category: "Rulesheet" },
//   { id: "REC-003", name: "Prescription Rules", type: "PDF", size: "900 KB", category: "Rulesheet" },
//   { id: "REC-004", name: "Pricing Sheet", type: "CSV", size: "650 KB", category: "Inventory" },
// ];

const Inventory = () => {
const [searchTerm, setSearchTerm] = useState("");
const [refresh, setRefresh] = useState(false);
const [inventoryRecords , setinventoryRecords] = useState([])
const {
  request: uploadInventory,
  loading:loadingUpload,
  error:errorUpload
} = useApi(businessOwnerApi.uploadInventory);

 const {
  request: getAllInventory,
  loading,
  error
} =   useApi(businessOwnerApi.getInventory)

const handleSaveFile = async (e) => {
  const selectedFile = e.target.files[0];

  if (!selectedFile) {
    alert("Please select a file");
    return;
  }

  if (selectedFile.size > 10 * 1024 * 1024) {
    alert("File too large (max 10MB)");
    return;
  }

  const formData = new FormData();
  formData.append("file", selectedFile);
  try {
    await uploadInventory(formData);
    setRefresh((prev)=>!prev)
    toast.success("Inventory uploaded successfully");

  } catch (err) {
    console.error(err);
  }
};

useEffect(() => {
  const loadInventory = async () => {
    try {
      const res = await getAllInventory();
      setinventoryRecords(res?.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load inventory");
    }
  };

  const timer = setTimeout(loadInventory, 1000);
  return () => clearTimeout(timer);
}, [refresh]);



useEffect(()=>{
  const loadInventory = async ()=>{
  try {
    const res = await getAllInventory()
    setinventoryRecords(res?.data)
  } catch (error) {
    console.log(error);
    toast.error("Internal Server Error")
    
  }
  }
loadInventory()
} , [refresh])


  return (
    <div className="inventory-div">
      <div className="inventory-header-section">
        <div className="inventory-heading">
          <h1>Knowledge Center</h1>
          <p>Train your AI by uploading business rules and inventory data</p>
        </div>
      </div>

      {/* TWO TYPES OF UPLOAD SECTIONS */}
      <div className="upload-grid-double">
        {/* CATEGORY 1: RULES SHEETS */}
        <div className="upload-card rules-border">
          <div className="card-badge rules-bg">AI Training Rules</div>
          <div className="file-drop-area">
            <input type="file" id="rules-upload" hidden />
            <label htmlFor="rules-upload" className="drop-label">
              <div className="icon-circle rules-icon">
                <BookOpen size={28} color="#f59e0b" />
              </div>
              <h3>Upload Rulesheets</h3>
              <p>Bot will learn your business policies</p>
            </label>
          </div>
        </div>

        {/* CATEGORY 2: INVENTORY FILES */}
        <div className="upload-card inventory-border">
          <div className="card-badge inventory-bg">Stock Data</div>
          <div className="file-drop-area">
            <input type="file" accept=".csv, .json" id="inventory-upload" onChange={handleSaveFile} hidden />
            <label htmlFor="inventory-upload" className="drop-label">
              <div className="icon-circle inventory-icon">
                <ClipboardList size={28} color="#10b981" />
              </div>
              <h3>Upload Inventory</h3>
              <p>Bot will learn about your products</p>
            </label>
          </div>
        </div>
      </div>

      {/* LIST SECTION */}
     
    {loadingUpload && (
  <div className="state-msg">
    <div className="loader-mini"></div> Uploading...
  </div>
)}
       {!loadingUpload && !errorUpload &&  (
      <div className="inventory-content-card">
        <div className="inventory-list-filter">
          <div className="filter-text">
            <h3>Library Assets</h3>
            <span className="count-tag">{inventoryRecords?.length} Documents</span>
          </div>
          <div className="search-box-modern">
            <Search size={18} color="#94a3b8" />
            <input
              type="text"
              placeholder="Search by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="table-container">
          <div className="table-header-grid">
            <span>ID</span>
            <span>Name & Category</span>
            <span>Type</span>
            <span>Size</span>
            <span className="text-center">Actions</span>
          </div>

<div className="inventory-scroll-area">

  {loading && (
    <div className="state-msg">
      <div className="loader-mini"></div> Loading...
    </div>
  )}

  {!loading && error && (
    <div className="state-msg">Error: {error}</div>
  )}

  {!loading && !error && inventoryRecords.length === 0 && (
    <div className="state-msg">No Inventory Found</div>
  )}

  {!loading && !error && inventoryRecords.length > 0 && (
    inventoryRecords
      .filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((item, index) => (
        <div className="inventory-row-card" key={item._id || index}>
          <span className="id-text">{`REC-00${index + 1}`}</span>

          <div className="name-with-icon">
            <div className="category-indicator">
              <BookOpen size={14} />
            </div>

            <div className="file-info-main">
              <span className="file-name">{item.name}</span>
              <span className="file-category-label">{item.name}</span>
            </div>
          </div>

          <span className={`type-badge ${item.fileType?.toLowerCase()}`}>
            {item.fileType}
          </span>

          <span className="size-text">{item.size}</span>

          <div className="action-buttons">
            <button className="icon-btn view">
              <Eye size={16} />
            </button>
            <button className="icon-btn delete">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))
  )}

</div>

        </div>
      </div>
         )}   
       

    </div>
  );
};

export default Inventory;