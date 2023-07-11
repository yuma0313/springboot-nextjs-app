// utils/fetcher.ts
import Cookie from "universal-cookie";

const cookie = new Cookie();

const fetcher = async (url: RequestInfo, options: RequestInit = {}) => {
  const token = cookie.get("JSESSIONID");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    throw new Error("An error occurred while fetching the data.");
  }

  try {
    return await response.json();
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return null;
  }
};

export default fetcher;
