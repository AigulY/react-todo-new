import React from 'react';
import emailjs from 'emailjs-com';
import styles from './ContactPage.module.css';

const ContactForm = () => {
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      e.target,
      process.env.REACT_APP_EMAILJS_USER_ID
    )
    .then((result) => {
        alert('Message sent successfully!');
        e.target.reset();
    }, (error) => {
        alert('Failed to send the message, please try again.');
    });
  };

  return (
    <div className={styles.contactPage}>
      <form onSubmit={sendEmail} className={styles.contactForm}>
        <h2>Contact Us</h2>
        <div className={styles.formGroup}>
          <label htmlFor="user_name">Name</label>
          <input type="text" name="user_name" id="user_name" className={styles.input} placeholder="Your full name" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="user_email">Email</label>
          <input type="email" name="user_email" id="user_email" className={styles.input} placeholder="example@domain.com" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="message">Message</label>
          <textarea name="message" id="message" rows="4" className={`${styles.input} ${styles.textarea}`} placeholder="Your message here" required></textarea>
        </div>
        <div className={styles.contactButton}>
          <button type="submit" className={styles.button}>Send</button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
