import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Trash2, Eye, ClipboardList, BookOpen, PlusCircle } from "lucide-react";
import "./Inventory.css";
import { useApi } from "../../../api/useApi";
import businessOwnerApi from "../../../api/apiService";
import { toast } from "react-toastify";

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [inventoryRecords, setinventoryRecords] = useState([]);
  const [rulesheet, setRulesheet] = useState(null);

  const navigate = useNavigate();

  // API Hooks
  const { request: uploadInventory, loading: loadingUpload } = useApi(businessOwnerApi.uploadInventory);
  const { request: getAllInventory, loading } = useApi(businessOwnerApi.getInventory);
  const { request: delInventory } = useApi(businessOwnerApi.deleteInventory);

  // Sirf Inventory ke liye Upload Logic
  const handleSaveFile = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      await uploadInventory(formData);
      setRefresh((prev) => !prev);
      toast.success("Inventory uploaded successfully");
    } catch (err) {
      toast.error("Upload failed");
    }
  };

  const loadInventory = async () => {
    try {
      const res = await getAllInventory();
      setinventoryRecords(res?.data || []);
      setRulesheet(res?.rulesheet || null)
    } catch (error) {
      toast.error("Failed to load assets");
    }
  };

  useEffect(() => {
    loadInventory();
  }, [refresh]);

  const handleDeleteInventory = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await delInventory(id);
      toast.success("Deleted");
      loadInventory();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="inventory-div">
      <div className="inventory-header-section">
        <div className="inventory-heading-div">
          <div>
            <h1 className="page-main-title">Knowledge Center</h1>
            <p className="sub-text">Train your AI with business rules and inventory data</p>
          </div>
        </div>
      </div>

      <div className="upload-grid-double">
        {/* RULE SHEET */}
        {console.log("rulse", rulesheet)
        }
        {rulesheet ? (
          <div
            className="upload-card rules-border clickable-card"
            onClick={() => navigate("/owner/rule-sheet", { state: rulesheet })}
          >
            <div className="card-badge rules-bg">AI Training Rules</div>
            <div className="file-drop-area no-dash">
              <div className="icon-circle rules-icon">
                <BookOpen size={28} color="#f59e0b" />
              </div>
              <h3>Modify Rulesheet</h3>
              <p>Fill out the form to define business policies</p>
              <div className="go-btn-minimal">
                <PlusCircle size={18} /> <span>Modify Now</span>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="upload-card rules-border clickable-card"
            onClick={() => navigate("/owner/rule-sheet")}
          >
            <div className="card-badge rules-bg">AI Training Rules</div>
            <div className="file-drop-area no-dash">
              <div className="icon-circle rules-icon">
                <BookOpen size={28} color="#f59e0b" />
              </div>
              <h3>Add Rule Sheet</h3>
              <p>Fill out the form to define business policies</p>
              <div className="go-btn-minimal">
                <PlusCircle size={18} /> <span>Create Now</span>
              </div>
            </div>
          </div>
        )}

        {/* INVENTORY */}
        <div className="upload-card inventory-border">
          <div className="card-badge inventory-bg">Stock Data</div>
          <div className="file-drop-area">
            <input
              type="file"
              accept=".csv,.json"
              id="inventory-upload"
              onChange={handleSaveFile}
              hidden
            />
            <label htmlFor="inventory-upload" className="drop-label">
              <div className="icon-circle inventory-icon">
                {loadingUpload ? (
                  <div className="loader-mini"></div>
                ) : (
                  <ClipboardList size={28} color="#10b981" />
                )}
              </div>
              <h3>Upload Inventory</h3>
              <p>Import products via CSV or JSON file</p>
            </label>
          </div>
        </div>
      </div>


      {/* LIST SECTION */}
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
              placeholder="Search assets..."
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
            {loading ? (
              <div className="state-msg">Loading...</div>
            ) : (
              inventoryRecords
                .filter(item => item.name?.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((item, index) => (
                  <div className="inventory-row-card" key={item._id || index}>
                    <span className="id-text">{`REC-00${index + 1}`}</span>
                    <div className="name-with-icon">
                      <div className="category-indicator">
                        <BookOpen size={14} />
                      </div>
                      <div className="file-info-main">
                        <span className="file-name">{item.name}</span>
                        <span className="file-category-label">Asset</span>
                      </div>
                    </div>
                    <span className={`type-badge ${item.fileType?.toLowerCase() || 'other'}`}>{item.fileType || 'File'}</span>
                    <span className="size-text">{item.size || '0 KB'}</span>
                    <div className="action-buttons">
                      <button className="icon-btn view"><Eye size={16} /></button>
                      <button onClick={() => handleDeleteInventory(item?._id)} className="icon-btn delete"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;