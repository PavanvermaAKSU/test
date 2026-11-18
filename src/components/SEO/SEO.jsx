import { Helmet } from "react-helmet-async";

const SITE_URL = "https://samarveerautoandlubes.com";

function SEO({
  title,
  description,
  path = "/",
  image = "/logo.png",
  noIndex = false,
}) {
  const canonicalUrl = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />
      <meta
        name="robots"
        content={noIndex ? "noindex, nofollow" : "index, follow"}
      />

      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Samarveer Auto & Lubes Pvt. Ltd." />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={`${SITE_URL}${image}`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE_URL}${image}`} />
    </Helmet>
  );
}

export default SEO;