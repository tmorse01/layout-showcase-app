import { useState, useEffect } from "react";
import { AppFrame } from "../../components/AppFrame/AppFrame";
import {
  IconButton,
  Paper,
  Typography,
  Box,
  Fade,
  Tooltip,
  Button,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  ArrowBack,
  Save,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import styles from "./FocusMode.module.css";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

/**
 * Focus Mode Layout
 *
 * Distraction-free layout that hides all navigation and headers for
 * focused editing, writing, or reviewing. Demonstrates a full-screen
 * content experience with optional minimal controls.
 *
 * Header Pattern: none (no headers, no navigation)
 * - Full viewport for content
 * - Optional floating controls that can be toggled
 * - Perfect for writing interfaces, review modes, presentation views
 */
export function FocusMode() {
  useDocumentTitle("Full-Screen Focus Mode - Layout Showcase");
  const [showControls, setShowControls] = useState(true);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  // Sample content for demonstration
  const [content, setContent] = useState(`# Project Proposal: Q4 Initiative

## Executive Summary

This proposal outlines a strategic initiative for Q4 that will enhance our product capabilities and drive customer satisfaction. The focus is on improving user experience through thoughtful design and robust implementation.

## Background

Over the past quarter, we've identified several key areas where our current solution could be improved. Customer feedback has been overwhelmingly positive about our direction, but there are specific pain points that need addressing.

## Objectives

1. **Improve Performance**: Reduce load times by 40% through optimization
2. **Enhance Usability**: Streamline the user workflow to reduce task completion time
3. **Increase Engagement**: Implement features that encourage daily usage

## Approach

Our approach will be iterative, with weekly sprints and regular stakeholder reviews. We'll prioritize features based on user impact and technical feasibility.

## Timeline

- **Week 1-2**: Research and planning
- **Week 3-6**: Core development
- **Week 7-8**: Testing and refinement
- **Week 9-10**: Launch preparation

## Expected Outcomes

By the end of Q4, we expect to see:
- 40% reduction in page load times
- 25% increase in user engagement
- Positive customer feedback scores above 4.5/5

## Next Steps

1. Secure stakeholder approval
2. Allocate resources
3. Begin sprint planning
4. Set up project tracking`);

  // Calculate word and character counts
  useEffect(() => {
    const words = content
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    setWordCount(words.length);
    setCharCount(content.length);
  }, [content]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <AppFrame showAppHeader={false} showNav={false}>
      <div className={styles.container}>
        {/* Floating toggle button */}
        <Fade in={true}>
          <div className={styles.toggleButton}>
            <Tooltip title={showControls ? "Hide controls" : "Show controls"}>
              <IconButton
                onClick={() => setShowControls(!showControls)}
                size="small"
                className={styles.toggleIcon}
                aria-label="Toggle controls"
              >
                {showControls ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </Tooltip>
          </div>
        </Fade>

        {/* Floating controls panel */}
        <Fade in={showControls}>
          <div className={styles.controlsPanel}>
            <Paper
              elevation={4}
              className={styles.controlsPaper}
              sx={{ p: 1.5, display: "flex", alignItems: "center", gap: 1 }}
            >
              {/* Back button */}
              <Button
                component={Link}
                to="/"
                startIcon={<ArrowBack />}
                size="small"
                variant="outlined"
                sx={{ textTransform: "none" }}
              >
                Exit Focus
              </Button>

              <Box sx={{ flex: 1 }} />

              {/* Formatting buttons */}
              <Tooltip title="Bold">
                <IconButton size="small" aria-label="Bold">
                  <FormatBold fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Italic">
                <IconButton size="small" aria-label="Italic">
                  <FormatItalic fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Bullet list">
                <IconButton size="small" aria-label="Bullet list">
                  <FormatListBulleted fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Numbered list">
                <IconButton size="small" aria-label="Numbered list">
                  <FormatListNumbered fontSize="small" />
                </IconButton>
              </Tooltip>

              <Box sx={{ flex: 1 }} />

              {/* Stats */}
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mr: 1 }}
              >
                {wordCount} words
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {charCount} chars
              </Typography>

              {/* Save button */}
              <Button
                startIcon={<Save />}
                size="small"
                variant="contained"
                sx={{ textTransform: "none", ml: 1 }}
              >
                Save
              </Button>
            </Paper>
          </div>
        </Fade>

        {/* Main content area */}
        <div className={styles.contentArea}>
          <textarea
            className={styles.editor}
            value={content}
            onChange={handleContentChange}
            placeholder="Start writing..."
            spellCheck={false}
          />
        </div>

        {/* Footer stats (always visible, minimal) */}
        <Paper elevation={2} className={styles.footer}>
          <Typography variant="caption" color="text.secondary">
            Focus Mode • Press Ctrl+S to save
          </Typography>
        </Paper>
      </div>
    </AppFrame>
  );
}
