import { Code as CodeIcon } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useLocation } from "react-router-dom";

/**
 * Convert kebab-case route ID to PascalCase component name
 * e.g., "split-view" -> "SplitView", "classic-app-shell" -> "ClassicAppShell"
 */
function kebabToPascal(kebab: string): string {
  return kebab
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

/**
 * Get GitHub URL based on current route
 * - Showcase page ("/") -> repo root
 * - Layout pages ("/layouts/{id}") -> specific layout file
 */
function getGitHubUrl(pathname: string): string {
  const repoBase = "https://github.com/tmorse01/layout-showcase-app";

  // Showcase page
  if (pathname === "/") {
    return repoBase;
  }

  // Layout pages: /layouts/{layout-id}
  const layoutMatch = pathname.match(/^\/layouts\/(.+)$/);
  if (layoutMatch) {
    const layoutId = layoutMatch[1];
    const componentName = kebabToPascal(layoutId);
    return `${repoBase}/blob/master/src/pages/${componentName}/${componentName}.tsx`;
  }

  // Fallback to repo root
  return repoBase;
}

export interface GitHubLinkProps {
  /** Size of the icon button */
  size?: "small" | "medium" | "large";
}

/**
 * GitHubLink - Component that links to the GitHub repository
 *
 * Automatically determines the correct URL based on the current route:
 * - Showcase page -> repo root
 * - Layout pages -> specific layout file
 */
export function GitHubLink({ size = "small" }: GitHubLinkProps) {
  const location = useLocation();
  const githubUrl = getGitHubUrl(location.pathname);

  return (
    <Tooltip title="View code on GitHub">
      <IconButton
        component="a"
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View code on GitHub"
        size={size}
      >
        <CodeIcon fontSize={size} />
      </IconButton>
    </Tooltip>
  );
}

