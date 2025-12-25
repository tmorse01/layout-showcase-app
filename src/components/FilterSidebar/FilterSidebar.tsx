import { useState, useMemo } from 'react';
import {
  TextField,
  Typography,
  Box,
  Chip,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Divider,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
import { layoutMetadata, type LayoutMetadata } from '../../config/layoutVariants';
import styles from './FilterSidebar.module.css';

export interface FilterSidebarProps {
  onFilterChange?: (filteredLayouts: LayoutMetadata[]) => void;
}

export function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTiers, setSelectedTiers] = useState<Set<string>>(new Set(['essential', 'modern', 'advanced']));
  const [selectedHeaderPatterns, setSelectedHeaderPatterns] = useState<Set<string>>(
    new Set(['app-only', 'app-page', 'page-only', 'none'])
  );

  // Filter layouts based on search and filters
  const filteredLayouts = useMemo(() => {
    return layoutMetadata.filter((layout) => {
      // Search filter
      const matchesSearch =
        searchQuery === '' ||
        layout.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        layout.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        layout.useCases.some((uc) => uc.toLowerCase().includes(searchQuery.toLowerCase())) ||
        layout.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));

      // Tier filter
      const matchesTier = selectedTiers.has(layout.tier);

      // Header pattern filter
      const matchesHeaderPattern = selectedHeaderPatterns.has(layout.headerPattern);

      return matchesSearch && matchesTier && matchesHeaderPattern;
    });
  }, [searchQuery, selectedTiers, selectedHeaderPatterns]);

  // Notify parent of filter changes
  useMemo(() => {
    onFilterChange?.(filteredLayouts);
  }, [filteredLayouts, onFilterChange]);

  const handleTierToggle = (tier: string) => {
    const newTiers = new Set(selectedTiers);
    if (newTiers.has(tier)) {
      newTiers.delete(tier);
    } else {
      newTiers.add(tier);
    }
    setSelectedTiers(newTiers);
  };

  const handleHeaderPatternToggle = (pattern: string) => {
    const newPatterns = new Set(selectedHeaderPatterns);
    if (newPatterns.has(pattern)) {
      newPatterns.delete(pattern);
    } else {
      newPatterns.add(pattern);
    }
    setSelectedHeaderPatterns(newPatterns);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTiers(new Set(['essential', 'modern', 'advanced']));
    setSelectedHeaderPatterns(new Set(['app-only', 'app-page', 'page-only', 'none']));
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedTiers.size < 3 ||
    selectedHeaderPatterns.size < 4;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <Typography variant="h6" component="h2" className={styles.title}>
          Filter Layouts
        </Typography>
        {hasActiveFilters && (
          <Chip
            label="Clear"
            size="small"
            onClick={clearFilters}
            onDelete={clearFilters}
            deleteIcon={<Clear fontSize="small" />}
            sx={{ cursor: 'pointer' }}
          />
        )}
      </div>

      <div className={styles.content}>
        {/* Search */}
        <Box className={styles.section}>
          <TextField
            fullWidth
            placeholder="Search layouts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setSearchQuery('')}
                    edge="end"
                    aria-label="Clear search"
                  >
                    <Clear fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {searchQuery && (
            <Typography variant="caption" color="text.secondary" className={styles.resultCount}>
              {filteredLayouts.length} result{filteredLayouts.length !== 1 ? 's' : ''}
            </Typography>
          )}
        </Box>

        <Divider className={styles.divider} />

        {/* Tier Filter */}
        <Box className={styles.section}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend" className={styles.filterLabel}>
              Complexity Tier
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedTiers.has('essential')}
                    onChange={() => handleTierToggle('essential')}
                    size="small"
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <span>Essential</span>
                    <Chip
                      label={layoutMetadata.filter((l) => l.tier === 'essential').length}
                      size="small"
                      sx={{
                        bgcolor: '#e3f2fd',
                        color: '#1976d2',
                        height: '20px',
                        fontSize: '0.7rem',
                      }}
                    />
                  </Box>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedTiers.has('modern')}
                    onChange={() => handleTierToggle('modern')}
                    size="small"
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <span>Modern</span>
                    <Chip
                      label={layoutMetadata.filter((l) => l.tier === 'modern').length}
                      size="small"
                      sx={{
                        bgcolor: '#f3e5f5',
                        color: '#7b1fa2',
                        height: '20px',
                        fontSize: '0.7rem',
                      }}
                    />
                  </Box>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedTiers.has('advanced')}
                    onChange={() => handleTierToggle('advanced')}
                    size="small"
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <span>Advanced</span>
                    <Chip
                      label={layoutMetadata.filter((l) => l.tier === 'advanced').length}
                      size="small"
                      sx={{
                        bgcolor: '#fff3e0',
                        color: '#e65100',
                        height: '20px',
                        fontSize: '0.7rem',
                      }}
                    />
                  </Box>
                }
              />
            </FormGroup>
          </FormControl>
        </Box>

        <Divider className={styles.divider} />

        {/* Header Pattern Filter */}
        <Box className={styles.section}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend" className={styles.filterLabel}>
              Header Pattern
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedHeaderPatterns.has('app-only')}
                    onChange={() => handleHeaderPatternToggle('app-only')}
                    size="small"
                  />
                }
                label="App Header Only"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedHeaderPatterns.has('app-page')}
                    onChange={() => handleHeaderPatternToggle('app-page')}
                    size="small"
                  />
                }
                label="App + Page Header"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedHeaderPatterns.has('page-only')}
                    onChange={() => handleHeaderPatternToggle('page-only')}
                    size="small"
                  />
                }
                label="Page Header Only"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedHeaderPatterns.has('none')}
                    onChange={() => handleHeaderPatternToggle('none')}
                    size="small"
                  />
                }
                label="No Header"
              />
            </FormGroup>
          </FormControl>
        </Box>

        <Divider className={styles.divider} />

        {/* Results Summary */}
        <Box className={styles.section}>
          <Typography variant="body2" color="text.secondary" className={styles.summary}>
            Showing {filteredLayouts.length} of {layoutMetadata.length} layouts
          </Typography>
        </Box>
      </div>
    </aside>
  );
}

