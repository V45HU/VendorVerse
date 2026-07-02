import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

function PasswordInput({ value, onChange, placeholder = "Password" }) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="
          w-full
          rounded-2xl
          border
          border-slate-300
          px-5
          py-4
          outline-none
          focus:border-emerald-600
        "
      />

      <button
        type="button"
        onClick={() => setShow(!show)}
        className="
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          text-slate-500
        "
      >
        {show ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
}

export default PasswordInput;
