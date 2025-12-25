import { Link } from 'react-router-dom';
import { Paper, Typography, Chip } from '@mui/material';
import { layoutMetadata, getLayoutsByTier } from '../../config/layoutVariants';
import styles from './LayoutGallery.module.css';

export function LayoutGallery() {
  const essential = getLayoutsByTier('essential');
  const modern = getLayoutsByTier('modern');
  const advanced = getLayoutsByTier('advanced');

  return (
    <div className={styles.gallery}>
      <div className={styles.header}>
        <Typography variant="h3" component="h1">
          Layout Showcase
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Explore 15 canonical app shell layouts and page archetypes
        </Typography>
      </div>

      <section className={styles.section}>
        <Typography variant="h4" component="h2" className={styles.sectionTitle}>
          Top 5 (Essential)
        </Typography>
        <div className={styles.grid}>
          {essential.map((layout) => (
            <LayoutCard key={layout.id} layout={layout} />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <Typography variant="h4" component="h2" className={styles.sectionTitle}>
          Top 10 (Complete Modern Set)
        </Typography>
        <div className={styles.grid}>
          {modern.map((layout) => (
            <LayoutCard key={layout.id} layout={layout} />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <Typography variant="h4" component="h2" className={styles.sectionTitle}>
          Top 15 (Advanced / Specialized)
        </Typography>
        <div className={styles.grid}>
          {advanced.map((layout) => (
            <LayoutCard key={layout.id} layout={layout} />
          ))}
        </div>
      </section>
    </div>
  );
}

function LayoutCard({ layout }: { layout: typeof layoutMetadata[0] }) {
  return (
    <Paper className={styles.card} component={Link} to={layout.route}>
      <div className={styles.cardHeader}>
        <Typography variant="h6" component="h3">
          {layout.name}
        </Typography>
        <Chip label={layout.tier} size="small" />
      </div>
      <Typography variant="body2" color="text.secondary" className={styles.description}>
        {layout.description}
      </Typography>
      <div className={styles.features}>
        <Typography variant="caption" color="text.secondary">
          Header: {layout.headerPattern.replace('-', ' ')}
        </Typography>
      </div>
    </Paper>
  );
}

