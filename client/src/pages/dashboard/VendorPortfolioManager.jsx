import { useEffect, useState } from "react";
import { ImagePlus, Pencil, Save, Trash2, X } from "lucide-react";

import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import EmptyState from "../../components/Dashboard/EmptyState";
import LoadingState from "../../components/Dashboard/LoadingState";

import { vendorMenu } from "../../components/Dashboard/dashboardMenus";
import {
  createPortfolioItem,
  deletePortfolioItem,
  getMyPortfolio,
  updatePortfolioItem,
} from "../../services/portfolioDashboardService";

const emptyForm = {
  title: "",
  imageUrl: "",
  description: "",
};

const inputClass =
  "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100";

function PortfolioForm({
  form,
  saving,
  editingItem,
  onChange,
  onCancel,
  onSubmit,
}) {
  return (
    <form
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      onSubmit={onSubmit}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            {editingItem ? "Edit Portfolio Item" : "Add Portfolio Item"}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Showcase work that helps customers understand your style.
          </p>
        </div>

        {editingItem && (
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50"
            onClick={onCancel}
            title="Cancel edit"
            type="button"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Title</span>
          <input
            className={inputClass}
            name="title"
            value={form.title}
            onChange={onChange}
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Image URL</span>
          <input
            className={inputClass}
            name="imageUrl"
            value={form.imageUrl}
            onChange={onChange}
            required
            type="url"
          />
        </label>

        <label className="block md:col-span-2">
          <span className="text-sm font-semibold text-slate-700">
            Description
          </span>
          <textarea
            className={`${inputClass} resize-none`}
            name="description"
            value={form.description}
            onChange={onChange}
            rows={3}
          />
        </label>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300"
          disabled={saving}
          type="submit"
        >
          <Save size={18} />
          {saving ? "Saving..." : editingItem ? "Update Item" : "Add Item"}
        </button>
      </div>
    </form>
  );
}

function PortfolioCard({ item, onEdit, onDelete, deletingId }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="aspect-[4/3] bg-slate-100">
        <img
          alt={item.title}
          className="h-full w-full object-cover"
          src={item.imageUrl}
        />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
              {item.description || "No description added."}
            </p>
          </div>

          <div className="flex shrink-0 gap-2">
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50"
              onClick={() => onEdit(item)}
              title="Edit portfolio item"
              type="button"
            >
              <Pencil size={17} />
            </button>

            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-red-100 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:text-red-300"
              disabled={deletingId === item._id}
              onClick={() => onDelete(item._id)}
              title="Delete portfolio item"
              type="button"
            >
              <Trash2 size={17} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function VendorPortfolioManager() {
  const [portfolio, setPortfolio] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadPortfolio = async () => {
    setLoading(true);
    setError("");

    try {
      const items = await getMyPortfolio();
      setPortfolio(items);
    } catch (error) {
      setError(error.response?.data?.message || "Unable to load portfolio.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadPortfolio();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingItem(null);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setForm({
      title: item.title || "",
      imageUrl: item.imageUrl || "",
      description: item.description || "",
    });
    setSuccess("");
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      if (editingItem) {
        const { portfolio: updatedItem } = await updatePortfolioItem(
          editingItem._id,
          form,
        );

        setPortfolio((items) =>
          items.map((item) =>
            item._id === updatedItem._id ? updatedItem : item,
          ),
        );
        setSuccess("Portfolio item updated.");
      } else {
        const { portfolio: newItem } = await createPortfolioItem(form);
        setPortfolio((items) => [newItem, ...items]);
        setSuccess("Portfolio item added.");
      }

      resetForm();
    } catch (error) {
      setError(error.response?.data?.message || "Unable to save portfolio.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (portfolioId) => {
    const shouldDelete = window.confirm(
      "Delete this portfolio item permanently?",
    );

    if (!shouldDelete) return;

    setDeletingId(portfolioId);
    setError("");
    setSuccess("");

    try {
      await deletePortfolioItem(portfolioId);
      setPortfolio((items) => items.filter((item) => item._id !== portfolioId));

      if (editingItem?._id === portfolioId) {
        resetForm();
      }

      setSuccess("Portfolio item deleted.");
    } catch (error) {
      setError(error.response?.data?.message || "Unable to delete item.");
    } finally {
      setDeletingId("");
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  return (
    <DashboardLayout menuItems={vendorMenu}>
      <DashboardHeader
        title="Portfolio"
        description="Manage the work samples customers see on your vendor profile."
        action={
          <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700">
            <ImagePlus size={18} />
            {portfolio.length} Items
          </div>
        }
      />

      {(error || success) && (
        <div
          className={`mb-6 rounded-xl border px-4 py-3 font-medium ${
            error
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-emerald-200 bg-emerald-50 text-emerald-700"
          }`}
        >
          {error || success}
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <PortfolioForm
          editingItem={editingItem}
          form={form}
          onCancel={resetForm}
          onChange={handleChange}
          onSubmit={handleSubmit}
          saving={saving}
        />

        {portfolio.length === 0 ? (
          <EmptyState
            title="No Portfolio Items"
            description="Add your first project to make your listing more convincing."
          />
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {portfolio.map((item) => (
              <PortfolioCard
                key={item._id}
                deletingId={deletingId}
                item={item}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default VendorPortfolioManager;
