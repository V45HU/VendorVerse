import { useEffect, useState } from "react";
import { Save, RotateCcw } from "lucide-react";

import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import LoadingState from "../../components/Dashboard/LoadingState";

import { vendorMenu } from "../../components/Dashboard/dashboardMenus";
import {
  createVendorProfile,
  getMyVendorProfile,
  updateVendorProfile,
} from "../../services/vendorServices";

const initialForm = {
  businessName: "",
  category: "",
  city: "",
  address: "",
  phone: "",
  whatsapp: "",
  email: "",
  website: "",
  description: "",
  profileImage: "",
  coverImage: "",
  experience: "",
  startingPrice: "",
  responseTime: "",
  languages: "",
  services: "",
  workingHours: "",
  instagram: "",
  facebook: "",
  youtube: "",
  latitude: "",
  longitude: "",
};

const toTextList = (value) => {
  if (!Array.isArray(value)) return "";

  return value.join(", ");
};

const toArray = (value) => {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const normalizeForm = (vendor) => ({
  businessName: vendor.businessName || "",
  category: vendor.category || "",
  city: vendor.city || "",
  address: vendor.address || "",
  phone: vendor.phone || "",
  whatsapp: vendor.whatsapp || "",
  email: vendor.email || "",
  website: vendor.website || "",
  description: vendor.description || "",
  profileImage: vendor.profileImage || "",
  coverImage: vendor.coverImage || "",
  experience: vendor.experience ?? "",
  startingPrice: vendor.startingPrice ?? "",
  responseTime: vendor.responseTime || "",
  languages: toTextList(vendor.languages),
  services: toTextList(vendor.services),
  workingHours: vendor.workingHours || "",
  instagram: vendor.instagram || "",
  facebook: vendor.facebook || "",
  youtube: vendor.youtube || "",
  latitude: vendor.latitude ?? "",
  longitude: vendor.longitude ?? "",
});

const textInputClass =
  "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100";

function Field({ label, name, value, onChange, type = "text", required }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <input
        className={textInputClass}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        required={required}
      />
    </label>
  );
}

function TextArea({ label, name, value, onChange, rows = 4, required }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <textarea
        className={`${textInputClass} resize-none`}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        required={required}
      />
    </label>
  );
}

function Section({ title, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <div className="mt-6 grid gap-5 md:grid-cols-2">{children}</div>
    </section>
  );
}

function VendorBusinessProfile() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadProfile = async () => {
    setLoading(true);
    setError("");

    try {
      const vendor = await getMyVendorProfile();
      setForm(normalizeForm(vendor));
      setHasProfile(true);
    } catch (error) {
      if (error.response?.status === 404) {
        setForm(initialForm);
        setHasProfile(false);
      } else {
        setError(error.response?.data?.message || "Unable to load profile.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadProfile();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    const payload = {
      ...form,
      experience: Number(form.experience) || 0,
      startingPrice: Number(form.startingPrice) || 0,
      latitude: Number(form.latitude) || 0,
      longitude: Number(form.longitude) || 0,
      languages: toArray(form.languages),
      services: toArray(form.services),
    };

    try {
      const saveProfile = hasProfile
        ? updateVendorProfile
        : createVendorProfile;
      const { vendor } = await saveProfile(payload);

      setForm(normalizeForm(vendor));
      setHasProfile(true);
      setSuccess(
        hasProfile
          ? "Business profile updated."
          : "Business profile created successfully.",
      );
    } catch (error) {
      setError(error.response?.data?.message || "Unable to save profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  return (
    <DashboardLayout menuItems={vendorMenu}>
      <DashboardHeader
        title={hasProfile ? "Business Profile" : "Create Business Profile"}
        description={
          hasProfile
            ? "Keep your listing details accurate for customers."
            : "Register your business to activate your vendor dashboard and public listing."
        }
        action={
          <button
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            onClick={loadProfile}
            type="button"
          >
            <RotateCcw size={18} />
            Reset
          </button>
        }
      />

      {!hasProfile && !error && (
        <div className="mb-6 border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">
          You do not have a registered business account yet. Complete the
          required details below to create one.
        </div>
      )}

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

      <form className="space-y-6" onSubmit={handleSubmit}>
        <Section title="Business Details">
          <Field
            label="Business Name"
            name="businessName"
            value={form.businessName}
            onChange={handleChange}
            required
          />
          <Field
            label="Category"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          />
          <Field
            label="City"
            name="city"
            value={form.city}
            onChange={handleChange}
            required
          />
          <Field
            label="Address"
            name="address"
            value={form.address}
            onChange={handleChange}
          />
          <TextArea
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
          <TextArea
            label="Services"
            name="services"
            value={form.services}
            onChange={handleChange}
            rows={3}
          />
        </Section>

        <Section title="Contact">
          <Field
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <Field
            label="WhatsApp"
            name="whatsapp"
            value={form.whatsapp}
            onChange={handleChange}
          />
          <Field
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
          />
          <Field
            label="Website"
            name="website"
            value={form.website}
            onChange={handleChange}
            type="url"
          />
        </Section>

        <Section title="Listing Media">
          <Field
            label="Profile Image URL"
            name="profileImage"
            value={form.profileImage}
            onChange={handleChange}
            type="url"
          />
          <Field
            label="Cover Image URL"
            name="coverImage"
            value={form.coverImage}
            onChange={handleChange}
            type="url"
          />
        </Section>

        <Section title="Operations">
          <Field
            label="Experience"
            name="experience"
            value={form.experience}
            onChange={handleChange}
            type="number"
          />
          <Field
            label="Starting Price"
            name="startingPrice"
            value={form.startingPrice}
            onChange={handleChange}
            type="number"
          />
          <Field
            label="Response Time"
            name="responseTime"
            value={form.responseTime}
            onChange={handleChange}
          />
          <Field
            label="Working Hours"
            name="workingHours"
            value={form.workingHours}
            onChange={handleChange}
          />
          <Field
            label="Languages"
            name="languages"
            value={form.languages}
            onChange={handleChange}
          />
        </Section>

        <Section title="Social & Location">
          <Field
            label="Instagram"
            name="instagram"
            value={form.instagram}
            onChange={handleChange}
            type="url"
          />
          <Field
            label="Facebook"
            name="facebook"
            value={form.facebook}
            onChange={handleChange}
            type="url"
          />
          <Field
            label="YouTube"
            name="youtube"
            value={form.youtube}
            onChange={handleChange}
            type="url"
          />
          <Field
            label="Latitude"
            name="latitude"
            value={form.latitude}
            onChange={handleChange}
            type="number"
          />
          <Field
            label="Longitude"
            name="longitude"
            value={form.longitude}
            onChange={handleChange}
            type="number"
          />
        </Section>

        <div className="flex justify-end">
          <button
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300"
            disabled={saving}
            type="submit"
          >
            <Save size={18} />
            {saving
              ? hasProfile
                ? "Saving..."
                : "Creating..."
              : hasProfile
                ? "Save Profile"
                : "Create Business Profile"}
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
}

export default VendorBusinessProfile;
