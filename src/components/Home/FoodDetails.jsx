import { useNavigate, useParams } from "react-router-dom";
import { MdStar, MdOutlineDeliveryDining, MdTimer } from "react-icons/md";
import { BiDish } from "react-icons/bi";
import { IoMdHeartEmpty } from "react-icons/io";
import { MenuListItems } from "../data/MenuList";
import { useState } from "react";
import styles from "./FoodDetail.module.css";

function FoodDetail({ setCartItems }) {

  const navigate = useNavigate();




  // In your FoodDetail component
const handleOrderNow = () => {
  const orderData = {
    id: Math.floor(Math.random() * 1000000),
    name: foodItem.name,
    price: foodItem.price,
    image: foodItem.image,
    deliveryFee: 40,
    tax: Math.round(foodItem.price * 0.05), // 5% tax
    total: foodItem.price + 40 + Math.round(foodItem.price * 0.05),
    estimatedTime: 20 // minutes
  };
  
  navigate('/order-confirmation', { state: { order: orderData } });
};



  console.log("set card", setCartItems);
  const { id } = useParams();
  const foodItem = MenuListItems.find((item) => item.id === parseInt(id));

  const [count, setCount] = useState(0);
  const [AddtoCart, setAddtoCart] = useState(false);

  function setOnClickCart(foodItem) {
    handleOnCartAdd(foodItem);
    setAddtoCart(true);
  }

  function CountFunction(behaviour) {
    if (behaviour === "dec" && count > 0) {
      setCount(count - 1);
    } else if (behaviour === "inc") {
      setCount(count + 1);
    }
  }

  if (!foodItem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700">Product not found</h2>
          <p className="text-gray-500 mt-2">The food item you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }
  const handleOnCartAdd = (foodItem) => {
    setCartItems(foodItem, count, foodItem.id);
    setCount(0);
  }
  return <>

    {AddtoCart && <div className={styles.Cart}>
      <div>photo</div>
      <div>h</div>
      <div><button>close</button></div>
    </div>}

    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="md:flex">
          {/* Food Image */}
          <div className="md:w-1/2">
            <img
              src={foodItem.image || "https://via.placeholder.com/400"}
              alt={foodItem.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Food Details */}
          <div className="md:w-1/2 p-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{foodItem.name}</h1>
                <p className="text-gray-500 mt-1">{foodItem.category}</p>
              </div>
              <div className="flex items-center bg-purple-100 px-3 py-1 rounded-full">
                <MdStar className="text-yellow-400 mr-1" />
                <span className="font-medium">{foodItem.rating}</span>
              </div>
            </div>

            <p className="mt-6 text-gray-600">{foodItem.description}</p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <FoodInfo icon={<MdOutlineDeliveryDining />} label="Delivery" value={foodItem.deliveryFee === 0 ? "FREE" : `₹${foodItem.deliveryFee}`} />
              <FoodInfo icon={<MdTimer />} label="Prep Time" value={foodItem.preTime} />
              <FoodInfo icon={<BiDish />} label="Serving Size" value={foodItem.pre_piece} />
              <FoodInfo icon={<IoMdHeartEmpty />} label="Likes" value={foodItem.likes} />
            </div>

            <div className="mt-10 flex items-center justify-between">
              <div>
                <p className="text-gray-500">Price</p>
                <p className="text-3xl font-bold text-purple-600">₹{foodItem.price}</p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-200 rounded-full">
                  <button onClick={() => CountFunction("dec")} className="px-3 py-1 text-xl">-</button>
                  <span className="px-2">{count}</span>
                  <button onClick={() => CountFunction("inc")} className="px-3 py-1 text-xl">+</button>
                </div>

                <button
                  onClick={() => handleOrderNow()}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Ingredients and Nutrition */}
        <div className="p-8 border-t border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Ingredients & Nutrition</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <FoodSection title="Ingredients" list={foodItem.ingredients} />
            <NutritionInfo data={foodItem.nutrients} />
          </div>
        </div>
      </div>
    </div>
  </>
}

function FoodInfo({ icon, label, value }) {
  return (
    <div className="flex items-center">
      <div className="text-purple-600 text-xl mr-2">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}

function FoodSection({ title, list }) {
  return (
    <div>
      <h3 className="font-medium text-gray-700 mb-2">{title}</h3>
      <ul className="list-disc list-inside text-gray-600 space-y-1">
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function NutritionInfo({ data }) {
  return (
    <div>
      <h3 className="font-medium text-gray-700 mb-2">Nutritional Info</h3>
      <div className="space-y-2">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex justify-between">
            <span className="text-gray-600 capitalize">{key}:</span>
            <span className="font-medium">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoodDetail;
