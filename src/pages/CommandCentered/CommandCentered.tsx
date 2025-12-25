import { useState, useEffect, useRef } from 'react';
import { AppFrame } from '../../components/AppFrame/AppFrame';
import { TextField, Typography, Paper, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LaunchIcon from '@mui/icons-material/Launch';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import styles from './CommandCentered.module.css';

interface Command {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  shortcut?: string;
  category: string;
  action: () => void;
}

const commands: Command[] = [
  {
    id: 'new-file',
    label: 'New File',
    description: 'Create a new file',
    icon: <AddIcon fontSize="small" />,
    shortcut: 'Ctrl+N',
    category: 'File',
    action: () => console.log('New file'),
  },
  {
    id: 'open-file',
    label: 'Open File',
    description: 'Open an existing file',
    icon: <LaunchIcon fontSize="small" />,
    shortcut: 'Ctrl+O',
    category: 'File',
    action: () => console.log('Open file'),
  },
  {
    id: 'save',
    label: 'Save',
    description: 'Save current file',
    icon: <FileCopyIcon fontSize="small" />,
    shortcut: 'Ctrl+S',
    category: 'File',
    action: () => console.log('Save'),
  },
  {
    id: 'dashboard',
    label: 'Go to Dashboard',
    description: 'Navigate to dashboard',
    icon: <DashboardIcon fontSize="small" />,
    shortcut: 'Ctrl+D',
    category: 'Navigation',
    action: () => console.log('Go to dashboard'),
  },
  {
    id: 'settings',
    label: 'Open Settings',
    description: 'Open application settings',
    icon: <SettingsIcon fontSize="small" />,
    shortcut: 'Ctrl+,',
    category: 'Settings',
    action: () => console.log('Open settings'),
  },
  {
    id: 'edit',
    label: 'Edit',
    description: 'Edit current item',
    icon: <EditIcon fontSize="small" />,
    shortcut: 'Ctrl+E',
    category: 'Actions',
    action: () => console.log('Edit'),
  },
  {
    id: 'delete',
    label: 'Delete',
    description: 'Delete current item',
    icon: <DeleteIcon fontSize="small" />,
    shortcut: 'Delete',
    category: 'Actions',
    action: () => console.log('Delete'),
  },
];

export function CommandCentered() {
  useDocumentTitle("Command-Centered Layout - Layout Showcase");
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Filter commands based on search query
  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group commands by category
  const groupedCommands = filteredCommands.reduce(
    (acc, cmd) => {
      if (!acc[cmd.category]) {
        acc[cmd.category] = [];
      }
      acc[cmd.category].push(cmd);
      return acc;
    },
    {} as Record<string, Command[]>
  );

  // Handle Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K on Mac, Ctrl+K on Windows/Linux
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
      // Escape to close
      if (e.key === 'Escape' && open) {
        setOpen(false);
        setSearchQuery('');
        setSelectedIndex(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  // Focus search input when menu opens
  useEffect(() => {
    if (open && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 0);
    }
  }, [open]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredCommands.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredCommands.length - 1
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
          setOpen(false);
          setSearchQuery('');
          setSelectedIndex(0);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, filteredCommands, selectedIndex]);

  const handleCommandSelect = (command: Command) => {
    command.action();
    setOpen(false);
    setSearchQuery('');
    setSelectedIndex(0);
  };

  return (
    <AppFrame showAppHeader={false} showNav={false}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Typography variant="h4" className={styles.title}>
            Command-Centered Layout
          </Typography>
          <Typography variant="body1" className={styles.description}>
            Minimal UI relying on command palettes or keyboard-first interactions.
          </Typography>

          <Paper className={styles.hintCard} elevation={1}>
            <Typography variant="body2" className={styles.hintText}>
              Press <kbd className={styles.kbd}>⌘K</kbd> or{' '}
              <kbd className={styles.kbd}>Ctrl+K</kbd> to open the command palette
            </Typography>
          </Paper>

          <div className={styles.features}>
            <Typography variant="h6" className={styles.featuresTitle}>
              Features
            </Typography>
            <ul className={styles.featuresList}>
              <li>Keyboard-first interaction (Cmd+K / Ctrl+K)</li>
              <li>Searchable command palette</li>
              <li>Minimal UI with no navigation chrome</li>
              <li>Fast command execution</li>
            </ul>
          </div>
        </div>

        {/* Command Palette */}
        {open && (
          <div className={styles.overlay} onClick={() => setOpen(false)}>
            <Paper
              className={styles.palette}
              elevation={8}
              onClick={(e) => e.stopPropagation()}
              ref={menuRef}
            >
              <div className={styles.paletteHeader}>
                <SearchIcon className={styles.searchIcon} />
                <TextField
                  inputRef={searchInputRef}
                  placeholder="Type to search commands..."
                  variant="standard"
                  fullWidth
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  className={styles.searchInput}
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
              </div>
              <Divider />
              <div className={styles.commandsList}>
                {filteredCommands.length === 0 ? (
                  <div className={styles.noResults}>
                    <Typography variant="body2" color="text.secondary">
                      No commands found
                    </Typography>
                  </div>
                ) : (
                  Object.entries(groupedCommands).map(([category, cmds]) => (
                    <div key={category} className={styles.categoryGroup}>
                      <Typography
                        variant="caption"
                        className={styles.categoryLabel}
                      >
                        {category}
                      </Typography>
                      {cmds.map((cmd) => {
                        const globalIndex = filteredCommands.indexOf(cmd);
                        return (
                          <div
                            key={cmd.id}
                            className={`${styles.commandItem} ${
                              globalIndex === selectedIndex
                                ? styles.commandItemSelected
                                : ''
                            }`}
                            onClick={() => handleCommandSelect(cmd)}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                          >
                            <div className={styles.commandIcon}>{cmd.icon}</div>
                            <div className={styles.commandContent}>
                              <Typography variant="body2" className={styles.commandLabel}>
                                {cmd.label}
                              </Typography>
                              {cmd.description && (
                                <Typography
                                  variant="caption"
                                  className={styles.commandDescription}
                                >
                                  {cmd.description}
                                </Typography>
                              )}
                            </div>
                            {cmd.shortcut && (
                              <div className={styles.commandShortcut}>
                                {cmd.shortcut.split('+').map((key, i) => (
                                  <kbd key={i} className={styles.kbd}>
                                    {key}
                                  </kbd>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>
            </Paper>
          </div>
        )}
      </div>
    </AppFrame>
  );
}
