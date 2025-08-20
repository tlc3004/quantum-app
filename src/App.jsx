import { useState } from "react";
import appData from "./json/appData.json";
import FullScreen from "./components/FullScreen";
import AppModal from "./components/AppModal";
import useSoundHook from "./hooks/UseSoundHook";

export default function App() {
  const [activeApp, setActiveApp] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalApp, setModalApp] = useState(null);
  const { triggerOpen, triggerClose } = useSoundHook();

  const handleOpenApp = (app) => {
    triggerOpen();
    setActiveApp(app);
  };

  const handleCloseApp = () => {
    triggerClose();
    setActiveApp(null);
  };

  return (
    <div className="h-screen w-full bg-gradient-to-r from-pink-400 via-purple-600 to-blue-500 overflow-hidden">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        LEON´OS 
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 border-white rounded">
        {appData.map((app, i) => (
          <div
            key={i}
            className={`cursor-pointer rounded-lg p-4 flex flex-col items-center justify-center transition transform hover:scale-105 ${app.color}`}
            onClick={() => handleOpenApp(app)}
          >
            <img
              src={app.logo}
              alt={app.label}
              className="w-12 sm:w-16 h-12 sm:h-16 mb-2"
            />
            <div className="font-semibold text-center text-sm sm:text-base text-white">
              {app.label}
            </div>
          </div>
        ))}
      </div>

      {activeApp && (
        <FullScreen
          app={activeApp}
          onClose={handleCloseApp}
          onShowModal={(app) => {
            setModalApp(app);
            setModalOpen(true);
          }}
        />
      )}

      {modalApp && (
        <AppModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          app={modalApp}
        />
      )}
    </div>
  );
}
