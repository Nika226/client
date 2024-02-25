import React from "react";
import styles from "./index.module.css";
import { Contacts, Map } from "../";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <Contacts />
        <Map />
      </div>
    </footer>
  );
};
export default Footer;
