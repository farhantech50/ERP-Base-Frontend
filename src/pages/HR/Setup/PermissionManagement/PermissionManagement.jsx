import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";
import { toast } from "react-toastify";
import DataTable from "../../../../components/DataTable";
import PageLoader from "../../../../components/PageLoader";
import usePermission from "../../../../hooks/usePermission";
import { useAuthStore } from "../../../../store/authStore";
import { usePermissionStore } from "../../../../store/permissionStore";
import { usePaginationStore } from "../../../../store/paginationStore";
import CustomModal from "../../../../components/CustomModal";

const PermissionManagement = () => {
  const { getAllPermissions, createPermission, updatePermission, deletePermission, loading } = usePermission();
  const { authUser } = useAuthStore();
  const { permissions: storePermissions } = usePermissionStore();
  const { setTotalData, search, page, limit } = usePaginationStore();
  const [permissions, setPermissions] = useState([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ key: "", label: "" });

  const fetchPermissions = async () => {
    const res = await getAllPermissions(page, limit, search);
    if (res.success) {
      setPermissions(res.data.data);
      setTotalData(res.data.total);
    } else {
      toast.error(res.message);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, [page, limit, search]);

  const handleOpenModal = (permission = null) => {
    if (permission) {
      setEditingId(permission.id);
      setFormData({ key: permission.key, label: permission.label || "" });
    } else {
      setEditingId(null);
      setFormData({ key: "", label: "" });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ key: "", label: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.key.trim()) {
      toast.error("Permission key is required");
      return;
    }

    const formattedKey = formData.key.trim().toUpperCase().replace(/\s+/g, '_');
    const dataToSubmit = { key: formattedKey, label: formData.label.trim() };

    let res;
    if (editingId) {
      res = await updatePermission(editingId, dataToSubmit);
    } else {
      res = await createPermission(dataToSubmit);
    }

    if (res.success) {
      toast.success(editingId ? "Permission updated" : "Permission created");
      handleCloseModal();
      fetchPermissions();
    } else {
      toast.error(res.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this permission? This may break parts of the application that rely on it.")) {
      const res = await deletePermission(id);
      if (res.success) {
        toast.success(res.message);
        fetchPermissions();
      } else {
        toast.error(res.message);
      }
    }
  };

  const tableHead = [
    "Key",
    "Label",
    "Action",
  ];

  const columnMapping = {
    Key: "key",
    Label: "label",
  };

  const columnAlignment = {
    Key: "left",
    Label: "left",
    Action: "center",
  };

  const ACTION_BUTTONS = [
    {
      show: () => {
        return Boolean(
          storePermissions?.includes("SUPER") ||
          storePermissions?.includes("UPDATE_PERMISSION")
        );
      },
      icon: <FaEdit className="text-blue-500 w-5 h-5" />,
      onClick: (row) => handleOpenModal(row),
      label: "Edit Permission",
    },
    {
      show: () => {
        return Boolean(
          storePermissions?.includes("SUPER") ||
          storePermissions?.includes("DELETE_PERMISSION")
        );
      },
      icon: <FaTrash className="text-red-500 w-5 h-5" />,
      onClick: (row) => handleDelete(row.id),
      label: "Delete Permission",
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-4 w-full">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Permission Management</h1>
          <p className="text-sm text-gray-500">Create and manage application permissions.</p>
        </div>
        {(storePermissions?.includes("SUPER") ||
          storePermissions?.includes("CREATE_PERMISSION")) && (
          <button
            onClick={() => handleOpenModal()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-button-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-button-primary-hover hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary-300"
          >
            <MdAddCircle className="w-5 h-5" />
            Add Permission
          </button>
        )}
      </div>

      <DataTable
        tableHead={tableHead}
        tableData={permissions}
        columnMapping={columnMapping}
        columnAlignment={columnAlignment}
        loading={loading}
        headerConfig={{
          title: "Permission List",
          searchPlaceholder: "Search Permissions by Key or Label...",
        }}
        actionButtonsConfig={ACTION_BUTTONS}
      />

      <CustomModal
        open={isModalOpen}
        setOpen={handleCloseModal}
        header={editingId ? "Edit Permission" : "Add Permission"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Permission Key <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="key"
              value={formData.key}
              onChange={handleChange}
              placeholder="e.g. CREATE_INVOICE"
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
              required
            />
            <p className="text-xs text-gray-400 mt-1">
              Keys are auto-formatted to uppercase with underscores.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Label (Optional)
            </label>
            <input
              type="text"
              name="label"
              value={formData.label}
              onChange={handleChange}
              placeholder="e.g. Can create invoices"
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-primary-600 rounded-xl hover:bg-primary-700 transition"
            >
              {editingId ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </CustomModal>
    </div>
  );
};

export default PermissionManagement;
