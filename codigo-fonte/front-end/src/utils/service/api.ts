import axios from "axios";

export const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_SERVER ||
    "https://pmv-ads-2024-1-e5-proj-empext-t2-sistema.onrender.com",
});
