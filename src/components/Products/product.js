// clients.js
import React, { useState } from "react";
import "./product.css";
import { clients, clientsHeading } from "./productdata";

// One logo. Falls back to the company name if the image is missing.
const ClientLogo = ({ client }) => {
  const [failed, setFailed] = useState(false);

  return (
    <div className="cl-item" title={client.name}>
      {failed ? (
        <span className="cl-fallback">{client.name}</span>
      ) : (
        <img
          src={client.logo}
          alt={`${client.name} logo`}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
};

const Clients = () => {
  return (
    <section className="cl-section" id="clients">
      <div className="cl-wrap">
        <div className="cl-head">
          <p className="cl-label">{clientsHeading.label}</p>
          <h2 className="cl-title">{clientsHeading.title}</h2>
        </div>

        <div className="cl-grid">
          {clients.map((c) => (
            <ClientLogo client={c} key={c.name} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;