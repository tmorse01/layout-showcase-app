import { useState, useMemo } from "react";
import { AppFrame } from "../../components/AppFrame/AppFrame";
import { defaultNavItems } from "../../config/sidebarData";
import {
  Paper,
  Typography,
  Button,
  TextField,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Menu,
  MenuItem,
  InputAdornment,
  Checkbox,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import {
  Download as DownloadIcon,
  Add as AddIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Pending as PendingIcon,
} from "@mui/icons-material";
import styles from "./TableFirst.module.css";

// Sample data for the table
interface OrderData {
  id: string;
  orderNumber: string;
  customer: string;
  email: string;
  product: string;
  quantity: number;
  amount: number;
  status: "completed" | "pending" | "cancelled";
  date: string;
  paymentMethod: string;
}

const generateSampleData = (): OrderData[] => {
  const statuses: ("completed" | "pending" | "cancelled")[] = [
    "completed",
    "pending",
    "cancelled",
  ];
  const products = [
    "Premium Widget",
    "Standard Widget",
    "Deluxe Widget",
    "Basic Widget",
    "Pro Widget",
  ];
  const customers = [
    "John Smith",
    "Sarah Johnson",
    "Michael Brown",
    "Emily Davis",
    "David Wilson",
    "Lisa Anderson",
    "Robert Taylor",
    "Jennifer Martinez",
  ];
  const paymentMethods = ["Credit Card", "PayPal", "Bank Transfer", "Stripe"];

  return Array.from({ length: 50 }, (_, i) => ({
    id: `ORD-${String(i + 1).padStart(4, "0")}`,
    orderNumber: `#${10000 + i}`,
    customer: customers[i % customers.length],
    email: `${customers[i % customers.length]
      .toLowerCase()
      .replace(" ", ".")}@example.com`,
    product: products[i % products.length],
    quantity: Math.floor(Math.random() * 10) + 1,
    amount: Math.floor(Math.random() * 1000) + 50,
    status: statuses[i % statuses.length],
    date: new Date(
      Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
    ).toLocaleDateString(),
    paymentMethod: paymentMethods[i % paymentMethods.length],
  }));
};

export function TableFirst() {
  const [data] = useState<OrderData[]>(generateSampleData());
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Filter data based on search and status using useMemo
  const filteredData = useMemo(() => {
    let filtered = data;

    if (searchTerm) {
      filtered = filtered.filter(
        (row) =>
          row.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          row.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          row.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          row.product.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((row) => row.status === statusFilter);
    }

    return filtered;
  }, [data, searchTerm, statusFilter]);

  // Handle search input
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset to first page when filtering
  };

  // Handle status filter change
  const handleStatusFilterChange = (event: SelectChangeEvent<string>) => {
    setStatusFilter(event.target.value);
    setPage(0); // Reset to first page when filtering
  };

  // Handle row selection
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = filteredData
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row) => row.id);
      setSelectedRows(newSelected);
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  // Handle pagination
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Get status icon and color
  const getStatusDisplay = (status: OrderData["status"]) => {
    switch (status) {
      case "completed":
        return {
          icon: <CheckCircleIcon fontSize="small" />,
          color: "success" as const,
          label: "Completed",
        };
      case "pending":
        return {
          icon: <PendingIcon fontSize="small" />,
          color: "warning" as const,
          label: "Pending",
        };
      case "cancelled":
        return {
          icon: <CancelIcon fontSize="small" />,
          color: "error" as const,
          label: "Cancelled",
        };
    }
  };

  // Menu handlers
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppFrame showAppHeader showNav navItems={defaultNavItems}>
      <div className={styles.container}>
        {/* Page Header */}
        <div className={styles.pageHeader}>
          <div>
            <Typography variant="h4" component="h1" className={styles.title}>
              Orders
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage and track all customer orders
            </Typography>
          </div>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            size="medium"
            className={styles.addButton}
          >
            New Order
          </Button>
        </div>

        {/* Toolbar with Filters and Actions */}
        <Paper className={styles.toolbar} elevation={1}>
          <div className={styles.toolbarLeft}>
            {/* Search */}
            <TextField
              placeholder="Search orders, customers, products..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              className={styles.searchField}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            {/* Status Filter */}
            <FormControl size="small" className={styles.filterControl}>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={handleStatusFilterChange}
                label="Status"
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>

            {/* Active Filters Display */}
            {(searchTerm || statusFilter !== "all") && (
              <Chip
                label={`${filteredData.length} results`}
                size="small"
                onDelete={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                }}
                className={styles.filterChip}
              />
            )}
          </div>

          <div className={styles.toolbarRight}>
            {/* Bulk Actions */}
            {selectedRows.length > 0 && (
              <Chip
                label={`${selectedRows.length} selected`}
                size="small"
                onDelete={() => setSelectedRows([])}
                className={styles.selectionChip}
              />
            )}

            {/* Action Buttons */}
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              size="small"
              className={styles.actionButton}
            >
              Export
            </Button>
            <IconButton
              size="small"
              onClick={handleMenuOpen}
              className={styles.moreButton}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Refresh</MenuItem>
              <MenuItem onClick={handleMenuClose}>Import</MenuItem>
              <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            </Menu>
          </div>
        </Paper>

        {/* Data Table */}
        <Paper className={styles.tablePaper} elevation={1}>
          <TableContainer className={styles.tableContainer}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox" className={styles.checkboxCell}>
                    <Checkbox
                      indeterminate={
                        selectedRows.length > 0 &&
                        selectedRows.length <
                          filteredData.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          ).length
                      }
                      checked={
                        filteredData.length > 0 &&
                        selectedRows.length ===
                          filteredData.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          ).length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell className={styles.headerCell}>Order #</TableCell>
                  <TableCell className={styles.headerCell}>Customer</TableCell>
                  <TableCell className={styles.headerCell}>Email</TableCell>
                  <TableCell className={styles.headerCell}>Product</TableCell>
                  <TableCell align="right" className={styles.headerCell}>
                    Quantity
                  </TableCell>
                  <TableCell align="right" className={styles.headerCell}>
                    Amount
                  </TableCell>
                  <TableCell className={styles.headerCell}>Status</TableCell>
                  <TableCell className={styles.headerCell}>Date</TableCell>
                  <TableCell className={styles.headerCell}>Payment</TableCell>
                  <TableCell align="center" className={styles.headerCell}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const isSelected = selectedRows.includes(row.id);
                    const statusDisplay = getStatusDisplay(row.status);

                    return (
                      <TableRow
                        key={row.id}
                        hover
                        selected={isSelected}
                        className={styles.tableRow}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isSelected}
                            onChange={() => handleSelectRow(row.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight={500}>
                            {row.orderNumber}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {row.customer}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            className={styles.emailCell}
                          >
                            {row.email}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{row.product}</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2">
                            {row.quantity}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" fontWeight={500}>
                            ${row.amount.toFixed(2)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            icon={statusDisplay.icon}
                            label={statusDisplay.label}
                            size="small"
                            color={statusDisplay.color}
                            className={styles.statusChip}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {row.date}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {row.paymentMethod}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <IconButton size="small" className={styles.rowAction}>
                            <MoreVertIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {filteredData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={11} align="center">
                      <Typography variant="body2" color="text.secondary">
                        No orders found
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <TablePagination
            component="div"
            count={filteredData.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 25, 50, 100]}
            className={styles.pagination}
          />
        </Paper>

        {/* Summary Stats */}
        <div className={styles.summary}>
          <Typography variant="body2" color="text.secondary">
            Showing {page * rowsPerPage + 1}-
            {Math.min((page + 1) * rowsPerPage, filteredData.length)} of{" "}
            {filteredData.length} orders
          </Typography>
        </div>
      </div>
    </AppFrame>
  );
}
