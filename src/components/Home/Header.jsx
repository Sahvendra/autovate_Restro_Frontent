import { useState } from 'react';
import styles from './Header.module.css';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function Header() {
    const [input , setInput] = useState(''); 
    
    const handleOnChangeInput = (value) => {
        setInput(value);
        
    }

    const handleOnClickSearch = () => {
        console.log(input);
    }
    return (
        <>
            <div className={styles.navbarContainer}>
                <div className={styles.navBar}>
                    <div>Logo</div>
                    <div className={styles.searchBar}>
                        <input onChange={(e) => handleOnChangeInput(e.target.value)} type="text" placeholder="What are you looking for?" />
                        <button onClick={handleOnClickSearch}><FaMagnifyingGlass /></button>
                    </div>
                    <div className={styles.routes}>
                        <Link to="/">Home</Link>
                        <Link to="/menu">Menu</Link>
                        <Link to="/cart">Cart</Link>
                        <Link to="/order">Order</Link>
                        <Link to="/history">History</Link>
                    </div>
                    {/* <div className={styles.userProfile}>

                        <Link to={"/signup"}>
                            Signup</Link>

                        <Link to={"/login"}>
                            Login</Link>
                    </div> */}

                    
                </div>
            </div>

            <center className={styles.messageContainer}>
                <h1>Welcome!</h1>
                <p>What are you in the mood to eat today?</p>
                <p>Are you craving sweet, savory, spicy, or maybe a little bit of everything?</p>
            </center>
        </>
    );
}

export default Header;

















/*

import { useState } from 'react';
import Fuse from 'fuse.js';
import styles from './Header.module.css';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const data = ["Pizza", "Burger", "Pasta", "Sushi", "Sandwich", "Salad", "Noodles", "Tacos", "Soup", "Fries"];

const fuse = new Fuse(data, {
    keys: ["name"],
    includeScore: true,
    threshold: 0.3, // Adjust for more/less fuzzy matching
});

function Header() {
    const [input, setInput] = useState('');
    const [results, setResults] = useState([]);
    
    const handleOnChangeInput = (value) => {
        setInput(value);
        if (value.trim() !== "") {
            const fuzzyResults = fuse.search(value).map(result => result.item);
            setResults(fuzzyResults);
        } else {
            setResults([]);
        }
    };

    const handleOnClickSearch = () => {
        console.log(input);
    };
    
    return (
        <>
            <div className={styles.navbarContainer}>
                <div className={styles.navBar}>
                    <div>Logo</div>
                    <div className={styles.searchBar}>
                        <input onChange={(e) => handleOnChangeInput(e.target.value)} type="text" placeholder="What are you looking for?" value={input} />
                        <button onClick={handleOnClickSearch}><FaMagnifyingGlass /></button>
                    </div>
                    {results.length > 0 && (
                        <ul className={styles.searchResults}>
                            {results.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    )}
                    <div className={styles.routes}>
                        <Link to="/">Home</Link>
                        <Link to="/menu">Menu</Link>
                        <Link to="/cart">Cart</Link>
                        <Link to="/order">Order</Link>
                        <Link to="/history">History</Link>
                    </div>
                    <div className={styles.userProfile}>
                        <Link to={"/signup"}>Signup</Link>
                        <Link to={"/login"}>Login</Link>
                    </div>
                </div>
            </div>
            <center className={styles.messageContainer}>
                <h1>Welcome!</h1>
                <p>What are you in the mood to eat today?</p>
                <p>Are you craving sweet, savory, spicy, or maybe a little bit of everything?</p>
            </center>
        </>
    );
}

export default Header;

*/