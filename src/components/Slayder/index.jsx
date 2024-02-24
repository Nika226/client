import React from "react";
import styles from "./index.module.css";

const Slayder = () => {
  return (
    <div className={styles.slayder}>
      <div className={styles.sleft}>
        <h1>Amazing Discounts on Garden Products!</h1>
        <div>
          <button className={styles.slayderbtn}>CHECK OUT</button>
        </div>
      </div>
    </div>
  );
};

export default Slayder;
