import { FaPhoneAlt, FaMapPin, FaBoxOpen, FaList } from "react-icons/fa";
import { IoMdGift } from "react-icons/io";
import { FaQuestion, FaCartShopping } from "react-icons/fa6";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <>
      <hr />
      <div className={styles.Footer}>
        {/* About Us Section */}
        <div className={styles.FooterSection}>
          <h3>ABOUT US</h3>
          <ul>
            <li>OUR STORY</li>
            <li>OUR CHEFS</li>
            <li>SUSTAINABILITY</li>
            <li>FRANCHISE</li>
          </ul>
        </div>

        {/* Customer Support Section */}
        <div className={styles.FooterSection}>
          <h3>CUSTOMER SUPPORT</h3>
          <ul>
            <li>
              <FaPhoneAlt />
              CONTACT US
            </li>
            <li>
              <FaMapPin />
              FIND A STORE
            </li>
            <li>
              <FaBoxOpen />
              ORDER TRACKING
            </li>
            <li>
              <FaQuestion />
              FAQs
            </li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div className={styles.FooterSection}>
          <h3>QUICK LINKS</h3>
          <ul>
            <li>
              <FaList />
              MENU
            </li>
            <li>
              <IoMdGift />
              OFFERS & DISCOUNTS
            </li>
            <li>
              <FaCartShopping />
              ORDER NOW
            </li>
            <li>
              TERMS & PRIVACY
            </li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div className={styles.FooterSection}>
          <h3>NEWSLETTER</h3>
          <p>Subscribe to get the latest updates</p>
          <form>
            <input 
              type="email" 
              placeholder="Enter your email" 
              required 
              aria-label="Email for newsletter subscription"
            />
            <button type="submit">SUBSCRIBE</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Footer;