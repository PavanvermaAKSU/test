import React, { useEffect, useRef, useState } from "react";
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

// ---- Head office map (edit here) ----
const MAP = {
  label: "Head Office on Google Maps",
  lat: 28.7394887,
  lng: 77.1471396,
  zoom: 16,
  link:
    "https://maps.app.goo.gl/dW3jE67qqj97zLJa6",
};
const MAP_SRC = `https://maps.google.com/maps?q=${MAP.lat},${MAP.lng}&z=${MAP.zoom}&output=embed`;

const STATUS_TEXT = {
  loading: "Sending your enquiry...",
  success: "Thank you! Your enquiry has been sent. Our team will contact you soon.",
  error: "We couldn't send your enquiry. Please check your details and try again.",
};

// Mobile/phone numbers are not shown in the contact details list.
const isPhoneDetail = (d) =>
  /phone|mobile|call/i.test(`${d.id} ${d.label}`) || /^tel:/i.test(d.href || "");

function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("");
  const [popup, setPopup] = useState(null); // { type: "success" | "error", name, service }
  const popupBtnRef = useRef(null);

  const closePopup = () => setPopup(null);

  // Popup: focus the button, close on Esc, lock page scroll while open
  useEffect(() => {
    if (!popup) return undefined;
    const onKey = (e) => e.key === "Escape" && closePopup();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    popupBtnRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [popup]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
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
          headers: { "Content-Type": "application/json" },
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

      setStatus("");
      setPopup({
        type: "success",
        name: form.name.trim().split(" ")[0],
        service: form.service,
      });
      setForm(initialForm);
    } catch (error) {
      console.error("Enquiry error:", error);
      setStatus("");
      setPopup({ type: "error" });
    }
  };

  return (

    <section className="contact-section" id="contact">
      <div className="contact-container">
        <div className="contact-intro">
          <span className="contact-eyebrow">{contactData.eyebrow}</span>

          <h2>{contactData.title}</h2>

          <p className="contact-description">{contactData.description}</p>

          <div className="contact-details">
            {contactData.details
              .filter((detail) => !isPhoneDetail(detail))
              .map((detail) => (
                <div className="contact-detail" key={detail.id}>
                  <span className="contact-detail-label">{detail.label}</span>

                  {detail.href ? (
                    <a href={detail.href}>{detail.value}</a>
                  ) : (
                    <span>{detail.value}</span>
                  )}
                </div>
              ))}
          </div>

          {/* Map sits directly below the address */}
          <div className="contact-map">
            <iframe
              title="Head office location map"
              src={MAP_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <a
              className="contact-map-link"
              href={MAP.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Google Maps
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <div className="contact-form-card">
          <h3>{contactData.form.title}</h3>

          <form onSubmit={handleSubmit}>
            <div className="contact-form-grid">
              <div className="contact-field">
                <label htmlFor="contact-name">Full Name *</label>
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
                <label htmlFor="contact-company">Company Name</label>
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
                <label htmlFor="contact-phone">Phone Number *</label>
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
                <label htmlFor="contact-email">Business Email *</label>
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
                <option value="">{contactData.form.servicePlaceholder}</option>

                {contactData.form.services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            <div className="contact-field">
              <label htmlFor="contact-message">Your Requirements *</label>

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

            <button
              className="contact-submit"
              type="submit"
              disabled={status === "loading"}
            >
              {contactData.form.submitText}
              <span aria-hidden="true">→</span>
            </button>

            {status === "loading" && (
              <p className="contact-status" role="status" aria-live="polite">
                {STATUS_TEXT.loading}
              </p>
            )}
          </form>
        </div>
      </div>

      {popup && (
        <div className="cp-overlay" onClick={closePopup}>
          <div
            className={`cp-modal cp-modal--${popup.type}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cp-title"
            aria-describedby="cp-desc"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="cp-close"
              aria-label="Close message"
              onClick={closePopup}
            >
              <span aria-hidden="true">×</span>
            </button>

            <div className="cp-icon" aria-hidden="true">
              {popup.type === "success" ? (
                <svg viewBox="0 0 52 52">
                  <circle className="cp-ring" cx="26" cy="26" r="23" />
                  <path className="cp-tick" d="M15 27l8 8 15-17" />
                </svg>
              ) : (
                <svg viewBox="0 0 52 52">
                  <circle className="cp-ring" cx="26" cy="26" r="23" />
                  <path className="cp-tick" d="M18 18l16 16M34 18L18 34" />
                </svg>
              )}
            </div>

            {popup.type === "success" ? (
              <>
                <h3 id="cp-title">
                  Thank you{popup.name ? `, ${popup.name}` : ""}!
                </h3>
                <p id="cp-desc">
                  Your enquiry has been sent successfully. Our team will review
                  it and contact you shortly.
                </p>
                {popup.service && (
                  <span className="cp-chip">{popup.service}</span>
                )}
              </>
            ) : (
              <>
                <h3 id="cp-title">Enquiry not sent</h3>
                <p id="cp-desc">
                  Something went wrong while sending your enquiry. Your details
                  are still in the form, so please try again.
                </p>
              </>
            )}

            <button
              ref={popupBtnRef}
              type="button"
              className="contact-submit cp-btn"
              onClick={closePopup}
            >
              {popup.type === "success" ? "Done" : "Try again"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Contact;