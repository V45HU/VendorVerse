import { useState } from "react";

function QuotationModal({ booking, onClose, onSubmit }) {
  if (!booking) return null;

  const [quotation, setQuotation] = useState(booking.quotation || "");

  const [vendorNotes, setVendorNotes] = useState(booking.vendorNotes || "");

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl w-full max-w-xl p-8">
        <h2 className="text-3xl font-bold mb-8">Send Quotation</h2>

        <div className="space-y-6">
          <input
            type="number"
            placeholder="Quotation Amount"
            value={quotation}
            onChange={(e) => setQuotation(e.target.value)}
            className="w-full border rounded-xl p-4"
          />

          <textarea
            rows="5"
            placeholder="Vendor Notes"
            value={vendorNotes}
            onChange={(e) => setVendorNotes(e.target.value)}
            className="w-full border rounded-xl p-4"
          />
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button onClick={onClose} className="px-6 py-3 rounded-xl border">
            Cancel
          </button>

          <button
            onClick={() => onSubmit(quotation, vendorNotes)}
            className="px-6 py-3 rounded-xl bg-emerald-600 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuotationModal;
