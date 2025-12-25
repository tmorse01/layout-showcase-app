import { Link } from "react-router-dom";
import { Button, Box } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import styles from "./BackToShowcase.module.css";

interface BackToShowcaseProps {
  /** Custom label for the button */
  label?: string;
  /** Position variant */
  variant?: "top" | "bottom" | "inline";
}

/**
 * BackToShowcase - Navigation button to return to the layout showcase
 *
 * Provides a consistent way to navigate back to the main layout gallery
 * from any individual layout page.
 */
export function BackToShowcase({
  label = "Back to Showcase",
  variant = "top",
}: BackToShowcaseProps) {
  return (
    <Box
      className={`${styles.container} ${styles[variant]}`}
      sx={{
        mb: variant === "top" ? 2 : 0,
        mt: variant === "bottom" ? 2 : 0,
      }}
    >
      <Button
        component={Link}
        to="/"
        startIcon={<ArrowBack />}
        variant="outlined"
        size="medium"
        className={styles.button}
        sx={{
          textTransform: "none",
          fontWeight: 500,
        }}
      >
        {label}
      </Button>
    </Box>
  );
}
