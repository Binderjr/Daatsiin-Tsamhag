const pages = [
  "",
  "/about/",
  "/projects/",
  "/newsroom/",
  "/social-responsibility/",
  "/careers/",
  "/contact/"
];

const BASE_URL = "https://yourdomain.com";

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `
  <url>
    <loc>${BASE_URL}${p}</loc>
    <changefreq>weekly</changefreq>
    <priority>${p === "" ? "1.0" : "0.8"}</priority>
  </url>
`).join("")}
</urlset>
`;

console.log(sitemap);
