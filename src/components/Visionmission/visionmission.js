// vision.js
import React from "react";
import visionData from "./visiondata";
import "./visionmission.css";

const Vision = () => {
  const { heading, images, vision, mission, closing } = visionData;

  return (
    <section className="vm" aria-labelledby="vm-heading">
      {/* decorative slanted stripes, top right */}
      <div className="vm__stripes" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="vm__grid">
        {/* Heading */}
        <h2 id="vm-heading" className="vm__heading">
          {heading.map((line) => (
            <span key={line} className="vm__heading-line">
              {line}
            </span>
          ))}
        </h2>

        {/* Worker photo (tall) */}
        <figure className="vm__photo vm__photo--worker">
          <img
            src={images.worker.src}
            alt={images.worker.alt}
            loading="lazy"
            decoding="async"
          />
        </figure>

        {/* Mining photo + overlapping vision card */}
        <div className="vm__top">
          <figure className="vm__photo vm__photo--mining">
            <img
              src={images.mining.src}
              alt={images.mining.alt}
              loading="lazy"
              decoding="async"
            />
          </figure>

          <article className="vm__card">
            <h3 className="vm__card-title">{vision.title}</h3>
            <p className="vm__card-text">{vision.text}</p>
          </article>
        </div>

        {/* Mission */}
        <article className="vm__mission">
          <h3 className="vm__mission-title">{mission.title}</h3>
          <p className="vm__mission-intro">{mission.intro}</p>
          <ul className="vm__list">
            {mission.principles.map((item) => (
              <li key={item.id}>
                <strong>{item.label}</strong> {item.text}
              </li>
            ))}
          </ul>
        </article>
      </div>

      <p className="vm__closing">{closing}</p>
    </section>
  );
};

export default Vision;