// src/components/ResultSidebar.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import useSoundHook from "../hooks/UseSoundHook";
import LeonOS from "./LeonOS";

export default function ResultToast({ show, app, onClose }) {
  const { triggerToast } = useSoundHook();

  useEffect(() => {
    if (show) triggerToast();
  }, [show, triggerToast]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 right-0 h-full w-80 sm:w-96 bg-gray-900 text-white shadow-xl z-50 flex flex-col"
        >
          {/* Header */}
          <div className="flex inset-0 justify-between items-center px-4 py-3 border-b border-gray-700">
            <h2 className="font-bold text-lg">{app.label} — Datos</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition"
            >
              ✖
            </button>
          </div>

          {/* Contenido dinámico */}
          <div className="flex-1 overflow-y-auto p-4">
            <LeonOS A={app.A} L={app.L} C={app.C} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
