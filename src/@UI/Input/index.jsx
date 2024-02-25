import { forwardRef } from "react";
import styles from "./Index.module.css";

export const Input = forwardRef(
  (
    {
      min,
      step,
      name,
      type,
      content,
      error_style,
      placeholder,
      phoneInput,
      ...other
    },
    ref
  ) => {
    return (
      <input
        className={`${styles.input} ${styles[content]} ${styles[error_style]}`}
        step={step}
        min={min}
        ref={ref}
        type={type}
        name={name}
        placeholder={placeholder}
        {...phoneInput}
        {...other}
      />
    );
  }
);
