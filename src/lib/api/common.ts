export const BASE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:5124/api";

export const LoanStatus = {
    Pending: "Pendiente",
    Completed: "Completado",
    Late: "Tarde",
} as const;
