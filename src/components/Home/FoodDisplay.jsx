import { Link } from "react-router-dom";
import { MdOutlineRemoveRedEye, MdStar } from "react-icons/md";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaChevronRight } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
// import { Category } from "../data/Category";

function FoodDisplay({handleOnClick}) {


const [Category, setCategory] = useState([]);


  const getAllCatagory= async ()=>{
    try {
      const res = await axios.get("http://127.0.0.1:8000/bulk/categories/");
      console.log("res of catagory is ",res.data);

      if(res.data){
        setCategory(res.data);
      }
    
    } catch (error) {
      
      console.log("could not get the catagory");
    }
  }

  useEffect(() => {
   getAllCatagory();
  }, [])
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
          Our Delicious Menu
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Category.map((item) => (
            <Link 
              // to={`/menu/${item.id}`} 
              onClick={() => handleOnClick(item.name)}
              to={"/menu"}
              key={item.id}
              className="relative group overflow-hidden rounded-xl shadow-lg bg-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10"></div>
              
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              <div className="p-4 relative z-20">
                <div className="flex items-center mb-2">
                  <VscWorkspaceTrusted className="text-green-500 mr-2" />
                  <h3 className="text-xl font-semibold text-white">{item.name}</h3>
                </div>
                
                <div className="flex justify-between items-center text-white/80">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <IoMdHeartEmpty className="mr-1" />
                      <span>{item.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <MdOutlineRemoveRedEye className="mr-1" />
                      <span>{item.views}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center bg-white/20 px-2 py-1 rounded-full">
                    <MdStar className="text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{item.rating}</span>
                  </div>
                </div>
                
                
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 mb-4">Craving more? Discover delicious surprises!</p>
          <Link 
            to="/menu" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:from-purple-700 hover:to-indigo-700"
          >
            Explore more
            <FaChevronRight className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FoodDisplay;