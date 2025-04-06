import styles from "./MenuList.module.css";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
// import { MenuListItems } from "../data/MenuList";
import { useState, useMemo ,useEffect} from "react";
import axios from "axios";

function MenuList({ homeCategory }) {




  const [MenuListItems, setMenuListItems] = useState([]);


  const getAllMenuListItems = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/bulk/menu-items/");
      console.log("res of MenuListItems is ", res.data);

      if (res.data) {
        setMenuListItems(res.data);
      }

    } catch (error) {
      console.log("error is ",error)

      console.log("could not get the MenuListItems");
    }
  }

  useEffect(() => {
    getAllMenuListItems();
  }, [])


  const [filter, setFilter] = useState(homeCategory);
  const [sort, setSort] = useState("none");

  const filteredItems = useMemo(() => {
    let items = [...MenuListItems];
    console.log("item is ",items)

    if (filter !== "All") {
      items = items.filter((item) => item.category === filter);
    }

    if (sort === "price") {
      items.sort((a, b) => a.price - b.price);
    } else if (sort === "rating") {
      items.sort((a, b) => b.rating - a.rating);
    }

    return items;
  }, [filter, sort,MenuListItems]);

  return (
    <>
      <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg mb-4">
      
        <div>
          <label className="mr-2 font-semibold">Filter:</label>
          <select className="p-2 border rounded-md" onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All</option>
            {["Veg", "Non Veg", "Italian", "Dessert", "South Indian", "Soup", "Pizza", "Chinese", "Salad", "Special Thali", "Juice & Mocktails", "Momos", "Cakes"].map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mr-2 font-semibold">Sort By:</label>
          <select className="p-2 border rounded-md" onChange={(e) => setSort(e.target.value)}>
            <option value="none">None</option>
            <option value="price">Price (Low to High)</option>
            <option value="rating">Rating (High to Low)</option>
          </select>
        </div>
      </div>

      <div className={styles.menuListContainer}>
        {filteredItems.map((item) => (
          <Link
            to={`/menu/${item.id}`}
            key={item.id}
            className="relative group overflow-hidden rounded-xl shadow-lg bg-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
          >
            <div className={styles.DishContainer}>
              <div className={styles.categoryBadge} style={{ color: getCategoryColor(item.category) }}>
                {item.category}
              </div>

              <div className={styles.DishContent}>
                <h1>{item.name}</h1>
                <p className={styles.price}>
                  <LiaRupeeSignSolid /> {item.price} <span className={styles.perPiece}>({item.per_piece})</span>
                </p>
                <div className={styles.ratingBox}>
                  <span><FaStar color="white" size={14} /> {item.rating}</span>
                  <span>{item.views} reviews</span>
                </div>
                <p className={styles.description}>{item.description}</p>
              </div>

              <div className={styles.DishImage}>
                <img
                  src={item.image}
                  alt={item.name}
                  onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
                />
                <div className={styles.addCart}>
                  <span>-</span>
                  <span>0</span>
                  <span>+</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

const getCategoryColor = (category) => {
  const colors = {
    "Non Veg": "#e63946",
    "Veg": "#4caf50",
    "Italian": "#3f51b5",
  };
  return colors[category] || "#ff9800";
};

export default MenuList;



