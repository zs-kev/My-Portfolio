"use client";

import SquareButton from "@/components/buttons/squareButton/SquareButton";
import Input from "@/components/forms/input/Input";
import Label from "@/components/forms/label/Label";
import Textarea from "@/components/forms/textarea/Textarea";
import { useState } from "react";
import styles from "./page.module.css";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  return (
    <>
      <section className={`${styles.getInTouch} max-width-wrapper`}>
        <div className={styles.wrapper}>
          <div className={styles.introContainer}>
            <h1>Get in Touch</h1>
            <p>
              I am here to answer any questions you may have and create an
              effective solution for your instructional needs.
            </p>
          </div>
          <div className={styles.formContainer}>
            <form className={styles.form}>
              <div className={`${styles.name} ${styles.inputContainer}`}>
                <Input
                  type="text"
                  required
                  placeholder="Your Name"
                  name="name"
                  value={name}
                  error={false}
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                />
                <Label htmlFor="name" error={false} floatingLabel>
                  Your Name<sup>*</sup>
                </Label>
              </div>
              <div className={`${styles.email} ${styles.inputContainer}`}>
                <Input
                  type="email"
                  required
                  placeholder="Your Email"
                  name="email"
                  value={email}
                  error={false}
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus={false}
                />
                <Label htmlFor="email" error={false} floatingLabel>
                  Your Email<sup>*</sup>
                </Label>
              </div>
              <div className={`${styles.phone} ${styles.inputContainer}`}>
                <Input
                  type="tel"
                  pattern="[0-9]{1}[0-9]{9}"
                  required
                  placeholder="Phone Number"
                  name="number"
                  value={number}
                  error={false}
                  id="number"
                  onChange={(e) => setNumber(e.target.value)}
                  autoFocus={false}
                />
                <Label htmlFor="number" error={false} floatingLabel>
                  Phone Number<sup>*</sup>
                </Label>
              </div>
              <div className={`${styles.subject} ${styles.inputContainer}`}>
                <Input
                  type="text"
                  required
                  placeholder="Subject"
                  name="subject"
                  value={subject}
                  error={false}
                  id="subject"
                  onChange={(e) => setSubject(e.target.value)}
                  autoFocus={false}
                />
                <Label htmlFor="subject" error={false} floatingLabel>
                  Subject<sup>*</sup>
                </Label>
              </div>
              <div className={`${styles.message} ${styles.inputContainer}`}>
                <Textarea
                  required
                  placeholder="Message"
                  name="message"
                  value={message}
                  error={false}
                  id="message"
                  autoFocus={false}
                  rows={5}
                  cols={5}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Label htmlFor="message" error={false} floatingLabel>
                  Message<sup>*</sup>
                </Label>
              </div>
              <div className={styles.button}>
                <SquareButton buttonStyle="filled" type="submit">
                  Submit
                </SquareButton>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
