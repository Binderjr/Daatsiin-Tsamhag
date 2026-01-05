const fs = require("fs");

const BASE_URL = "https://daatsiintsamkhag.com";

const pages = [
  "/",
  "/about/",
  "/projects/",
  "/newsroom/",
  "/social-responsibility/",
  "/careers/",
  "/contact/"
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `
  <url>
    <loc>${BASE_URL}${p}</loc>
    <changefreq>weekly</changefreq>
    <priority>${p === "/" ? "1.0" : "0.8"}</priority>
  </url>
`).join("")}
</urlset>`;

fs.writeFileSync("sitemap.xml", sitemap);
console.log("sitemap.xml generated");
