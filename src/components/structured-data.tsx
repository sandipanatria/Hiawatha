const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export function StructuredData() {
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "18334 Hiawatha",
    description:
      "Explore 18334 Hiawatha Street, a 1958 Palmer & Krisel modern home in Porter Ranch.",
    ...(siteUrl ? { url: siteUrl } : {}),
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "18334 Hiawatha",
    ...(siteUrl ? { url: siteUrl } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(website),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organization),
        }}
      />
    </>
  );
}