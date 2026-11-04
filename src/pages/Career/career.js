
import React, { useEffect, useRef, useState } from "react";
import "./career.css";

import {
  pageHeader,
  stats,
  vision,
  values,
  divisions,
  openings,
  locations,
  applyForm,
  contact,
} from "./careerdata";

// ======================================================
// CONFIGURATION
// ======================================================

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8000";

const MAX_FILE_SIZE =
  (applyForm.maxFileMB || 5) * 1024 * 1024;

const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];

const emptyForm = {
  job_id: "",
  name: "",
  phone: "",
  email: "",
  department: "",
  position: "",
  location: "",
  message: "",
};

// ======================================================
// REUSABLE ICON COMPONENT
// ======================================================

const Icon = ({ icon, img, alt = "" }) => {
  if (img) {
    return (
      <img
        src={img}
        alt={alt}
        className="cr-icon-img"
        loading="lazy"
      />
    );
  }

  return <i className={icon} aria-hidden="true" />;
};

// ======================================================
// MAIN CAREER COMPONENT
// ======================================================

const Career = () => {
  // ------------------------------
  // Form states
  // ------------------------------

  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({
    type: "",
    text: "",
  });
  const [sending, setSending] = useState(false);

  // ------------------------------
  // Dynamic jobs states
  // ------------------------------

  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [jobsError, setJobsError] = useState("");

  // ------------------------------
  // Refs
  // ------------------------------

  const formRef = useRef(null);
  const fileRef = useRef(null);

  // ======================================================
  // 1. FETCH ACTIVE JOBS FROM BACKEND
  // ======================================================

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setJobsLoading(true);
        setJobsError("");

        const response = await fetch(
          `${API_URL}/api/careers/jobs`
        );

        if (!response.ok) {
          throw new Error("Unable to load current openings.");
        }

        const data = await response.json();

        setJobs(Array.isArray(data) ? data : []);
      } catch (error) {
        setJobsError(
          "Unable to load job openings right now. Please try again later."
        );
      } finally {
        setJobsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // ======================================================
  // 2. FORM INPUT HANDLING
  // ======================================================

  const onChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setStatus({
      type: "",
      text: "",
    });
  };

  // ======================================================
  // 3. RESUME FILE VALIDATION
  // ======================================================

  const onFile = (event) => {
    const selectedFile = event.target.files?.[0];

    setStatus({
      type: "",
      text: "",
    });

    if (!selectedFile) {
      setFile(null);
      return;
    }

    const extension = selectedFile.name
      .slice(selectedFile.name.lastIndexOf("."))
      .toLowerCase();

    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      setErrors((previous) => ({
        ...previous,
        file: "Only PDF, DOC and DOCX files are allowed.",
      }));

      setFile(null);
      event.target.value = "";
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setErrors((previous) => ({
        ...previous,
        file: `Resume must be under ${applyForm.maxFileMB || 5} MB.`,
      }));

      setFile(null);
      event.target.value = "";
      return;
    }

    setErrors((previous) => ({
      ...previous,
      file: "",
    }));

    setFile(selectedFile);
  };

  // ======================================================
  // 4. APPLY FOR A SPECIFIC JOB
  // ======================================================

  const applyFor = (job) => {
    setForm({
      ...emptyForm,
      job_id: String(job.id),
      position: job.title || "",
      department: job.department || "",
      location: job.location || "",
    });

    setFile(null);
    setErrors({});

    setStatus({
      type: "info",
      text: `You are applying for ${job.title}. Please complete the form.`,
    });

    if (fileRef.current) {
      fileRef.current.value = "";
    }

    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // ======================================================
  // 5. FORM VALIDATION
  // ======================================================

  const validate = () => {
    const validationErrors = {};

    if (!form.name.trim()) {
      validationErrors.name = "Please enter your name.";
    }

    if (!/^[+\d][\d\s-]{7,14}$/.test(form.phone.trim())) {
      validationErrors.phone = "Enter a valid phone number.";
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ) {
      validationErrors.email = "Enter a valid email address.";
    }

    return validationErrors;
  };

  // ======================================================
  // 6. SUBMIT APPLICATION TO FASTAPI
  // ======================================================

  const onSubmit = async (event) => {
    event.preventDefault();

    setStatus({
      type: "",
      text: "",
    });

    const validationErrors = validate();

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // Prepare multipart form data
    const formData = new FormData();

    if (form.job_id) {
      formData.append("job_id", form.job_id);
    }

    formData.append("name", form.name.trim());
    formData.append("phone", form.phone.trim());
    formData.append("email", form.email.trim());
    formData.append("department", form.department || "");
    formData.append("position", form.position || "");
    formData.append("location", form.location || "");
    formData.append("message", form.message || "");

    if (file) {
      formData.append("resume", file);
    }

    try {
      setSending(true);

      const response = await fetch(
        `${API_URL}/api/careers/apply`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof data.detail === "string"
            ? data.detail
            : "Unable to submit your application."
        );
      }

      // Success
      setStatus({
        type: "success",
        text:
          data.message ||
          "Thank you! Your application has been submitted successfully.",
      });

      // Reset form
      setForm({ ...emptyForm });
      setFile(null);
      setErrors({});

      if (fileRef.current) {
        fileRef.current.value = "";
      }
    } catch (error) {
      setStatus({
        type: "error",
        text:
          error.message ||
          `Something went wrong. Please email us at ${contact.email}.`,
      });
    } finally {
      setSending(false);
    }
  };

  // ======================================================
  // 7. RENDER PAGE
  // ======================================================

  return (
    <section className="cr-section" id="career">

      {/* ==========================================
          HERO SECTION
      ========================================== */}

      <div className="cr-hero">
        {pageHeader.heroImg && (
          <img
            className="cr-hero-img"
            src={pageHeader.heroImg}
            alt=""
            aria-hidden="true"
          />
        )}

        <div className="cr-wrap cr-hero-inner">

          <nav className="cr-breadcrumb" aria-label="Breadcrumb">
            {pageHeader.breadcrumb.map((breadcrumb, index) => (
              <React.Fragment key={breadcrumb.label}>
                {index > 0 && (
                  <i
                    className="fa-solid fa-chevron-right"
                    aria-hidden="true"
                  />
                )}

                {breadcrumb.href ? (
                  <a href={breadcrumb.href}>
                    {breadcrumb.label}
                  </a>
                ) : (
                  <span>{breadcrumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>

          <span className="cr-eyebrow">
            {pageHeader.eyebrow}
          </span>

          <h1 className="cr-title">
            {pageHeader.title}{" "}
            <span>{pageHeader.highlight}</span>
          </h1>

          <p className="cr-subtitle">
            {pageHeader.subtitle}
          </p>

          <div className="cr-hero-btns">
            <a
              className="cr-btn cr-btn--primary"
              href={pageHeader.primaryButton.href}
            >
              {pageHeader.primaryButton.label}
              <i
                className="fa-solid fa-arrow-right"
                aria-hidden="true"
              />
            </a>

            <a
              className="cr-btn cr-btn--ghost"
              href={pageHeader.secondaryButton.href}
            >
              {pageHeader.secondaryButton.label}
            </a>
          </div>
        </div>
      </div>

      <div className="cr-wrap cr-body">

        {/* ==========================================
            COMPANY STATS
        ========================================== */}

        <div className="cr-stats">
          {stats.map((item) => (
            <div className="cr-stat" key={item.label}>
              <div className="cr-stat-icon">
                <Icon
                  icon={item.icon}
                  img={item.img}
                  alt={item.label}
                />
              </div>

              <div>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ==========================================
            COMPANY VISION
        ========================================== */}

        <div className="cr-vision">
          <i
            className="fa-solid fa-quote-left"
            aria-hidden="true"
          />

          <div>
            <span>{vision.label}</span>
            <p>{vision.text}</p>
          </div>
        </div>

        {/* ==========================================
            COMPANY VALUES
        ========================================== */}

        <div>
          <h2 className="cr-heading">{values.title}</h2>

          <p className="cr-intro">{values.intro}</p>

          <div className="cr-values">
            {values.list.map((item) => (
              <div className="cr-value" key={item.title}>
                <div className="cr-value-icon">
                  <Icon
                    icon={item.icon}
                    img={item.img}
                    alt={item.title}
                  />
                </div>

                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            BUSINESS DIVISIONS
        ========================================== */}

        <div>
          <h2 className="cr-heading">{divisions.title}</h2>

          <p className="cr-intro">{divisions.intro}</p>

          <div className="cr-divisions">
            {divisions.list.map((item) => (
              <a
                className="cr-division"
                href={item.href}
                key={item.title}
              >
                <div className="cr-division-icon">
                  <Icon
                    icon={item.icon}
                    img={item.img}
                    alt={item.title}
                  />
                </div>

                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>

                <i
                  className="fa-solid fa-arrow-right cr-division-arrow"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </div>

        {/* ==========================================
            DYNAMIC JOB OPENINGS
        ========================================== */}

        <div id="cr-openings" className="cr-anchor">

          <h2 className="cr-heading">{openings.title}</h2>

          {/* Loading state */}
          {jobsLoading && (
            <div className="cr-empty">
              <p>Loading current job openings...</p>
            </div>
          )}

          {/* API error state */}
          {!jobsLoading && jobsError && (
            <div className="cr-empty" role="alert">
              <i className="fa-solid fa-circle-exclamation" />
              <div>
                <h3>Unable to load openings</h3>
                <p>{jobsError}</p>
              </div>
            </div>
          )}

          {/* Active jobs */}
          {!jobsLoading && !jobsError && jobs.length > 0 && (
            <div className="cr-jobs">
              {jobs.map((job) => (
                <article className="cr-job" key={job.id}>

                  <div className="cr-job-main">
                    <h3>{job.title}</h3>

                    {job.description && (
                      <p>{job.description}</p>
                    )}

                    <div className="cr-tags">

                      {job.department && (
                        <span>
                          <i className="fa-solid fa-layer-group" />
                          {" "}{job.department}
                        </span>
                      )}

                      {job.location && (
                        <span>
                          <i className="fa-solid fa-location-dot" />
                          {" "}{job.location}
                        </span>
                      )}

                      {job.employment_type && (
                        <span>
                          <i className="fa-solid fa-clock" />
                          {" "}{job.employment_type}
                        </span>
                      )}

                      {job.salary_range && (
                        <span>
                          <i className="fa-solid fa-indian-rupee-sign" />
                          {" "}{job.salary_range}
                        </span>
                      )}

                      {job.closing_date && (
                        <span>
                          <i className="fa-solid fa-calendar" />
                          {" "}Last date: {job.closing_date}
                        </span>
                      )}

                    </div>
                  </div>

                  <button
                    type="button"
                    className="cr-btn cr-btn--primary"
                    onClick={() => applyFor(job)}
                  >
                    Apply
                    <i
                      className="fa-solid fa-arrow-right"
                      aria-hidden="true"
                    />
                  </button>

                </article>
              ))}
            </div>
          )}

          {/* No active jobs */}
          {!jobsLoading && !jobsError && jobs.length === 0 && (
            <div className="cr-empty">
              <i className="fa-solid fa-envelope-open-text" />

              <div>
                <h3>{openings.emptyTitle}</h3>
                <p>{openings.emptyText}</p>
              </div>
            </div>
          )}

        </div>

        {/* ==========================================
            APPLICATION FORM + CONTACT
        ========================================== */}

        <div
          className="cr-apply cr-anchor"
          id="cr-apply"
          ref={formRef}
        >

          {/* Application form */}
          <form
            className="cr-form"
            onSubmit={onSubmit}
            noValidate
          >

            <h2>{applyForm.title}</h2>

            <p className="cr-form-intro">
              {applyForm.intro}
            </p>

            <div className="cr-fields">

              {/* Full name */}
              <label className="cr-field">
                <span>Full Name *</span>

                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  autoComplete="name"
                  required
                />

                {errors.name && (
                  <em>{errors.name}</em>
                )}
              </label>

              {/* Phone */}
              <label className="cr-field">
                <span>Phone *</span>

                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={onChange}
                  autoComplete="tel"
                  placeholder="+91"
                  required
                />

                {errors.phone && (
                  <em>{errors.phone}</em>
                )}
              </label>

              {/* Email */}
              <label className="cr-field cr-span2">
                <span>Email *</span>

                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  autoComplete="email"
                  required
                />

                {errors.email && (
                  <em>{errors.email}</em>
                )}
              </label>

              {/* Department */}
              <label className="cr-field">
                <span>Department</span>

                <select
                  name="department"
                  value={form.department}
                  onChange={onChange}
                >
                  <option value="">Select department</option>

                  {applyForm.departments.map((department) => (
                    <option
                      key={department}
                      value={department}
                    >
                      {department}
                    </option>
                  ))}
                </select>
              </label>

              {/* Location */}
              <label className="cr-field">
                <span>Preferred Location</span>

                <select
                  name="location"
                  value={form.location}
                  onChange={onChange}
                >
                  <option value="">Any location</option>

                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </label>

              {/* Position */}
              <label className="cr-field cr-span2">
                <span>Position (optional)</span>

                <input
                  name="position"
                  value={form.position}
                  onChange={onChange}
                  placeholder="Enter position"
                />
              </label>

              {/* Message */}
              <label className="cr-field cr-span2">
                <span>Message</span>

                <textarea
                  name="message"
                  rows="4"
                  value={form.message}
                  onChange={onChange}
                  placeholder="Tell us about yourself..."
                />
              </label>

              {/* Resume */}
              <label className="cr-field cr-span2">
                <span>
                  Resume (
                  {applyForm.acceptedFiles
                    .replace(/\./g, "")
                    .replace(/,/g, ", ")
                    .toUpperCase()}
                  , max {applyForm.maxFileMB} MB)
                </span>

                <input
                  ref={fileRef}
                  type="file"
                  accept={applyForm.acceptedFiles}
                  onChange={onFile}
                />

                {file && (
                  <small>{file.name}</small>
                )}

                {errors.file && (
                  <em>{errors.file}</em>
                )}
              </label>

            </div>

            {/* Success / Error / Info message */}
            {status.text && (
              <p
                className={`cr-status cr-status--${status.type}`}
                role="status"
                aria-live="polite"
              >
                {status.text}
              </p>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className="cr-btn cr-btn--primary cr-submit"
              disabled={sending}
            >
              {sending ? "Submitting..." : "Submit Application"}

              <i
                className="fa-solid fa-paper-plane"
                aria-hidden="true"
              />
            </button>

          </form>

          {/* Contact information */}
          <aside className="cr-side">

            <h3>Get in touch</h3>

            <ul>
  

              <li>
                <i className="fa-solid fa-envelope" aria-hidden="true" />
                <span>{contact.email}</span>
              </li>

              <li>
                <i className="fa-solid fa-building" aria-hidden="true" />
                <span>Satna, Madhya Pradesh</span>
              </li>
            </ul>

            <h4>Our Locations</h4>

            <div className="cr-chips">
              {locations.map((location) => (
                <span key={location}>{location}</span>
              ))}
            </div>

          </aside>

        </div>

      </div>
    </section>
  );
};

export default Career;
