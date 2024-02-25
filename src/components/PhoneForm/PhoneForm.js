import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { CSSTransition } from "react-transition-group";
import Button from "../../@UI/Button/index.jsx";
import Input from "../../@UI/Input/index.jsx";
import Alert from "../Alert/index.jsx";
import styles from "./PhoneForm.module.css";

export const PhoneForm = ({
  contentInput,
  placeholderInput,
  contentButton,
  textButton,
  message,
  content,
  alertText,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const onSubmit = (data) => {
    console.log(data);
    setShowMessage(true);
  };

  const [showMessage, setShowMessage] = useState(false);
  const oferRef = useRef(null);

  const phoneInput = register("phone", {
    required: "field must be filled",
    pattern: {
      value: /^\+?\d{7,11}$/,
      message: "phone number format 7 to 11 digits",
    },
  });

  const active = errors.phone && "active";

  return (
    <>
      <form className={styles.offer_form} onSubmit={handleSubmit(onSubmit)}>
        <p className={`${styles.error} ${styles[content]}  ${styles[active]}`}>
          {errors.phone?.message}
        </p>
        <Input
          content={contentInput}
          error_style={errors.phone && "error"}
          placeholder={placeholderInput}
          {...phoneInput}
        />

        <Button content={contentButton} text={textButton} type="submit" />
      </form>
      <CSSTransition
        in={showMessage}
        nodeRef={oferRef}
        timeout={300}
        classNames="alert"
        unmountOnExit
      >
        <Alert
          ref={oferRef}
          text={alertText}
          content={content}
          message={message}
          setShowMessage={setShowMessage}
        />
      </CSSTransition>
    </>
  );
};
