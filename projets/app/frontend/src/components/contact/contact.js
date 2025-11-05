import React, { useState, useRef } from "react"
import emailjs from '@emailjs/browser'
import { useNavigate } from "react-router-dom";
import "../../styles/contact/contact.css"


function Contact() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const [messageSentSuccess, setMessageSentSuccess] = useState("")

  const navigate = useNavigate()

  const form = useRef()

  const sendEmail = (e) => {
    //e.preventDefault();
    setIsSending(true);
    setMessageSentSuccess("")
    emailjs
      .sendForm('service_hzuqqon', 'template_t04ahse', form.current, {
        publicKey: 'ZUxpgQcPrb62n7aPg',
      })
      .then(
        () => {

          console.log('SUCCESS!');
          console.log("Message envoyé !!!")
          setFirstName("");
          setLastName("");
          setEmail("");
          setSubject("");
          setMessage("");
          setMessageSentSuccess("✅ Votre message a bien été envoyé.")
          setIsSending(false);
        },
        (error) => {
          console.log('FAILED...', error.text);
          setMessageSentSuccess("❌ Une erreur est survenue. Veuillez réessayer plus tard.")
        },
      );
  };

  return (
    <div className="main">
      <div className="contact_big_frame">

        <div className="contact_frame">
          <p className="red_title">Formulaire de contact</p>
          <form ref={form}>
            <div className="formGroup_frame">
              <label htmlFor="firstName" className="black_text contact_form_label">Prénom:</label>
              <input onChange={(e) => setFirstName(e.target.value)} className="contact_form_short_input" value={firstName} type="text" id="firstName" name="sender_firstname" placeholder="Prénom" />
            </div>
            <div className="formGroup_frame">
              <label htmlFor="lastName" className="black_text contact_form_label">Nom:</label>
              <input onChange={(e) => setLastName(e.target.value)} className="contact_form_short_input" value={lastName} type="text" id="lastName" name="sender_lastname" placeholder="Nom" />
            </div>
            <div className="formGroup_frame">
              <label htmlFor="email" className="black_text contact_form_label">Email:</label>
              <input onChange={(e) => setEmail(e.target.value)} className="contact_form_medium_input" value={email} type="email" id="emai" name="sender_email" placeholder="adresse@email.com" />
            </div>
            <div className="formGroup_frame">
              <label htmlFor="subject" className="black_text contact_form_label">Sujet:</label>
              <input onChange={(e) => setSubject(e.target.value)} className="contact_form_large_input" value={subject} type="text" id="subject" name="subject" placeholder="Sujet" />
            </div>
            <div className="formGroup_frame">
              <label htmlFor="message" className="black_text contact_form_label">Message:</label>
              <textarea onChange={(e) => setMessage(e.target.value)} className="contact_form_large_text_input" value={message} type="textarea" id="message" name="message" placeholder="Votre message" />
            </div>
          </form>
          <p className="sentSuccessfullMessage">{messageSentSuccess}</p>
          <div className="button_frame">
            <button
              disabled={isSending || firstName=="" || lastName=="" || email=="" || subject=="" || message==""}
              className="contact_form_button contact_form_button_send"
              onClick={() => sendEmail()} >
              {isSending ? "Envoi en cours..." : "Envoyer"}
            </button>
          </div>
        </div>
      </div>
    </div>

  )
};

export default Contact;