import { NextRequest, NextResponse } from "next/server";
import { buildWeatherContext } from "@/lib/weather";
import { generateBlogPost } from "@/lib/content-generator";
import { pushPostToGitHub } from "@/lib/github";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    console.log("[CRON] Starting weather-triggered blog generation...");

    // Step 1: Build full weather context (historical + forecast + mode)
    const context = await buildWeatherContext();
    console.log(`[CRON] Mode: ${context.mode}`);
    console.log(`[CRON] Dominant hazard: ${context.dominantHazard}`);
    console.log(`[CRON] Affected services: ${context.affectedServices.join(", ")}`);
    console.log(`[CRON] Week: ${context.weekLabel}`);

    // Step 2: Generate content with Claude
    const blog = await generateBlogPost(context);
    console.log(`[CRON] Generated: "${blog.frontmatter.title}"`);
    console.log(`[CRON] File: ${blog.filePath}`);

    // Step 3: Push to GitHub
    const githubUrl = await pushPostToGitHub(blog);
    console.log(`[CRON] Pushed to GitHub: ${githubUrl}`);

    return NextResponse.json({
      success: true,
      post: {
        title: blog.frontmatter.title,
        slug: blog.frontmatter.slug,
        category: blog.frontmatter.category,
        weatherMode: blog.frontmatter.weatherMode,
        weatherWeek: blog.frontmatter.weatherWeek,
      },
      weather: {
        mode: context.mode,
        dominantHazard: context.dominantHazard,
        forecast: context.forecastSummary,
      },
      githubUrl,
    });
  } catch (error) {
    console.error("[CRON] Error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate blog post",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
