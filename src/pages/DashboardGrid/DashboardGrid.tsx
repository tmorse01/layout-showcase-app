import { AppFrame } from "../../components/AppFrame/AppFrame";
import {
  Paper,
  Typography,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  TrendingUp,
  TrendingDown,
  ArrowUpward,
  ArrowDownward,
  MoreVert,
} from "@mui/icons-material";
import { defaultNavItems } from "../../config/sidebarData";
import styles from "./DashboardGrid.module.css";

export function DashboardGrid() {
  // Sample KPI data
  const kpis = [
    {
      title: "Total Revenue",
      value: "$124,563",
      change: "+12.5%",
      trend: "up",
      period: "vs last month",
    },
    {
      title: "Active Users",
      value: "8,429",
      change: "+8.2%",
      trend: "up",
      period: "vs last month",
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      change: "-2.1%",
      trend: "down",
      period: "vs last month",
    },
    {
      title: "Avg. Order Value",
      value: "$89.42",
      change: "+5.7%",
      trend: "up",
      period: "vs last month",
    },
  ];

  // Sample chart data (simplified visualization)
  const chartData = [
    { month: "Jan", value: 45 },
    { month: "Feb", value: 52 },
    { month: "Mar", value: 48 },
    { month: "Apr", value: 61 },
    { month: "May", value: 55 },
    { month: "Jun", value: 67 },
  ];

  const maxValue = Math.max(...chartData.map((d) => d.value));

  // Sample table data
  const tableData = [
    { product: "Product A", sales: 1240, revenue: "$45,230", growth: "+12%" },
    { product: "Product B", sales: 980, revenue: "$32,150", growth: "+8%" },
    { product: "Product C", sales: 756, revenue: "$28,940", growth: "-3%" },
    { product: "Product D", sales: 542, revenue: "$19,820", growth: "+15%" },
    { product: "Product E", sales: 421, revenue: "$15,640", growth: "+5%" },
  ];

  return (
    <AppFrame showAppHeader showNav navItems={defaultNavItems}>
      <div className={styles.container}>
        {/* Page Title Section */}
        <div className={styles.header}>
          <div>
            <Typography variant="h4" component="h1" className={styles.title}>
              Dashboard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Overview of your business metrics and performance
            </Typography>
          </div>
          <Button variant="contained" size="medium">
            Export Report
          </Button>
        </div>

        {/* KPI Cards Grid */}
        <div className={styles.kpiGrid}>
          {kpis.map((kpi, index) => (
            <Paper key={index} className={styles.kpiCard} elevation={1}>
              <div className={styles.kpiHeader}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className={styles.kpiTitle}
                >
                  {kpi.title}
                </Typography>
                <Button size="small" className={styles.kpiMenu}>
                  <MoreVert fontSize="small" />
                </Button>
              </div>
              <Typography
                variant="h4"
                component="div"
                className={styles.kpiValue}
              >
                {kpi.value}
              </Typography>
              <div className={styles.kpiFooter}>
                <Chip
                  icon={
                    kpi.trend === "up" ? <ArrowUpward /> : <ArrowDownward />
                  }
                  label={kpi.change}
                  size="small"
                  color={kpi.trend === "up" ? "success" : "error"}
                  className={styles.kpiChip}
                />
                <Typography variant="caption" color="text.secondary">
                  {kpi.period}
                </Typography>
              </div>
            </Paper>
          ))}
        </div>

        {/* Charts Section */}
        <div className={styles.chartsGrid}>
          {/* Revenue Chart */}
          <Paper className={styles.chartCard} elevation={1}>
            <div className={styles.chartHeader}>
              <div>
                <Typography variant="h6" component="h2">
                  Revenue Trend
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Last 6 months
                </Typography>
              </div>
              <Chip label="Monthly" size="small" />
            </div>
            <div className={styles.chartContainer}>
              <div className={styles.chart}>
                {chartData.map((point, index) => (
                  <div key={index} className={styles.chartBar}>
                    <div
                      className={styles.bar}
                      style={{
                        height: `${(point.value / maxValue) * 100}%`,
                      }}
                    />
                    <Typography variant="caption" className={styles.barLabel}>
                      {point.month}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          </Paper>

          {/* Activity Chart */}
          <Paper className={styles.chartCard} elevation={1}>
            <div className={styles.chartHeader}>
              <div>
                <Typography variant="h6" component="h2">
                  User Activity
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Last 7 days
                </Typography>
              </div>
              <Chip label="Daily" size="small" />
            </div>
            <div className={styles.chartContainer}>
              <div className={styles.lineChart}>
                {[65, 72, 68, 75, 80, 78, 82].map((value, index) => (
                  <div key={index} className={styles.linePoint}>
                    <div
                      className={styles.lineDot}
                      style={{
                        bottom: `${value}%`,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Paper>
        </div>

        {/* Data Table Section */}
        <Paper className={styles.tableCard} elevation={1}>
          <div className={styles.tableHeader}>
            <div>
              <Typography variant="h6" component="h2">
                Top Products
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Best performing products this month
              </Typography>
            </div>
            <Button size="small">View All</Button>
          </div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Sales</TableCell>
                  <TableCell align="right">Revenue</TableCell>
                  <TableCell align="right">Growth</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row, index) => (
                  <TableRow key={index} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight={500}>
                        {row.product}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      {row.sales.toLocaleString()}
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" fontWeight={500}>
                        {row.revenue}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Chip
                        label={row.growth}
                        size="small"
                        color={row.growth.startsWith("+") ? "success" : "error"}
                        className={styles.growthChip}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Additional Stats Cards */}
        <div className={styles.statsGrid}>
          <Paper className={styles.statCard} elevation={1}>
            <Typography
              variant="body2"
              color="text.secondary"
              className={styles.statLabel}
            >
              New Customers
            </Typography>
            <Typography
              variant="h5"
              component="div"
              className={styles.statValue}
            >
              342
            </Typography>
            <div className={styles.statTrend}>
              <TrendingUp fontSize="small" color="success" />
              <Typography variant="caption" color="success.main">
                +18% from last month
              </Typography>
            </div>
          </Paper>

          <Paper className={styles.statCard} elevation={1}>
            <Typography
              variant="body2"
              color="text.secondary"
              className={styles.statLabel}
            >
              Pending Orders
            </Typography>
            <Typography
              variant="h5"
              component="div"
              className={styles.statValue}
            >
              127
            </Typography>
            <div className={styles.statTrend}>
              <TrendingDown fontSize="small" color="error" />
              <Typography variant="caption" color="error.main">
                -5% from last month
              </Typography>
            </div>
          </Paper>

          <Paper className={styles.statCard} elevation={1}>
            <Typography
              variant="body2"
              color="text.secondary"
              className={styles.statLabel}
            >
              Customer Satisfaction
            </Typography>
            <Typography
              variant="h5"
              component="div"
              className={styles.statValue}
            >
              4.8/5
            </Typography>
            <div className={styles.statTrend}>
              <TrendingUp fontSize="small" color="success" />
              <Typography variant="caption" color="success.main">
                +0.2 from last month
              </Typography>
            </div>
          </Paper>
        </div>
      </div>
    </AppFrame>
  );
}
