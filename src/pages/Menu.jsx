import Header from "../components/Home/Header";
import MenuList from "../components/Menu/MenuList";

function Menu({homeCategory}) {
    return<>
        <Header></Header>
        <MenuList homeCategory={homeCategory}></MenuList>
    </>
}
export default Menu;