import Header from "../components/Home/Header";
import FoodDisplay from "../components/Home/FoodDisplay";
import Footer from "../components/Home/Footer";

function Home({handleOnClick}) {

    return <>
        <Header></Header>
        <FoodDisplay handleOnClick={handleOnClick}></FoodDisplay>
        <Footer></Footer>
    </>
}
export default Home;