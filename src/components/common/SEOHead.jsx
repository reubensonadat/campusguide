import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Campus Guide';
const DEFAULT_DESCRIPTION = 'Your all-in-one campus companion — timetable, GPA tracker, assignments, and more.';
const BASE_URL = typeof window !== 'undefined' ? window.location.origin : '';

export default function SEOHead({ title, description, path, image }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Your Campus Companion`;
  const desc = description || DEFAULT_DESCRIPTION;
  const url = path ? `${BASE_URL}${path}` : BASE_URL;
  const ogImage = image || `${BASE_URL}/og-default.png`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
