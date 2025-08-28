const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API}${path}`);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export const fetchPlaces = async () => get<any[]>("/places");
export const fetchFoods = async () => get<any[]>("/foods");
export const fetchFestivals = async () => get<any[]>("/festivals");
