import React, { useEffect, useMemo, useRef, useState } from "react";
import "./career.css";
import {
  pageHeader, stats, vision, values, divisions, hiring, perks, faqs,
  openings, locations, applyForm, contact,
} from "./careerdata";
import SEO from "../../components/SEO/SEO";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";
const MAX_FILE_SIZE = (applyForm.maxFileMB || 5) * 1024 * 1024;
const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];
const NAV = [
  { id: "cr-why", label: "Why us" },
  { id: "cr-divisions", label: "Divisions" },
  { id: "cr-openings", label: "Openings" },
  { id: "cr-process", label: "Hiring" },
  { id: "cr-apply", label: "Apply" },
];
const emptyForm = {
  job_id: "", name: "", phone: "", email: "",
  department: "", position: "", location: "", message: "",
};
const MSG_MAX = 500;

const Icon = ({ icon, img, alt = "" }) =>
  img ? <img src={img} alt={alt} className="cr-icon-img" loading="lazy" /> : <i className={icon} aria-hidden="true" />;

// Counts up once when scrolled into view (the page's single orchestrated motion)
const CountUp = ({ to, suffix = "" }) => {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setN(to); return; }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min((t - t0) / 1100, 1);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    ref.current && io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n}{suffix}</span>;
};

const Career = () => {
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "", text: "" });
  const [sending, setSending] = useState(false);
  const [dragging, setDragging] = useState(false);

  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [jobsError, setJobsError] = useState("");
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("All");
  const [active, setActive] = useState(NAV[0].id);

  const formRef = useRef(null);
  const fileRef = useRef(null);

  // 1. Fetch jobs
  useEffect(() => {
    (async () => {
      try {
        setJobsLoading(true); setJobsError("");
        const res = await fetch(`${API_URL}/api/careers/jobs`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setJobs(Array.isArray(data) ? data : []);
      } catch {
        setJobsError("We couldn't load openings right now. Refresh the page, or apply below and HR will match you to a role.");
      } finally { setJobsLoading(false); }
    })();
  }, []);

  // Highlight the sub-nav link of the section in view
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV.forEach((n) => { const el = document.getElementById(n.id); el && io.observe(el); });
    return () => io.disconnect();
  }, []);

  const depts = useMemo(() => ["All", ...new Set(jobs.map((j) => j.department).filter(Boolean))], [jobs]);
  const visibleJobs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter((j) =>
      (dept === "All" || j.department === dept) &&
      (!q || [j.title, j.location, j.department].some((v) => (v || "").toLowerCase().includes(q)))
    );
  }, [jobs, query, dept]);

  // 2. Inputs
  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "message" && value.length > MSG_MAX) return;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
    setStatus({ type: "", text: "" });
  };

  // 3. File validation (click or drag & drop)
  const pickFile = (selected) => {
    setStatus({ type: "", text: "" });
    if (!selected) { setFile(null); return; }
    const ext = selected.name.slice(selected.name.lastIndexOf(".")).toLowerCase();
    let err = "";
    if (!ALLOWED_EXTENSIONS.includes(ext)) err = "Only PDF, DOC and DOCX files are allowed.";
    else if (selected.size > MAX_FILE_SIZE) err = `Resume must be under ${applyForm.maxFileMB || 5} MB.`;
    setErrors((p) => ({ ...p, file: err }));
    if (err) { setFile(null); if (fileRef.current) fileRef.current.value = ""; return; }
    setFile(selected);
  };
  const onFile = (e) => pickFile(e.target.files?.[0]);
  const onDrop = (e) => {
    e.preventDefault(); setDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) pickFile(f);
  };
  const clearFile = () => { setFile(null); if (fileRef.current) fileRef.current.value = ""; };

  // 4. Apply for a job
  const applyFor = (job) => {
    setForm({
      ...emptyForm, job_id: String(job.id), position: job.title || "",
      department: job.department || "", location: job.location || "",
    });
    clearFile(); setErrors({});
    setStatus({ type: "info", text: `You are applying for ${job.title}. Complete the form below.` });
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // 5. Validation
  const validate = () => {
    const v = {};
    if (!form.name.trim()) v.name = "Enter your full name.";
    if (!/^[+\d][\d\s-]{7,14}$/.test(form.phone.trim())) v.phone = "Enter a valid phone number, e.g. +91 98765 43210.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) v.email = "Enter a valid email address.";
    return v;
  };

  // 6. Submit
  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", text: "" });
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) {
      document.querySelector(".cr-field.has-error input")?.focus();
      return;
    }
    const fd = new FormData();
    if (form.job_id) fd.append("job_id", form.job_id);
    ["name", "phone", "email"].forEach((k) => fd.append(k, form[k].trim()));
    ["department", "position", "location", "message"].forEach((k) => fd.append(k, form[k] || ""));
    if (file) fd.append("resume", file);
    try {
      setSending(true);
      const res = await fetch(`${API_URL}/api/careers/apply`, { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(typeof data.detail === "string" ? data.detail : "Unable to submit your application.");
      setStatus({ type: "success", text: data.message || "Application submitted. Our HR team will contact you if your profile matches." });
      setForm({ ...emptyForm }); clearFile(); setErrors({});
    } catch (err) {
      setStatus({ type: "error", text: err.message || `Something went wrong. Email us at ${contact.email}.` });
    } finally { setSending(false); }
  };

  const field = (name) => `cr-field${errors[name] ? " has-error" : ""}`;

  return (
   <>
    <SEO
     
     title="Career SamarveerGroup | Give you career path into Bright with us | PAN INDIA"
     description= " We are mostly looking peoples to join us, You can apply job here we have openings if not always you can submit"
     path="/career"
    />

    <section className="cr-section" id="career">
      {/* HERO */}
      <header className="cr-hero">
        {pageHeader.heroImg && <img className="cr-hero-img" src={pageHeader.heroImg} alt="" aria-hidden="true" />}
        <div className="cr-wrap cr-hero-inner">
          <div className="cr-hero-copy">
            <nav className="cr-breadcrumb" aria-label="Breadcrumb">
              {pageHeader.breadcrumb.map((b, i) => (
                <React.Fragment key={b.label}>
                  {i > 0 && <i className="fa-solid fa-chevron-right" aria-hidden="true" />}
                  {b.href ? <a href={b.href}>{b.label}</a> : <span aria-current="page">{b.label}</span>}
                </React.Fragment>
              ))}
            </nav>
            <h1 className="cr-title">{pageHeader.title}</h1>
            <p className="cr-subtitle">{pageHeader.subtitle}</p>
            <div className="cr-hero-btns">
              <a className="cr-btn cr-btn--primary" href={pageHeader.primaryButton.href}>
                {pageHeader.primaryButton.label}
              </a>
              <a className="cr-btn cr-btn--ghost" href={pageHeader.secondaryButton.href}>
                {pageHeader.secondaryButton.label}
              </a>
            </div>
          </div>

          <aside className="cr-hero-panel" aria-label="Samarveer at a glance">
            <div className="cr-panel-top">
              <span className="cr-live" aria-hidden="true" />
              {jobsLoading ? "Checking openings" : `${jobs.length} open ${jobs.length === 1 ? "role" : "roles"}`}
            </div>
            <div className="cr-stats">
              {stats.map((s) => (
                <div className="cr-stat" key={s.label}>
                  <div className="cr-stat-icon"><Icon icon={s.icon} img={s.img} alt="" /></div>
                  <div>
                    <strong><CountUp to={s.value} suffix={s.suffix} /></strong>
                    <span>{s.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
        <div className="cr-stripe" aria-hidden="true" />
      </header>

      {/* STICKY SUB-NAV */}
      <nav className="cr-subnav" aria-label="Page sections">
        <div className="cr-wrap cr-subnav-in">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className={active === n.id ? "is-active" : ""}
               aria-current={active === n.id ? "true" : undefined}>{n.label}</a>
          ))}
        </div>
      </nav>

      <div className="cr-wrap cr-body">
        {/* WHY US: vision + values */}
        <section id="cr-why" className="cr-anchor">
          <div className="cr-vision">
            <i className="fa-solid fa-quote-left" aria-hidden="true" />
            <div><span>{vision.label}</span><p>{vision.text}</p></div>
          </div>
          <div className="cr-head">
            <h2 className="cr-heading">{values.title}</h2>
            <p className="cr-intro">{values.intro}</p>
          </div>
          <div className="cr-values">
            {values.list.map((v) => (
              <article className="cr-value" key={v.title}>
                <div className="cr-value-icon"><Icon icon={v.icon} img={v.img} alt="" /></div>
                <h3>{v.title}</h3><p>{v.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* DIVISIONS */}
        <section id="cr-divisions" className="cr-anchor">
          <div className="cr-head">
            <h2 className="cr-heading">{divisions.title}</h2>
            <p className="cr-intro">{divisions.intro}</p>
          </div>
          <div className="cr-divisions">
            {divisions.list.map((d) => (
              <a className="cr-division" href={d.href} key={d.title}>
                <div className="cr-division-icon"><Icon icon={d.icon} img={d.img} alt="" /></div>
                <div><h3>{d.title}</h3><p>{d.desc}</p></div>
                <i className="fa-solid fa-arrow-right cr-division-arrow" aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>

        {/* OPENINGS */}
        <section id="cr-openings" className="cr-anchor">
          <div className="cr-head">
            <h2 className="cr-heading">{openings.title}</h2>
          </div>

          {!jobsLoading && !jobsError && jobs.length > 0 && (
            <div className="cr-toolbar">
              <label className="cr-search">
                <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
                <input type="search" value={query} onChange={(e) => setQuery(e.target.value)}
                       placeholder="Search by role or location" aria-label="Search openings" />
              </label>
              <div className="cr-filters" role="group" aria-label="Filter by department">
                {depts.map((d) => (
                  <button key={d} type="button" className={dept === d ? "is-on" : ""}
                          aria-pressed={dept === d} onClick={() => setDept(d)}>{d}</button>
                ))}
              </div>
            </div>
          )}

          {jobsLoading && (
            <div className="cr-jobs" aria-busy="true">
              {[1, 2].map((i) => <div className="cr-job cr-skeleton" key={i} />)}
            </div>
          )}

          {!jobsLoading && jobsError && (
            <div className="cr-empty" role="alert">
              <i className="fa-solid fa-circle-exclamation" aria-hidden="true" />
              <div><h3>Openings unavailable</h3><p>{jobsError}</p></div>
            </div>
          )}

          {!jobsLoading && !jobsError && visibleJobs.length > 0 && (
            <div className="cr-jobs">
              {visibleJobs.map((job) => (
                <article className="cr-job" key={job.id}>
                  <div className="cr-job-main">
                    <h3>{job.title}</h3>
                    {job.description && <p>{job.description}</p>}
                    <div className="cr-tags">
                      {job.department && <span><i className="fa-solid fa-layer-group" /> {job.department}</span>}
                      {job.location && <span><i className="fa-solid fa-location-dot" /> {job.location}</span>}
                      {job.employment_type && <span><i className="fa-solid fa-clock" /> {job.employment_type}</span>}
                      {job.salary_range && <span><i className="fa-solid fa-indian-rupee-sign" /> {job.salary_range}</span>}
                      {job.closing_date && <span><i className="fa-solid fa-calendar" /> Apply by {job.closing_date}</span>}
                    </div>
                  </div>
                  <button type="button" className="cr-btn cr-btn--primary" onClick={() => applyFor(job)}>
                    Apply for this role
                  </button>
                </article>
              ))}
            </div>
          )}

          {!jobsLoading && !jobsError && jobs.length > 0 && visibleJobs.length === 0 && (
            <div className="cr-empty">
              <i className="fa-solid fa-filter-circle-xmark" aria-hidden="true" />
              <div>
                <h3>No roles match your search</h3>
                <p>Clear the filters, or apply below without choosing a role.</p>
                <button type="button" className="cr-link" onClick={() => { setQuery(""); setDept("All"); }}>Clear filters</button>
              </div>
            </div>
          )}

          {!jobsLoading && !jobsError && jobs.length === 0 && (
            <div className="cr-empty">
              <i className="fa-solid fa-envelope-open-text" aria-hidden="true" />
              <div>
                <h3>{openings.emptyTitle}</h3><p>{openings.emptyText}</p>
                <a className="cr-link" href="#cr-apply">Go to the application form</a>
              </div>
            </div>
          )}
        </section>

        {/* HIRING PROCESS: real sequence, so numbered */}
        <section id="cr-process" className="cr-anchor">
          <div className="cr-head">
            <h2 className="cr-heading">{hiring.title}</h2>
            <p className="cr-intro">{hiring.intro}</p>
          </div>
          <ol className="cr-steps">
            {hiring.steps.map((s, i) => (
              <li key={s.title}>
                <b>{i + 1}</b>
                <h3>{s.title}</h3><p>{s.desc}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* APPLY */}
        <section id="cr-apply" className="cr-apply cr-anchor" ref={formRef}>
          <form className="cr-form" onSubmit={onSubmit} noValidate>
            <h2>{applyForm.title}</h2>
            <p className="cr-form-intro">{applyForm.intro}</p>

            {form.position && (
              <p className="cr-applying">
                <i className="fa-solid fa-briefcase" aria-hidden="true" /> Applying for <strong>{form.position}</strong>
              </p>
            )}

            <div className="cr-fields">
              <label className={field("name")}>
                <span>Full name *</span>
                <input name="name" value={form.name} onChange={onChange} autoComplete="name"
                       aria-invalid={!!errors.name} required />
                {errors.name && <em role="alert">{errors.name}</em>}
              </label>

              <label className={field("phone")}>
                <span>Phone *</span>
                <input name="phone" type="tel" value={form.phone} onChange={onChange}
                       autoComplete="tel" placeholder="+91" aria-invalid={!!errors.phone} required />
                {errors.phone && <em role="alert">{errors.phone}</em>}
              </label>

              <label className={`${field("email")} cr-span2`}>
                <span>Email *</span>
                <input name="email" type="email" value={form.email} onChange={onChange}
                       autoComplete="email" aria-invalid={!!errors.email} required />
                {errors.email && <em role="alert">{errors.email}</em>}
              </label>

              <label className="cr-field">
                <span>Department</span>
                <select name="department" value={form.department} onChange={onChange}>
                  <option value="">Select department</option>
                  {applyForm.departments.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </label>

              <label className="cr-field">
                <span>Preferred location</span>
                <select name="location" value={form.location} onChange={onChange}>
                  <option value="">Any location</option>
                  {locations.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </label>

              <label className="cr-field cr-span2">
                <span>Position (optional)</span>
                <input name="position" value={form.position} onChange={onChange} placeholder="e.g. Site Supervisor" />
              </label>

              <label className="cr-field cr-span2">
                <span>Message</span>
                <textarea name="message" rows="4" value={form.message} onChange={onChange}
                          placeholder="Your experience, current role, notice period..." />
                <small className="cr-count">{form.message.length}/{MSG_MAX}</small>
              </label>

              <div className={`${field("file")} cr-span2`}>
                <span id="cr-file-label">Resume ({applyForm.acceptedFiles.replace(/\./g, "").replace(/,/g, ", ").toUpperCase()}, max {applyForm.maxFileMB} MB)</span>
                <label
                  className={`cr-drop${dragging ? " is-drag" : ""}${file ? " has-file" : ""}`}
                  onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={onDrop}
                >
                  <input ref={fileRef} type="file" accept={applyForm.acceptedFiles} onChange={onFile}
                         aria-labelledby="cr-file-label" />
                  <i className={`fa-solid ${file ? "fa-file-circle-check" : "fa-cloud-arrow-up"}`} aria-hidden="true" />
                  <span>{file ? file.name : "Drop your resume here or click to browse"}</span>
                </label>
                {file && <button type="button" className="cr-link" onClick={clearFile}>Remove file</button>}
                {errors.file && <em role="alert">{errors.file}</em>}
              </div>
            </div>

            {status.text && (
              <p className={`cr-status cr-status--${status.type}`} role="status" aria-live="polite">{status.text}</p>
            )}

            <button type="submit" className="cr-btn cr-btn--primary cr-submit" disabled={sending}>
              {sending ? "Submitting..." : "Submit application"}
            </button>
          </form>

          <aside className="cr-side">
            <h3>Why join</h3>
            <ul>
              {perks.map((p) => (
                <li key={p.text}><i className={p.icon} aria-hidden="true" /><span>{p.text}</span></li>
              ))}
            </ul>
            <h3>Contact HR</h3>
            <ul>
              <li><i className="fa-solid fa-envelope" aria-hidden="true" /><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
              {contact.phone && <li><i className="fa-solid fa-phone" aria-hidden="true" /><a href={`tel:${contact.phone}`}>{contact.phone}</a></li>}
              <li><i className="fa-solid fa-building" aria-hidden="true" /><span>{contact.hqLabel || "Satna, Madhya Pradesh"}</span></li>
            </ul>
            <h3>Our locations</h3>
            <div className="cr-chips">{locations.map((l) => <span key={l}>{l}</span>)}</div>
          </aside>
        </section>

        {/* FAQ */}
        <section>
          <div className="cr-head"><h2 className="cr-heading">FAQs</h2></div>
          <div className="cr-faq">
            {faqs.map((f) => (
              <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
            ))}
          </div>
        </section>
      </div>
    </section>
   </>
  );
};

export default Career;