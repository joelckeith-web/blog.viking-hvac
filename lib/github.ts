import type { GeneratedBlog } from "./types";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const GITHUB_OWNER = process.env.GITHUB_OWNER || "joelckeith-web";
const GITHUB_REPO = process.env.GITHUB_REPO || "blog.viking-hvac";
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main";

interface GitHubFileResponse {
  content: string;
  sha: string;
}

async function githubAPI(endpoint: string, options: RequestInit = {}) {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`GitHub API error ${response.status}: ${error}`);
  }

  return response.json();
}

export async function pushPostToGitHub(blog: GeneratedBlog): Promise<string> {
  const filePath = blog.filePath;
  const contentBase64 = Buffer.from(blog.markdownContent).toString("base64");

  // Check if file already exists (to get SHA for update)
  let sha: string | undefined;
  try {
    const existing: GitHubFileResponse = await githubAPI(
      `/contents/${filePath}?ref=${GITHUB_BRANCH}`
    );
    sha = existing.sha;
  } catch {
    // File doesn't exist, that's fine
  }

  const result = await githubAPI(`/contents/${filePath}`, {
    method: "PUT",
    body: JSON.stringify({
      message: `Add weather-triggered post: ${blog.frontmatter.title}`,
      content: contentBase64,
      branch: GITHUB_BRANCH,
      ...(sha ? { sha } : {}),
    }),
  });

  return result.content.html_url;
}
