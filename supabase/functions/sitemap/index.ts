import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/xml; charset=utf-8",
};

const BASE_URL = "https://devtionary.lovable.app";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const [termsRes, categoriesRes] = await Promise.all([
      supabase.from("terms").select("slug, updated_at").order("word"),
      supabase.from("categories").select("slug, created_at").order("name"),
    ]);

    const terms = termsRes.data ?? [];
    const categories = categoriesRes.data ?? [];

    const staticPages = [
      { loc: "/", priority: "1.0", changefreq: "daily" },
      { loc: "/categories", priority: "0.8", changefreq: "weekly" },
      { loc: "/quiz", priority: "0.7", changefreq: "weekly" },
    ];

    const today = new Date().toISOString().split("T")[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

    for (const page of staticPages) {
      xml += `  <url>
    <loc>${BASE_URL}${page.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
    }

    for (const cat of categories) {
      xml += `  <url>
    <loc>${BASE_URL}/category/${cat.slug}</loc>
    <lastmod>${(cat.created_at ?? today).split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
    }

    for (const term of terms) {
      xml += `  <url>
    <loc>${BASE_URL}/term/${term.slug}</loc>
    <lastmod>${(term.updated_at ?? today).split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;
    }

    xml += `</urlset>`;

    return new Response(xml, { headers: corsHeaders });
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return new Response("<error>Failed to generate sitemap</error>", {
      status: 500,
      headers: corsHeaders,
    });
  }
});
