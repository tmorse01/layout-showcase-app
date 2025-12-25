import { useState, useMemo } from "react";
import { AppFrame } from "../../components/AppFrame/AppFrame";
import {
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Chip,
  Button,
  IconButton,
} from "@mui/material";
import {
  Search,
  FilterList,
  Clear,
  Article,
  Description,
  Code,
  Image,
  VideoLibrary,
  Folder,
} from "@mui/icons-material";
import { defaultNavItems } from "../../config/sidebarData";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import styles from "./SearchDriven.module.css";

// Sample content items
interface ContentItem {
  id: string;
  title: string;
  type: "article" | "document" | "code" | "image" | "video" | "folder";
  category: string;
  tags: string[];
  description: string;
  author: string;
  date: string;
  relevance: number;
}

const sampleContent: ContentItem[] = [
  {
    id: "1",
    title: "Getting Started with React Hooks",
    type: "article",
    category: "Development",
    tags: ["react", "hooks", "javascript", "tutorial"],
    description: "A comprehensive guide to understanding and using React Hooks in your applications.",
    author: "Jane Smith",
    date: "2024-01-15",
    relevance: 95,
  },
  {
    id: "2",
    title: "API Documentation v2.1",
    type: "document",
    category: "Documentation",
    tags: ["api", "rest", "documentation"],
    description: "Complete API reference for version 2.1 including authentication, endpoints, and examples.",
    author: "API Team",
    date: "2024-01-20",
    relevance: 88,
  },
  {
    id: "3",
    title: "TypeScript Best Practices",
    type: "code",
    category: "Development",
    tags: ["typescript", "coding", "best-practices"],
    description: "Collection of TypeScript patterns and practices for writing maintainable code.",
    author: "John Doe",
    date: "2024-01-10",
    relevance: 92,
  },
  {
    id: "4",
    title: "Product Screenshots Gallery",
    type: "image",
    category: "Design",
    tags: ["screenshots", "ui", "design"],
    description: "High-resolution screenshots of the latest product features and UI updates.",
    author: "Design Team",
    date: "2024-01-18",
    relevance: 75,
  },
  {
    id: "5",
    title: "Onboarding Video Tutorial",
    type: "video",
    category: "Training",
    tags: ["video", "tutorial", "onboarding"],
    description: "Step-by-step video guide for new users to get started with the platform.",
    author: "Training Team",
    date: "2024-01-12",
    relevance: 80,
  },
  {
    id: "6",
    title: "Component Library",
    type: "folder",
    category: "Development",
    tags: ["components", "library", "ui"],
    description: "Reusable UI components and their documentation.",
    author: "Frontend Team",
    date: "2024-01-05",
    relevance: 85,
  },
  {
    id: "7",
    title: "CSS Grid Layout Guide",
    type: "article",
    category: "Development",
    tags: ["css", "grid", "layout", "tutorial"],
    description: "Learn how to create responsive layouts using CSS Grid with practical examples.",
    author: "Jane Smith",
    date: "2024-01-08",
    relevance: 90,
  },
  {
    id: "8",
    title: "User Research Findings",
    type: "document",
    category: "Research",
    tags: ["research", "user-study", "findings"],
    description: "Summary of user research conducted in Q4 2023 with key insights and recommendations.",
    author: "UX Research",
    date: "2024-01-22",
    relevance: 70,
  },
  {
    id: "9",
    title: "Authentication Service",
    type: "code",
    category: "Development",
    tags: ["auth", "security", "backend"],
    description: "Implementation of JWT-based authentication service with refresh tokens.",
    author: "Backend Team",
    date: "2024-01-14",
    relevance: 88,
  },
  {
    id: "10",
    title: "Brand Assets",
    type: "folder",
    category: "Design",
    tags: ["brand", "assets", "logos"],
    description: "Official brand assets including logos, color palettes, and style guidelines.",
    author: "Brand Team",
    date: "2024-01-03",
    relevance: 65,
  },
];

const categories = ["All", "Development", "Documentation", "Design", "Training", "Research"];
const typeIcons = {
  article: Article,
  document: Description,
  code: Code,
  image: Image,
  video: VideoLibrary,
  folder: Folder,
};

export function SearchDriven() {
  useDocumentTitle("Search-Driven Layout - Layout Showcase");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get all unique tags from content
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    sampleContent.forEach((item) => {
      item.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // Filter content based on search query, category, and tags
  const filteredContent = useMemo(() => {
    return sampleContent.filter((item) => {
      // Search query filter
      const matchesSearch =
        searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      // Category filter
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;

      // Tags filter
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => item.tags.includes(tag));

      return matchesSearch && matchesCategory && matchesTags;
    });
  }, [searchQuery, selectedCategory, selectedTags]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedTags([]);
  };

  const hasActiveFilters = searchQuery !== "" || selectedCategory !== "All" || selectedTags.length > 0;

  return (
    <AppFrame showAppHeader showNav navItems={defaultNavItems}>
      <div className={styles.container}>
        {/* Prominent Search Bar */}
        <div className={styles.searchSection}>
          <Typography variant="h4" component="h1" className={styles.title}>
            Search
          </Typography>
          <Typography variant="body2" color="text.secondary" className={styles.subtitle}>
            Find documents, articles, code, and more
          </Typography>
          <Paper className={styles.searchBar} elevation={2}>
            <TextField
              fullWidth
              placeholder="Search for anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="action" />
                  </InputAdornment>
                ),
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => setSearchQuery("")}
                      aria-label="clear search"
                    >
                      <Clear fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              className={styles.searchInput}
            />
          </Paper>
        </div>

        {/* Filters Section */}
        <div className={styles.filtersSection}>
          <div className={styles.filterGroup}>
            <div className={styles.filterLabel}>
              <FilterList fontSize="small" />
              <Typography variant="body2" fontWeight={500}>
                Category
              </Typography>
            </div>
            <div className={styles.filterChips}>
              {categories.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  onClick={() => setSelectedCategory(category)}
                  color={selectedCategory === category ? "primary" : "default"}
                  variant={selectedCategory === category ? "filled" : "outlined"}
                  size="small"
                />
              ))}
            </div>
          </div>

          {selectedTags.length > 0 && (
            <div className={styles.filterGroup}>
              <div className={styles.filterLabel}>
                <Typography variant="body2" fontWeight={500}>
                  Selected Tags
                </Typography>
              </div>
              <div className={styles.filterChips}>
                {selectedTags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => handleTagToggle(tag)}
                    color="primary"
                    size="small"
                  />
                ))}
              </div>
            </div>
          )}

          {hasActiveFilters && (
            <Button
              size="small"
              onClick={clearFilters}
              startIcon={<Clear />}
              className={styles.clearButton}
            >
              Clear Filters
            </Button>
          )}
        </div>

        {/* Results Section */}
        <div className={styles.resultsSection}>
          <div className={styles.resultsHeader}>
            <Typography variant="h6" component="h2">
              {filteredContent.length} {filteredContent.length === 1 ? "result" : "results"}
              {searchQuery && ` for "${searchQuery}"`}
            </Typography>
            {selectedTags.length > 0 && (
              <div className={styles.availableTags}>
                <Typography variant="body2" color="text.secondary">
                  Filter by tags:
                </Typography>
                <div className={styles.tagChips}>
                  {allTags
                    .filter((tag) => !selectedTags.includes(tag))
                    .map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        onClick={() => handleTagToggle(tag)}
                        variant="outlined"
                        size="small"
                      />
                    ))}
                </div>
              </div>
            )}
            {selectedTags.length === 0 && (
              <div className={styles.availableTags}>
                <Typography variant="body2" color="text.secondary">
                  Popular tags:
                </Typography>
                <div className={styles.tagChips}>
                  {allTags.slice(0, 8).map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      onClick={() => handleTagToggle(tag)}
                      variant="outlined"
                      size="small"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {filteredContent.length === 0 ? (
            <Paper className={styles.emptyState} elevation={0}>
              <Search fontSize="large" color="disabled" />
              <Typography variant="h6" color="text.secondary">
                No results found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try adjusting your search query or filters
              </Typography>
            </Paper>
          ) : (
            <div className={styles.resultsList}>
              {filteredContent.map((item) => {
                const IconComponent = typeIcons[item.type];
                return (
                  <Paper key={item.id} className={styles.resultItem} elevation={1}>
                    <div className={styles.resultHeader}>
                      <div className={styles.resultIcon}>
                        <IconComponent fontSize="small" />
                      </div>
                      <div className={styles.resultTitleSection}>
                        <Typography variant="h6" component="h3" className={styles.resultTitle}>
                          {item.title}
                        </Typography>
                        <div className={styles.resultMeta}>
                          <Chip
                            label={item.category}
                            size="small"
                            variant="outlined"
                            className={styles.categoryChip}
                          />
                          <Typography variant="caption" color="text.secondary">
                            {item.author} • {item.date}
                          </Typography>
                        </div>
                      </div>
                      <Chip
                        label={`${item.relevance}% match`}
                        size="small"
                        color="primary"
                        variant="outlined"
                        className={styles.relevanceChip}
                      />
                    </div>
                    <Typography variant="body2" color="text.secondary" className={styles.resultDescription}>
                      {item.description}
                    </Typography>
                    <div className={styles.resultTags}>
                      {item.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          variant="outlined"
                          onClick={() => handleTagToggle(tag)}
                          className={styles.tagChip}
                        />
                      ))}
                    </div>
                  </Paper>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </AppFrame>
  );
}
