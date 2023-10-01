"use client";
import React, { useReducer } from "react";
import emailjs from "@emailjs/browser";
import styles from "./styles.module.css";

const INITIAL_STATE = {
  fullName: "",
  email: "",
  phone: "",
  message: "",
  contact: "",
  status: "IDLE",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "updateFieldValue":
      return { ...state, [action.field]: action.value };

    case "updateStatus":
      return { ...state, status: action.status };

    case "reset":
    default:
      return INITIAL_STATE;
  }
};

function ContactForm() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const updateFieldValue = (field) => (event) => {
    dispatch({
      type: "updateFieldValue",
      field,
      value: event.target.value,
    });
  };

  const setStatus = (status) => dispatch({ type: "updateStatus", status });

  const handleSubmit = (event) => {
    console.log("log", typeof event);

    event.preventDefault();
    setStatus("PENDING");

    emailjs
      .send(
        process.env.NEXT_PUBLIC_SERVICE_ID,
        process.env.NEXT_PUBLIC_TEMPLATE_ID,
        state,
        process.env.NEXT_PUBLIC_PUBLIC_KEY
      )
      .then(
        (response) => {
          setStatus("SUCCESS");
          // dispatch({ type: "reset" });
        },
        (err) => {
          console.log("FAILED...", err);
          setStatus("ERROR");
        }
      );
  };

  return (
    <div className={styles.section}>
      {state.status == "SUCCESS" && (
        <div className={styles.popup}>
          <p>Message Sent!</p>
          <button onClick={() => dispatch({ type: "reset" })}>Back</button>
        </div>
      )}
      {state.status == "ERROR" && (
        <div className={styles.popup}>
          <p>
            Something went wrong. Please try again or email
            contact@aaliyahrubio.com
          </p>
          <button onClick={() => setStatus("IDLE")}>Back</button>
        </div>
      )}
      {state.status != "SUCCESS" && state.status != "ERROR" && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="ENTER FULL NAME"
            name="fullName"
            required
            value={state.fullName}
            onChange={updateFieldValue("fullName")}
          />
          <input
            type="text"
            placeholder="ENTER EMAIL"
            name="email"
            required
            value={state.email}
            onChange={updateFieldValue("email")}
          />
          <input
            type="text"
            placeholder="ENTER PHONE NUMBER"
            name="phone"
            required
            value={state.phone}
            onChange={updateFieldValue("phone")}
          />
          <input
            type="text"
            placeholder="PREFERRED CONTACT METHOD"
            name="contact"
            value={state.contact}
            onChange={updateFieldValue("contact")}
          />
          <textarea
            rows="8"
            placeholder="MESSAGE"
            name="message"
            required
            value={state.message}
            onChange={updateFieldValue("message")}
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default ContactForm;
