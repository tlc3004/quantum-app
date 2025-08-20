// src/components/AppFrame.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FullScreen from "./FullScreen";
import AppModal from "./AppModal";

export default function AppFrame({ appsData }) {
  const [activeApp, setActiveApp] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  if (!open || !appsData) return null;

  return (
    <div className="p-8 grid grid-cols-5 gap-6">
      {appsData.map((app, i) => (
        <div
          key={i}
          className="cursor-pointer rounded-lg shadow-lg p-4 flex flex-col items-center justify-center hover:scale-105 transition-transform bg-gray-800 text-white"
          onClick={() => setActiveApp(app)}
        >
          <img
            src={`/logos/${app.logo}`}
            alt={app.label}
            className="w-16 h-16 mb-2"
          />
          <span className="font-bold">{app.label}</span>
        </div>
      ))}

      {/* FullScreen iframe */}
      <AnimatePresence>
        {activeApp && (
          <FullScreen
            app={activeApp}
            onClose={() => setActiveApp(null)}
            onShowModal={() => setModalOpen(true)}
          />
        )}
      </AnimatePresence>

      {/* Modal de cálculos cuánticos */}
      <AnimatePresence>
        {modalOpen && <AppModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
