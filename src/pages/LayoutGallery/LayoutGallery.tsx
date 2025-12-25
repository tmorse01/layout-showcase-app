import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Paper, Typography, Chip, Box } from "@mui/material";
import {
  Dashboard,
  ViewSidebar,
  Article,
  ViewColumn,
  Assignment,
  Menu,
  Tab,
  Splitscreen,
  TableChart,
  Search,
  Info,
  Keyboard,
  Fullscreen,
  Timeline,
  ViewKanban,
  ArrowForward,
} from "@mui/icons-material";
import { AppFrame } from "../../components/AppFrame/AppFrame";
import { FilterSidebar } from "../../components/FilterSidebar/FilterSidebar";
import { layoutMetadata } from "../../config/layoutVariants";
import type { LayoutMetadata } from "../../types/layout";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import styles from "./LayoutGallery.module.css";

const layoutIcons: Record<string, React.ReactNode> = {
  "classic-app-shell": <ViewSidebar />,
  "dashboard-grid": <Dashboard />,
  "entity-detail": <Article />,
  "master-detail": <ViewColumn />,
  "form-workflow": <Assignment />,
  "collapsible-sidebar": <Menu />,
  "tabbed-content": <Tab />,
  "split-view": <Splitscreen />,
  "table-first": <TableChart />,
  "search-driven": <Search />,
  "right-inspector": <Info />,
  "command-centered": <Keyboard />,
  "focus-mode": <Fullscreen />,
  timeline: <Timeline />,
  kanban: <ViewKanban />,
};

const tierColors: Record<string, { bg: string; text: string }> = {
  essential: { bg: "#e3f2fd", text: "#1976d2" },
  modern: { bg: "#f3e5f5", text: "#7b1fa2" },
  advanced: { bg: "#fff3e0", text: "#e65100" },
};

const headerPatternLabels: Record<string, string> = {
  "app-only": "App Header",
  "app-page": "App + Page Header",
  "page-only": "Page Header",
  none: "No Header",
};

export function LayoutGallery() {
  useDocumentTitle("Layout Showcase");
  const [filteredLayouts, setFilteredLayouts] =
    useState<LayoutMetadata[]>(layoutMetadata);

  // Group filtered layouts by tier
  const layoutsByTier = useMemo(() => {
    const essential = filteredLayouts.filter((l) => l.tier === "essential");
    const modern = filteredLayouts.filter((l) => l.tier === "modern");
    const advanced = filteredLayouts.filter((l) => l.tier === "advanced");
    return { essential, modern, advanced };
  }, [filteredLayouts]);

  return (
    <AppFrame
      showAppHeader
      showNav
      navWidth={280}
      navContent={<FilterSidebar onFilterChange={setFilteredLayouts} />}
    >
      <div className={styles.gallery}>
        {/* Page Header */}
        <div className={styles.pageHeader}>
          <div>
            <Typography variant="h4" component="h1" className={styles.title}>
              Layout Showcase
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              className={styles.subtitle}
            >
              Explore {filteredLayouts.length} canonical app shell layouts and
              page archetypes
            </Typography>
          </div>
          <Box className={styles.stats}>
            <Chip
              label={`${filteredLayouts.length} layouts`}
              size="small"
              sx={{ fontWeight: 600 }}
            />
          </Box>
        </div>

        {/* Layouts Grid */}
        {filteredLayouts.length === 0 ? (
          <Box className={styles.emptyState}>
            <Typography variant="h6" color="text.secondary">
              No layouts match your filters
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search or filter criteria
            </Typography>
          </Box>
        ) : (
          <>
            {layoutsByTier.essential.length > 0 && (
              <section className={styles.section}>
                <Box className={styles.sectionHeader}>
                  <Typography
                    variant="h5"
                    component="h2"
                    className={styles.sectionTitle}
                  >
                    Essential Layouts
                  </Typography>
                  <Chip
                    label={`${layoutsByTier.essential.length} layouts`}
                    size="small"
                    sx={{
                      bgcolor: tierColors.essential.bg,
                      color: tierColors.essential.text,
                      fontWeight: 600,
                    }}
                  />
                </Box>
                <div className={styles.grid}>
                  {layoutsByTier.essential.map((layout) => (
                    <LayoutCard key={layout.id} layout={layout} />
                  ))}
                </div>
              </section>
            )}

            {layoutsByTier.modern.length > 0 && (
              <section className={styles.section}>
                <Box className={styles.sectionHeader}>
                  <Typography
                    variant="h5"
                    component="h2"
                    className={styles.sectionTitle}
                  >
                    Modern Set
                  </Typography>
                  <Chip
                    label={`${layoutsByTier.modern.length} layouts`}
                    size="small"
                    sx={{
                      bgcolor: tierColors.modern.bg,
                      color: tierColors.modern.text,
                      fontWeight: 600,
                    }}
                  />
                </Box>
                <div className={styles.grid}>
                  {layoutsByTier.modern.map((layout) => (
                    <LayoutCard key={layout.id} layout={layout} />
                  ))}
                </div>
              </section>
            )}

            {layoutsByTier.advanced.length > 0 && (
              <section className={styles.section}>
                <Box className={styles.sectionHeader}>
                  <Typography
                    variant="h5"
                    component="h2"
                    className={styles.sectionTitle}
                  >
                    Advanced & Specialized
                  </Typography>
                  <Chip
                    label={`${layoutsByTier.advanced.length} layouts`}
                    size="small"
                    sx={{
                      bgcolor: tierColors.advanced.bg,
                      color: tierColors.advanced.text,
                      fontWeight: 600,
                    }}
                  />
                </Box>
                <div className={styles.grid}>
                  {layoutsByTier.advanced.map((layout) => (
                    <LayoutCard key={layout.id} layout={layout} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </AppFrame>
  );
}

function LayoutCard({ layout }: { layout: (typeof layoutMetadata)[0] }) {
  const icon = layoutIcons[layout.id];
  const tierColor = tierColors[layout.tier];

  return (
    <Paper
      className={styles.card}
      component={Link}
      to={layout.route}
      sx={{
        "&:hover": {
          "& .cardIcon": {
            transform: "scale(1.08) rotate(3deg)",
            background: "var(--mui-palette-action-selected)",
          },
          "& .cardArrow": {
            transform: "translateX(6px)",
            opacity: 1,
          },
        },
      }}
    >
      <Box className={styles.cardIconContainer}>
        <Box
          className={`${styles.cardIcon} cardIcon`}
          sx={{ color: tierColor.text }}
        >
          {icon}
        </Box>
        <Chip
          label={layout.tier}
          size="small"
          sx={{
            bgcolor: tierColor.bg,
            color: tierColor.text,
            fontWeight: 600,
            fontSize: "0.7rem",
            height: "24px",
          }}
        />
      </Box>

      <Box className={styles.cardContent}>
        <Typography variant="h6" component="h3" className={styles.cardTitle}>
          {layout.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className={styles.description}
        >
          {layout.description}
        </Typography>
      </Box>

      <Box className={styles.cardFooter}>
        <Box className={styles.cardMeta}>
          <Chip
            label={headerPatternLabels[layout.headerPattern]}
            size="small"
            variant="outlined"
            sx={{ fontSize: "0.7rem", height: "22px" }}
          />
          <Typography
            variant="caption"
            color="text.secondary"
            className={styles.featureCount}
          >
            {layout.features.length} features
          </Typography>
        </Box>
        <Box className={`${styles.cardArrow} cardArrow`}>
          <ArrowForward fontSize="small" />
        </Box>
      </Box>
    </Paper>
  );
}
