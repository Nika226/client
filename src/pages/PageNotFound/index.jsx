import React from "react";
import styles from "./index.module.css";
import four from "../../assets/images/four.svg";
import foundnot from "../../assets/images/foundnot.png";

const PageNotFound = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.found_img}>
        <img src={four} alt="" />
        <img src={foundnot} alt="" />
        <img src={four} alt="" />
      </div>
      <div className={styles.text_one}>
        <p>Page Not Found</p>
      </div>
      <div className={styles.text_two}>
        <p>
          We’re sorry, the page you requested could not be found. Please go back
          to the homepage.
        </p>
        <div>
          <button className={styles.btn}>Go Home</button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
