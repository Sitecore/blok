export function StructuredData() {
  const baseUrl =
    process.env.NEXT_PUBLIC_REGISTRY_URL || "https://blok.sitecore.com";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sitecore",
    url: "https://www.sitecore.com",
    logo: `${baseUrl}/logo-blok.png`,
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Blok Design System",
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    description:
      "Sitecore's design system for building industry-leading martech applications",
    url: baseUrl,
    publisher: {
      "@type": "Organization",
      name: "Sitecore",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />
    </>
  );
}
