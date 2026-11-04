
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8000";

function getVisitorId() {
  let visitorId = localStorage.getItem("sv_visitor_id");

  if (!visitorId) {
    visitorId =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : "sv-" +
          Date.now().toString(36) +
          "-" +
          Math.random().toString(36).slice(2);

    localStorage.setItem("sv_visitor_id", visitorId);
  }

  return visitorId;
}

export default function VisitorTracker() {
  const location = useLocation();
  const lastTrackedPath = useRef("");

  useEffect(() => {
    const pagePath = location.pathname;

    // Admin visits ko public visitor analytics mein count nahi karna.
    if (pagePath.startsWith("/admin")) return;

    // React development mode mein duplicate tracking se bachao.
    if (lastTrackedPath.current === pagePath) return;
    lastTrackedPath.current = pagePath;

    let referrerSource = null;

    try {
      if (document.referrer) {
        referrerSource = new URL(document.referrer).origin;
      }
    } catch {
      referrerSource = null;
    }

    fetch(`${API_URL}/api/analytics/page-view`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        visitor_id: getVisitorId(),
        page_path: pagePath,
        referrer_source: referrerSource,
      }),
    }).catch((error) => {
      console.error("Visitor tracking failed:", error);
    });
  }, [location.pathname]);

  return null;
}
