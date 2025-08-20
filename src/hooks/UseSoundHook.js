// src/hooks/UseSoundHook.js
import useSound from "use-sound";

export default function useSoundHook() {
  const [playOpen] = useSound("/sounds/ui-sound.mp3", { volume: 0.5 });
  const [playClose] = useSound("/sounds/off.mp3", { volume: 0.5 });
  const [playToast] = useSound("/sounds/ui-sound-on.mp3", { volume: 0.5 });

  const triggerOpen = () => playOpen();
  const triggerClose = () => playClose();
  const triggerToast = () => playToast();

  return { triggerOpen, triggerClose, triggerToast };
}
