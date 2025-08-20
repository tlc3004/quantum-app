import { motion } from "framer-motion";

export default function FullScreen({ app, onClose, onShowModal }) {
  if (!app) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-screen h-screen bg-black z-50 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col sm:flex-row justify-between p-4 bg-gray-900 text-white gap-2 sm:gap-0">
        <span className="font-bold text-sm sm:text-base">{app.label}</span>
        <div className="flex gap-2 sm:gap-4 mt-2 sm:mt-0">
          <button
            onClick={() => onShowModal(app)}
            className="px-2 py-1 sm:px-3 sm:py-1 bg-blue-600 rounded hover:bg-blue-700 text-xs sm:text-sm"
          >
            Ver cálculos
          </button>
          <button
            onClick={onClose}
            className="px-2 py-1 sm:px-3 sm:py-1 bg-red-600 rounded hover:bg-red-700 text-xs sm:text-sm"
          >
            Cerrar
          </button>
        </div>
      </div>

      <iframe
        src={app.url}
        className="flex-1 w-full h-full"
        style={{ border: "none" }}
        title={app.label}
      />
    </motion.div>
  );
}
