function CartList() {
    return<>
     <div className={styles.topContent}>
                  <div className={styles.ImageCart}>f</div>
    
                  <div className={styles.ContentCart}>
                    <p className={styles.itemNameInCart}>Item Name</p>
                    <p className={styles.itemContentInCart}>Content2</p>
                    <p className={styles.itemContentInCart}>Quantity</p>
                    <p className={styles.removeFromCart}>Remove</p>
                  </div>
    
                  <div className={styles.PriceCart}>
                    <span>93</span>
                  </div>
                </div>
    
                <div className={styles.bottonContent}></div>
    </>
}
export default CartList;