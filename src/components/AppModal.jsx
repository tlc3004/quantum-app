import { motion } from "framer-motion";
import { useEffect } from "react";
import LeonOS from "./LeonOS";
import useSoundHook from "../hooks/UseSoundHook";

export default function AppModal({ open, onClose, app }) {
  const { triggerToast } = useSoundHook();

  useEffect(() => {
    if (open) triggerToast();
  }, [open, triggerToast]);

  if (!open || !app) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-2 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gray-900 text-white rounded-xl p-4 sm:p-6 w-full max-w-sm sm:max-w-md"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg sm:text-xl font-bold">{app.label} — Datos Cuanticos</h2>
          <button onClick={onClose} className="text-gray-300 text-sm sm:text-base">
            ✖
          </button>
        </div>

        <LeonOS A={app.A} L={app.L} C={app.C} />
      </motion.div>
    </motion.div>
  );
}
