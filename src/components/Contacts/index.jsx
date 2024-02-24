import { Link } from "react-router-dom";
import { SlSocialInstagram } from "react-icons/sl";
import { SiWhatsapp } from "react-icons/si";
import styles from "./index.module.css";

export const Contacts = () => {
  return (
    <section className={styles.contacts}>
      <div className={styles.links}>
        <h2 className="title">Contacts</h2>
        <Link className={styles.phone} to="tel:+49 999 999 99 99">
          +49 999 999 99 99
        </Link>
        <ul className={styles.media_list}>
          <li>
            <Link
              className={styles.media_item}
              to="https://www.linkedin.com/school/tel-ran-de/"
              target="_blank"
            >
              <SlSocialInstagram />
              <p>instagram</p>
            </Link>
          </li>
          <li>
            <Link
              className={styles.media_item}
              to="https://wa.me/+499999999999"
              target="_blank"
            >
              <SiWhatsapp />
              <p>WhatsApp</p>
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.address}>
        <h2 className="title">Address</h2>
        <address className={styles.address_wrapper}>
          <Link>
            <p className={styles.address_link}>Linkstraße 2, 8 OG, 10785,</p>
            <span className={styles.address_link}>Berlin, Deutschland</span>
          </Link>
        </address>
        <p className={styles.working_schedule}>Working Hours:</p>
        <p className={styles.working_time}>24 hours a day</p>
      </div>
    </section>
  );
};
