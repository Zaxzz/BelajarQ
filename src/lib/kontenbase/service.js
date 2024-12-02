import axios from "axios";

const fetchData = axios.create({
  baseURL: process.env.NEXT_PUBLIC_KONTENBASE_API_URL,
  timeout: 1000 * 60,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    Expires: 0,
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
  },
});

export const getData = async (collection) => {
  try {
    const response = await fetchData.get(collection);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const createData = async (collection, data) => {
  try {
    const response = await fetchData.post(collection, data);
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error;
  }
};

export const updateData = async (collection, id, data) => {
  try {
    const response = await fetchData.patch(`${collection}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

export const deleteData = async (collection, id) => {
  try {
    const response = await fetchData.delete(`${collection}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};
