import { axiosInstance } from "../axiosInstance";

class MenuService {
  getMenu = async () => {
    try {
      const res = await axiosInstance.get("/api/food-items/");
      console.log("API Response:", res.data);
      console.log(res.data)
      return res.data;
    } catch (error) {
      console.error("Could not fetch menu:", error);
      return [];
    }
  };




}

export const menuService = new MenuService();
