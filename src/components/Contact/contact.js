
import React, { useState } from "react";
import contactData from "./contactdata";
import "./contact.css";

const initialForm = {
  name: "",
  company: "",
  phone: "",
  email: "",
  service: "",
  message: "",
};

function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setStatus("");
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/enquiries/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            company: form.company,
            phone: form.phone,
            email: form.email,
            service: form.service,
            message: form.message,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Enquiry submission failed");
      }

      setStatus("success");
      setForm(initialForm);
    } catch (error) {
      console.error("Enquiry error:", error);
      setStatus("error");
    }
  };


  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <div className="contact-intro">
          <span className="contact-eyebrow">
            {contactData.eyebrow}
          </span>

          <h2>{contactData.title}</h2>

          <p className="contact-description">
            {contactData.description}
          </p>

          <div className="contact-details">
            {contactData.details.map((detail) => (
              <div className="contact-detail" key={detail.id}>
                <span className="contact-detail-label">
                  {detail.label}
                </span>

                {detail.href ? (
                  <a href={detail.href}>
                    {detail.value}
                  </a>
                ) : (
                  <span>{detail.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="contact-form-card">
          <h3>{contactData.form.title}</h3>

          <form onSubmit={handleSubmit}>
            <div className="contact-form-grid">
              <div className="contact-field">
                <label htmlFor="contact-name">
                  Full Name *
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  maxLength={100}
                  required
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-company">
                  Company Name
                </label>
                <input
                  id="contact-company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  placeholder="Enter your company name"
                  value={form.company}
                  onChange={handleChange}
                  maxLength={150}
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-phone">
                  Phone Number *
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Enter your phone number"
                  value={form.phone}
                  onChange={handleChange}
                  pattern="[+]?[0-9 ()-]{10,20}"
                  title="Enter a valid phone number"
                  required
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-email">
                  Business Email *
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={handleChange}
                  maxLength={254}
                  required
                />
              </div>
            </div>

            <div className="contact-field">
              <label htmlFor="contact-service">
                {contactData.form.serviceLabel} *
              </label>

              <select
                id="contact-service"
                name="service"
                value={form.service}
                onChange={handleChange}
                required
              >
                <option value="">
                  {contactData.form.servicePlaceholder}
                </option>

                {contactData.form.services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            <div className="contact-field">
              <label htmlFor="contact-message">
                Your Requirements *
              </label>

              <textarea
                id="contact-message"
                name="message"
                placeholder="Describe your requirement, quantity or project details..."
                rows={5}
                value={form.message}
                onChange={handleChange}
                minLength={10}
                maxLength={3000}
                required
              />
            </div>

            <button className="contact-submit" type="submit">
              {contactData.form.submitText}
              <span aria-hidden="true">→</span>
            </button>

            {status && (
              <p className="contact-status" role="status">
                {status}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
