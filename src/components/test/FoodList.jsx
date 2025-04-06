import { useEffect, useState } from "react";
import axios from "axios";

const FoodList = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    // axios.get("http://127.0.0.1:8000/api/food-items/")

    axios.get("http://127.0.0.1:8000/api/products/")
      .then(response => setFoods(response.data))
      .catch(error => console.error("Error fetching data:", error));



  }, []);



  const createProduct = async()=>{
    const data = {
        "id": 3,
        "name": "Pasta",
        "details": {
            "price": 180,
            "size": "Regular",
            "ingredients": [
                "pasta",
                "olive oil",
                "garlic",
                "tomato sauce"
            ]
        }
    }
   const res = await  axios.post("http://127.0.0.1:8000/api/products/add/",data);



   console.log("res in create products ",res.data);

  }
  return (
    <div className="container mx-auto p-6">
        <button onClick={createProduct}>product create karo</button>
      <h1 className="text-3xl font-bold text-center mb-6">Delicious Food Items</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {foods.map(food => (
          <div key={food.id} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
            <img src={food.image} alt={food.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{food.name}</h2>
              <p className="text-gray-600 mt-2">{food.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-bold text-green-600">₹{food.price}</span>
                <span className="text-yellow-500 flex items-center">
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < food.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.5 3 1.5-6-4.5-4h5.5L10 2l2.5 6h5.5l-4.5 4 1.5 6z" />
                    </svg>
                  ))}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodList;




// import { useEffect, useState } from "react";
// import { menuService } from "../../api/services/menuService";

// const FoodList = () => {
//   const [foods, setFoods] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const getAllFoodMenu = async () => {
//     try {
//       const data = await menuService.getMenu();
//       if (data && data.length > 0) {
//         setFoods(data);
//       } else {
//         setFoods([]); 
//         setError("No food items available.");
//       }
//     } catch (error) {
//       console.error("Could not get the food:", error);
//       setError("Failed to fetch food items.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getAllFoodMenu();
//   }, []);

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold text-center mb-6">Delicious Food Items</h1>
      
//       {loading ? (
//         <p className="text-center text-gray-500">Loading...</p>
//       ) : error ? (
//         <p className="text-center text-red-500">{error}</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {foods.map((food) => (
//             <div key={food.id} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
//               <img src={food.image} alt={food.name} className="w-full h-48 object-cover" />
//               <div className="p-4">
//                 <h2 className="text-xl font-semibold">{food.name}</h2>
//                 <p className="text-gray-600 mt-2">{food.description}</p>
//                 <div className="flex justify-between items-center mt-4">
//                   <span className="text-lg font-bold text-green-600">₹{food.price}</span>
//                   <span className="text-yellow-500 flex items-center">
//                     {Array.from({ length: 5 }, (_, i) => (
//                       <svg
//                         key={i}
//                         className={`w-5 h-5 ${i < food.rating ? 'text-yellow-500' : 'text-gray-300'}`}
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                       >
//                         <path d="M10 15l-5.5 3 1.5-6-4.5-4h5.5L10 2l2.5 6h5.5l-4.5 4 1.5 6z" />
//                       </svg>
//                     ))}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FoodList;
