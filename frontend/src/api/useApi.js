import { useState } from "react";

export const useApi = (apiFn) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const res = await apiFn(...args);
      console.log(res.status);
      console.log(res);
      
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { request, loading, error };
};
