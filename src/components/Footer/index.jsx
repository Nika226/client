import React from "react";
import styles from "./index.module.css";
import { Contacts, Map } from "../";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <Contacts />
        <Map />
      </div>
    </footer>
  );
};
export default Footer;
