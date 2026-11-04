
import React, { useEffect, useState } from "react";
import "./admin.css";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8000";

const EMPTY_JOB = {
  title: "",
  department: "",
  location: "",
  employment_type: "Full-time",
  salary_range: "",
  description: "",
  requirements: "",
  status: "draft",
  closing_date: "",
};

const JOB_STATUSES = ["draft", "active", "closed", "expired"];

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString();
}

async function getErrorMessage(response, fallback) {
  try {
    const data = await response.json();
    return data.detail || fallback;
  } catch {
    return fallback;
  }
}

export default function AdminDashboard() {
  // Authentication
  const token = sessionStorage.getItem("admin_token");

  // Dashboard navigation
  const [activeTab, setActiveTab] = useState("overview");

  // Customer enquiries
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Visitor analytics
  const [analytics, setAnalytics] = useState(null);
  const [analyticsDays, setAnalyticsDays] = useState(7);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);
  const [analyticsError, setAnalyticsError] = useState("");

  // Career applications
  const [applications, setApplications] = useState([]);
  const [applicationsLoading, setApplicationsLoading] = useState(false);
  const [applicationsError, setApplicationsError] = useState("");

  // Job management
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [jobsError, setJobsError] = useState("");
  const [jobSaving, setJobSaving] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJobId, setEditingJobId] = useState(null);
  const [jobForm, setJobForm] = useState(EMPTY_JOB);

  // Authentication helper
  function handleUnauthorized(response) {
    if (response.status === 401 || response.status === 403) {
      sessionStorage.removeItem("admin_token");
      window.location.replace("/admin");
      return true;
    }
    return false;
  }

  // Common request headers
  function authHeaders() {
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  // Initial dashboard loading
  useEffect(() => {
    if (!token) {
      window.location.replace("/admin");
      return;
    }

    fetchEnquiries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load analytics when period changes
  useEffect(() => {
    if (token) {
      loadAnalytics(analyticsDays);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [analyticsDays]);

  // =========================================
  // CUSTOMER ENQUIRIES
  // =========================================

  async function fetchEnquiries() {
    try {
      const response = await fetch(
        `${API_URL}/api/admin/enquiries`,
        { headers: authHeaders() }
      );

      if (handleUnauthorized(response)) return;

      if (!response.ok) {
        throw new Error(
          await getErrorMessage(response, "Unable to load enquiries")
        );
      }

      const data = await response.json();
      setEnquiries(
        Array.isArray(data) ? data : data.enquiries || []
      );
      setError("");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id, status) {
    try {
      const response = await fetch(
        `${API_URL}/api/admin/enquiries/${id}/status`,
        {
          method: "PATCH",
          headers: {
            ...authHeaders(),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (handleUnauthorized(response)) return;

      if (!response.ok) {
        throw new Error(
          await getErrorMessage(response, "Status update failed")
        );
      }

      await fetchEnquiries();
    } catch (err) {
      setError(err.message || "Unable to update status");
    }
  }

  // =========================================
  // WEBSITE VISITOR ANALYTICS
  // =========================================

  async function loadAnalytics(days) {
    setAnalyticsLoading(true);
    setAnalyticsError("");

    if (!token) {
      setAnalyticsError("Admin login required. Please log in again.");
      setAnalyticsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/analytics/summary?days=${days}`,
        { headers: authHeaders() }
      );

      if (handleUnauthorized(response)) return;

      if (!response.ok) {
        throw new Error(
          await getErrorMessage(
            response,
            "Unable to load visitor analytics"
          )
        );
      }

      const data = await response.json();
      setAnalytics(data);
    } catch (err) {
      setAnalyticsError(err.message || "Unable to load analytics");
    } finally {
      setAnalyticsLoading(false);
    }
  }

  // =========================================
  // CAREER APPLICATIONS
  // =========================================

  async function fetchApplications() {
    setApplicationsLoading(true);
    setApplicationsError("");

    try {
      const response = await fetch(
        `${API_URL}/api/admin/careers/applications`,
        { headers: authHeaders() }
      );

      if (handleUnauthorized(response)) return;

      if (!response.ok) {
        throw new Error(
          await getErrorMessage(
            response,
            "Unable to load career applications"
          )
        );
      }

      const data = await response.json();
      setApplications(Array.isArray(data) ? data : []);
    } catch (err) {
      setApplicationsError(
        err.message || "Unable to load applications"
      );
    } finally {
      setApplicationsLoading(false);
    }
  }

  async function updateApplicationStatus(id, status) {
    setApplicationsError("");

    try {
      const response = await fetch(
        `${API_URL}/api/admin/careers/applications/${id}/status`,
        {
          method: "PATCH",
          headers: {
            ...authHeaders(),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (handleUnauthorized(response)) return;

      if (!response.ok) {
        throw new Error(
          await getErrorMessage(
            response,
            "Unable to update application status"
          )
        );
      }

      await fetchApplications();
    } catch (err) {
      setApplicationsError(
        err.message || "Unable to update status"
      );
    }
  }

  async function downloadResume(applicationId) {
    try {
      const response = await fetch(
        `${API_URL}/api/admin/careers/applications/${applicationId}/resume`,
        { headers: authHeaders() }
      );

      if (handleUnauthorized(response)) return;

      if (!response.ok) {
        throw new Error(
          await getErrorMessage(response, "Unable to download resume")
        );
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `candidate_${applicationId}_resume`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      setApplicationsError(
        err.message || "Resume download failed"
      );
    }
  }

  // =========================================
  // CAREER JOB MANAGEMENT
  // =========================================

  async function fetchJobs() {
    setJobsLoading(true);
    setJobsError("");

    try {
      const response = await fetch(
        `${API_URL}/api/admin/careers/jobs`,
        { headers: authHeaders() }
      );

      if (handleUnauthorized(response)) return;

      if (!response.ok) {
        throw new Error(
          await getErrorMessage(response, "Unable to load jobs")
        );
      }

      const data = await response.json();
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      setJobsError(err.message || "Unable to load jobs");
    } finally {
      setJobsLoading(false);
    }
  }

  function openCreateJobForm() {
    setEditingJobId(null);
    setJobForm({ ...EMPTY_JOB });
    setJobsError("");
    setShowJobForm(true);
  }

  function openEditJobForm(job) {
    setEditingJobId(job.id);

    setJobForm({
      title: job.title || "",
      department: job.department || "",
      location: job.location || "",
      employment_type: job.employment_type || "Full-time",
      salary_range: job.salary_range || "",
      description: job.description || "",
      requirements: job.requirements || "",
      status: job.status || "draft",
      closing_date: job.closing_date || "",
    });

    setJobsError("");
    setShowJobForm(true);
  }

  function closeJobForm() {
    if (jobSaving) return;

    setShowJobForm(false);
    setEditingJobId(null);
    setJobForm({ ...EMPTY_JOB });
  }

  function handleJobInput(event) {
    const { name, value } = event.target;

    setJobForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function saveJob(event) {
    event.preventDefault();
    setJobsError("");

    if (
      !jobForm.title.trim() ||
      !jobForm.department.trim() ||
      !jobForm.location.trim() ||
      !jobForm.description.trim()
    ) {
      setJobsError(
        "Title, department, location and description are required."
      );
      return;
    }

    if (
      jobForm.closing_date &&
      jobForm.closing_date < new Date().toLocaleDateString("en-CA")
    ) {
      setJobsError("Closing date cannot be in the past.");
      return;
    }

    const payload = {
      title: jobForm.title.trim(),
      department: jobForm.department.trim(),
      location: jobForm.location.trim(),
      employment_type: jobForm.employment_type,
      salary_range: jobForm.salary_range.trim() || null,
      description: jobForm.description.trim(),
      requirements: jobForm.requirements.trim() || null,
      status: jobForm.status,
      closing_date: jobForm.closing_date || null,
    };

    setJobSaving(true);

    try {
      const isEditing = Boolean(editingJobId);

      const response = await fetch(
        isEditing
          ? `${API_URL}/api/admin/careers/jobs/${editingJobId}`
          : `${API_URL}/api/admin/careers/jobs`,
        {
          method: isEditing ? "PATCH" : "POST",
          headers: {
            ...authHeaders(),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (handleUnauthorized(response)) return;

      if (!response.ok) {
        throw new Error(
          await getErrorMessage(response, "Unable to save job")
        );
      }

      setShowJobForm(false);
      setEditingJobId(null);
      setJobForm({ ...EMPTY_JOB });

      await fetchJobs();
    } catch (err) {
      setJobsError(err.message || "Unable to save job");
    } finally {
      setJobSaving(false);
    }
  }

  async function changeJobStatus(jobId, status) {
    setJobsError("");

    try {
      const response = await fetch(
        `${API_URL}/api/admin/careers/jobs/${jobId}/status?status=${encodeURIComponent(status)}`,
        {
          method: "PATCH",
          headers: authHeaders(),
        }
      );

      if (handleUnauthorized(response)) return;

      if (!response.ok) {
        throw new Error(
          await getErrorMessage(response, "Unable to update job status")
        );
      }

      await fetchJobs();
    } catch (err) {
      setJobsError(err.message || "Unable to update job status");
    }
  }

  // =========================================
  // NAVIGATION
  // =========================================

  function openApplications() {
    setActiveTab("applications");
    fetchApplications();
  }

  function openJobs() {
    setActiveTab("jobs");
    setShowJobForm(false);
    fetchJobs();
  }

  function logout() {
    sessionStorage.removeItem("admin_token");
    window.location.replace("/admin");
  }

  // Initial loading screen
  if (loading) {
    return <p className="admin-loading">Loading admin dashboard...</p>;
  }

  // =========================================
  // DASHBOARD UI
  // =========================================

  return (
    <main className="admin-dashboard">
      {/* Dashboard Header */}
      <header className="dashboard-header">
        <div>
          <p className="admin-eyebrow">
            SAMARVEER AUTO & LUBES
          </p>
          <h1>Admin Dashboard</h1>
          <p>Total enquiries: {enquiries.length}</p>
        </div>

        <button type="button" onClick={logout}>
          Logout
        </button>
      </header>

      {/* Dashboard Navigation */}
      <nav className="admin-tabs">
        <button
          type="button"
          className={activeTab === "overview" ? "active" : ""}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>

        <button
          type="button"
          className={activeTab === "enquiries" ? "active" : ""}
          onClick={() => setActiveTab("enquiries")}
        >
          Customer Enquiries
        </button>

        <button
          type="button"
          className={activeTab === "applications" ? "active" : ""}
          onClick={openApplications}
        >
          Career Applications
        </button>

        <button
          type="button"
          className={activeTab === "jobs" ? "active" : ""}
          onClick={openJobs}
        >
          Job Management
        </button>
      </nav>

      {error && (
        <p className="admin-error" role="alert">
          {error}
        </p>
      )}

      {/* ==================================
          OVERVIEW / VISITOR ANALYTICS
      ================================== */}

      {activeTab === "overview" && (
        <section className="analytics-section">
          <div className="analytics-heading">
            <div>
              <p className="admin-eyebrow">WEBSITE PERFORMANCE</p>
              <h2>Visitor Analytics</h2>
            </div>

            <label>
              Report period{" "}
              <select
                value={analyticsDays}
                onChange={(event) =>
                  setAnalyticsDays(Number(event.target.value))
                }
              >
                <option value={7}>Last 7 days</option>
                <option value={30}>Last 30 days</option>
                <option value={90}>Last 90 days</option>
              </select>
            </label>
          </div>

          {analyticsError && (
            <p className="admin-error" role="alert">
              {analyticsError}
            </p>
          )}

          {analyticsLoading && <p>Loading visitor analytics...</p>}

          {!analyticsLoading && analytics && (
            <>
              <div className="analytics-cards">
                <article className="analytics-card">
                  <h3>Total Page Views</h3>
                  <p>{analytics.total_views}</p>
                  <span>All time</span>
                </article>

                <article className="analytics-card">
                  <h3>Unique Visitors</h3>
                  <p>{analytics.unique_visitors}</p>
                  <span>All time, estimated</span>
                </article>

                <article className="analytics-card">
                  <h3>Today's Views</h3>
                  <p>{analytics.today_views}</p>
                  <span>Current MySQL date</span>
                </article>
              </div>

              <div className="analytics-panels">
                <section className="analytics-panel">
                  <h3>Daily Traffic</h3>

                  {analytics.daily_views.length === 0 ? (
                    <p>No page views for this period yet.</p>
                  ) : (
                    <div className="analytics-list">
                      {analytics.daily_views.map((item) => (
                        <div
                          key={item.date}
                          className="analytics-row"
                        >
                          <span>{item.date}</span>
                          <strong>{item.views} views</strong>
                        </div>
                      ))}
                    </div>
                  )}
                </section>

                <section className="analytics-panel">
                  <h3>Popular Pages</h3>

                  {analytics.popular_pages.length === 0 ? (
                    <p>No page views recorded yet.</p>
                  ) : (
                    <div className="analytics-list">
                      {analytics.popular_pages.map((page) => (
                        <div
                          key={page.page_path}
                          className="analytics-row"
                        >
                          <span>{page.page_path}</span>
                          <strong>{page.views} views</strong>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </div>
            </>
          )}
        </section>
      )}

      {/* ==================================
          CUSTOMER ENQUIRIES
      ================================== */}

      {activeTab === "enquiries" && (
        <section className="enquiry-section">
          <h2>Customer Enquiries</h2>

          <div className="enquiry-table-wrap">
            <table className="enquiry-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Service</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Received</th>
                </tr>
              </thead>

              <tbody>
                {enquiries.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.company || "—"}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>{item.service}</td>
                    <td>{item.message}</td>
                    <td>
                      <select
                        value={item.status}
                        onChange={(event) =>
                          updateStatus(item.id, event.target.value)
                        }
                      >
                        <option value="new">New</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </td>
                    <td>
                      {item.created_at
                        ? new Date(item.created_at).toLocaleString()
                        : "—"}
                    </td>
                  </tr>
                ))}

                {enquiries.length === 0 && (
                  <tr>
                    <td colSpan="8">No enquiries found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ==================================
          CAREER APPLICATIONS
      ================================== */}

      {activeTab === "applications" && (
        <section className="enquiry-section">
          <div className="analytics-heading">
            <div>
              <p className="admin-eyebrow">RECRUITMENT MANAGEMENT</p>
              <h2>Career Applications</h2>
              <p>Total applications: {applications.length}</p>
            </div>

            <button
              type="button"
              onClick={fetchApplications}
              disabled={applicationsLoading}
            >
              {applicationsLoading ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          {applicationsError && (
            <p className="admin-error" role="alert">
              {applicationsError}
            </p>
          )}

          {applicationsLoading ? (
            <p>Loading applications...</p>
          ) : (
            <div className="enquiry-table-wrap">
              <table className="enquiry-table">
                <thead>
                  <tr>
                    <th>Candidate</th>
                    <th>Contact</th>
                    <th>Position</th>
                    <th>Department</th>
                    <th>Location</th>
                    <th>Message</th>
                    <th>Resume</th>
                    <th>Status</th>
                    <th>Applied On</th>
                  </tr>
                </thead>

                <tbody>
                  {applications.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>
                        {item.phone}
                        <br />
                        {item.email}
                      </td>
                      <td>{item.position || "General Application"}</td>
                      <td>{item.department || "—"}</td>
                      <td>{item.location || "—"}</td>
                      <td>{item.message || "—"}</td>
                      <td>
                        {item.resume_available ? (
                          <button
                            type="button"
                            onClick={() => downloadResume(item.id)}
                          >
                            Download
                          </button>
                        ) : (
                          "Not uploaded"
                        )}
                      </td>
                      <td>
                        <select
                          value={item.status}
                          onChange={(event) =>
                            updateApplicationStatus(
                              item.id,
                              event.target.value
                            )
                          }
                        >
                          <option value="new">New</option>
                          <option value="reviewing">Reviewing</option>
                          <option value="shortlisted">Shortlisted</option>
                          <option value="rejected">Rejected</option>
                          <option value="hired">Hired</option>
                        </select>
                      </td>
                      <td>
                        {item.created_at
                          ? new Date(item.created_at).toLocaleString()
                          : "—"}
                      </td>
                    </tr>
                  ))}

                  {applications.length === 0 && (
                    <tr>
                      <td colSpan="9">No applications found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {/* ==================================
          JOB MANAGEMENT
      ================================== */}

      {activeTab === "jobs" && (
        <section className="enquiry-section job-management-section">
          <div className="analytics-heading">
            <div>
              <p className="admin-eyebrow">HR MANAGEMENT</p>
              <h2>Career Job Management</h2>
              <p>Total jobs: {jobs.length}</p>
            </div>

            <div className="job-toolbar">
              <button
                type="button"
                onClick={fetchJobs}
                disabled={jobsLoading}
              >
                {jobsLoading ? "Refreshing..." : "Refresh"}
              </button>

              <button
                type="button"
                className="job-primary-button"
                onClick={openCreateJobForm}
              >
                + Add New Job
              </button>
            </div>
          </div>

          {jobsError && (
            <p className="admin-error" role="alert">
              {jobsError}
            </p>
          )}

          {/* Create / Edit Job Form */}
          {showJobForm && (
            <form className="job-form" onSubmit={saveJob}>
              <div className="job-form-heading">
                <div>
                  <h3>
                    {editingJobId ? "Edit Job Opening" : "Create Job Opening"}
                  </h3>
                  <p>
                    Enter the vacancy details below.
                  </p>
                </div>

                <button
                  type="button"
                  className="job-close-button"
                  onClick={closeJobForm}
                  disabled={jobSaving}
                >
                  Close
                </button>
              </div>

              <div className="job-form-grid">
                <label>
                  Job Title *
                  <input
                    type="text"
                    name="title"
                    value={jobForm.title}
                    onChange={handleJobInput}
                    placeholder="e.g. Accountant"
                    maxLength={150}
                    required
                  />
                </label>

                <label>
                  Department *
                  <input
                    type="text"
                    name="department"
                    value={jobForm.department}
                    onChange={handleJobInput}
                    placeholder="e.g. Accounts"
                    maxLength={100}
                    required
                  />
                </label>

                <label>
                  Location *
                  <input
                    type="text"
                    name="location"
                    value={jobForm.location}
                    onChange={handleJobInput}
                    placeholder="e.g. Satna, Madhya Pradesh"
                    maxLength={150}
                    required
                  />
                </label>

                <label>
                  Employment Type *
                  <select
                    name="employment_type"
                    value={jobForm.employment_type}
                    onChange={handleJobInput}
                    required
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                    <option value="Temporary">Temporary</option>
                  </select>
                </label>

                <label>
                  Salary Range
                  <input
                    type="text"
                    name="salary_range"
                    value={jobForm.salary_range}
                    onChange={handleJobInput}
                    placeholder="e.g. ₹15,000 - ₹25,000"
                    maxLength={100}
                  />
                </label>

                <label>
                  Closing Date
                  <input
                    type="date"
                    name="closing_date"
                    value={jobForm.closing_date}
                    onChange={handleJobInput}
                  />
                </label>

                <label>
                  Job Status *
                  <select
                    name="status"
                    value={jobForm.status}
                    onChange={handleJobInput}
                    required
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active / Published</option>
                    <option value="closed">Closed</option>
                  </select>
                </label>

                <label className="job-full-width">
                  Job Description *
                  <textarea
                    name="description"
                    value={jobForm.description}
                    onChange={handleJobInput}
                    rows="5"
                    placeholder="Describe the job role and responsibilities..."
                    required
                  />
                </label>

                <label className="job-full-width">
                  Requirements
                  <textarea
                    name="requirements"
                    value={jobForm.requirements}
                    onChange={handleJobInput}
                    rows="4"
                    placeholder="Mention qualifications, skills and experience..."
                  />
                </label>
              </div>

              <div className="job-form-actions">
                <button
                  type="button"
                  onClick={closeJobForm}
                  disabled={jobSaving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="job-primary-button"
                  disabled={jobSaving}
                >
                  {jobSaving
                    ? "Saving..."
                    : editingJobId
                    ? "Update Job"
                    : "Create Job"}
                </button>
              </div>
            </form>
          )}

          {/* Jobs Table */}
          {jobsLoading ? (
            <p>Loading jobs...</p>
          ) : (
            <div className="enquiry-table-wrap">
              <table className="enquiry-table job-table">
                <thead>
                  <tr>
                    <th>Job Title</th>
                    <th>Department</th>
                    <th>Location</th>
                    <th>Employment</th>
                    <th>Closing Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {jobs.map((job) => (
                    <tr key={job.id}>
                      <td>
                        <strong>{job.title}</strong>
                        <small className="job-salary">
                          {job.salary_range || "Salary not specified"}
                        </small>
                      </td>
                      <td>{job.department}</td>
                      <td>{job.location}</td>
                      <td>{job.employment_type}</td>
                      <td>{formatDate(job.closing_date)}</td>
                      <td>
                        <span className={`job-status status-${job.status}`}>
                          {job.status}
                        </span>
                      </td>
                      <td>
                        <div className="job-row-actions">
                          <button
                            type="button"
                            onClick={() => openEditJobForm(job)}
                          >
                            Edit
                          </button>

                          <select
                            aria-label={`Change status for ${job.title}`}
                            value={job.status}
                            onChange={(event) =>
                              changeJobStatus(job.id, event.target.value)
                            }
                          >
                            {JOB_STATUSES.map((status) => (
                              <option key={status} value={status}>
                                {status.charAt(0).toUpperCase() +
                                  status.slice(1)}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {jobs.length === 0 && (
                    <tr>
                      <td colSpan="7">
                        No jobs found. Click "Add New Job" to create your first
                        vacancy.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}
    </main>
  );
}
