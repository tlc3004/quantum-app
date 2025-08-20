import { useEffect, useState } from "react";

export default function LeonOS({ A, L, C }) {
  const [y, setY] = useState(null);
  const [t, setT] = useState(0);
  const [loading, setLoading] = useState(false);



  useEffect(() => {
  const interval = setInterval(() => {
    setT(prev => prev + 0.1);
  }, 100);

  return () => clearInterval(interval);
}, []); // solo se ejecuta al montar

useEffect(() => {
  if (A == null || L == null || C == null) return;
  let mounted = true;

  const fetchY = async (currentT) => {
    try {
      const res = await fetch("https://leonos-backend-d9el05yx7-antonio-martin-leon-chongs-projects.vercel.app/api/compute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ t: currentT, A, L, C }),
      });
      const data = await res.json();
      if (!mounted) return;
      setY(data.y);
    } catch (err) {
      console.error("fetch compute error", err);
      if (mounted) setY(0);
    }
  };

  // Solo activar loading la primera vez
  if (y === null) setLoading(true);

  fetchY(t).finally(() => mounted && setLoading(false));

  const interval = setInterval(() => {
    setT((prev) => prev + 0.1);
  }, 100);

  return () => {
    mounted = false;
    clearInterval(interval);
  };
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [A, L, C, t]); 


  if (loading) {
    return <div className="p-4 text-gray-300 text-center">Calculando...</div>;
  }

  const progress = Math.min(100, ((y ?? 0) / Math.max(1e-6, A + C)) * 100);

  return (
    <div className="p-4 bg-gray-800 rounded-lg text-white">
      <h3 className="font-bold mb-2 text-center">tiempo real de estabilidad del qubit</h3>
      <div className="mb-2 text-center">
        A: {A} — L: {L} — C: {C}
      </div>
      <div className="text-lg font-semibold mb-3 text-center">
        t: {t.toFixed(2)} — y(t): {y != null ? y.toFixed(5) : "--"}
      </div>
      <div className="h-3 w-full bg-gray-700 rounded overflow-hidden">
        <div
          className="h-3 rounded transition-all duration-100"
          style={{ width: `${progress}%`, background: "#34d399" }}
        />
      </div>
    </div>
  );
}
