import { useState } from "react";
import { AppFrame } from "../../components/AppFrame/AppFrame";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { defaultNavItems } from "../../config/sidebarData";
import {
  Button,
  Paper,
  TextField,
  Typography,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormLabel,
  Divider,
  Chip,
} from "@mui/material";
import { CheckCircle, ArrowBack, ArrowForward } from "@mui/icons-material";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import styles from "./FormWorkflow.module.css";

const steps = ["Basic Information", "Details", "Review", "Confirmation"];

// Helper to generate reference number (outside component to avoid linter warnings)
const generateReferenceNumber = () => {
  return `REF-${Date.now().toString().slice(-8)}`;
};

export function FormWorkflow() {
  useDocumentTitle("Form-Centric Workflow - Layout Showcase");
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    website: "",
    linkedIn: "",
    company: "",
    companySize: "",
    industry: "",
    role: "",
    department: "",
    budget: "",
    timeline: "",
    requirements: "",
    preferredContact: "",
    timezone: "",
    language: "",
    hearAboutUs: "",
    additionalInfo: "",
    agreeToTerms: false,
    subscribeToNewsletter: false,
    allowMarketing: false,
  });

  // Generate reference number only once when reaching confirmation step
  const [referenceNumber, setReferenceNumber] = useState("");

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      const nextStep = activeStep + 1;
      setActiveStep(nextStep);
      // Generate reference number when moving to confirmation step
      if (nextStep === 3 && !referenceNumber) {
        setReferenceNumber(generateReferenceNumber());
      }
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleInputChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  const handleSelectChange =
    (field: string) => (event: { target: { value: unknown } }) => {
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <div className={styles.stepContent}>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Please provide your basic contact information to get started.
            </Typography>
            <div className={styles.formFields}>
              <TextField
                fullWidth
                label="First Name"
                value={formData.firstName}
                onChange={handleInputChange("firstName")}
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="Last Name"
                value={formData.lastName}
                onChange={handleInputChange("lastName")}
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleInputChange("email")}
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="Phone Number"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange("phone")}
                margin="normal"
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className={styles.stepContent}>
            <Typography variant="h6" gutterBottom>
              Company & Project Details
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Tell us about your company and project requirements.
            </Typography>
            <div className={styles.formFields}>
              <TextField
                fullWidth
                label="Company Name"
                value={formData.company}
                onChange={handleInputChange("company")}
                required
                margin="normal"
              />
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Your Role</InputLabel>
                <Select
                  value={formData.role}
                  onChange={handleSelectChange("role")}
                  label="Your Role"
                >
                  <MenuItem value="owner">Owner/Founder</MenuItem>
                  <MenuItem value="executive">Executive</MenuItem>
                  <MenuItem value="manager">Manager</MenuItem>
                  <MenuItem value="developer">Developer</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Department</InputLabel>
                <Select
                  value={formData.department}
                  onChange={handleSelectChange("department")}
                  label="Department"
                >
                  <MenuItem value="engineering">Engineering</MenuItem>
                  <MenuItem value="product">Product</MenuItem>
                  <MenuItem value="marketing">Marketing</MenuItem>
                  <MenuItem value="sales">Sales</MenuItem>
                  <MenuItem value="operations">Operations</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Budget Range</InputLabel>
                <Select
                  value={formData.budget}
                  onChange={handleSelectChange("budget")}
                  label="Budget Range"
                >
                  <MenuItem value="under-10k">Under $10,000</MenuItem>
                  <MenuItem value="10k-50k">$10,000 - $50,000</MenuItem>
                  <MenuItem value="50k-100k">$50,000 - $100,000</MenuItem>
                  <MenuItem value="100k-plus">$100,000+</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal" required>
                <FormLabel component="legend">Project Timeline</FormLabel>
                <RadioGroup
                  value={formData.timeline}
                  onChange={handleInputChange("timeline")}
                  row
                  sx={{ mt: 1 }}
                >
                  <FormControlLabel
                    value="asap"
                    control={<Radio />}
                    label="ASAP"
                  />
                  <FormControlLabel
                    value="1-3months"
                    control={<Radio />}
                    label="1-3 months"
                  />
                  <FormControlLabel
                    value="3-6months"
                    control={<Radio />}
                    label="3-6 months"
                  />
                  <FormControlLabel
                    value="6plus"
                    control={<Radio />}
                    label="6+ months"
                  />
                </RadioGroup>
              </FormControl>
              <TextField
                fullWidth
                label="Project Requirements"
                multiline
                rows={4}
                value={formData.requirements}
                onChange={handleInputChange("requirements")}
                margin="normal"
                placeholder="Describe your project requirements, goals, and any specific needs..."
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className={styles.stepContent}>
            <Typography variant="h6" gutterBottom>
              Review Your Information
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Please review all the information before submitting.
            </Typography>
            <Paper className={styles.reviewCard} elevation={1}>
              <div className={styles.reviewSection}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  className={styles.reviewLabel}
                >
                  Personal Information
                </Typography>
                <div className={styles.reviewRow}>
                  <Typography variant="body2">Name:</Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {formData.firstName} {formData.lastName}
                  </Typography>
                </div>
                <div className={styles.reviewRow}>
                  <Typography variant="body2">Email:</Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {formData.email}
                  </Typography>
                </div>
                <div className={styles.reviewRow}>
                  <Typography variant="body2">Phone:</Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {formData.phone || "Not provided"}
                  </Typography>
                </div>
                {formData.address && (
                  <div className={styles.reviewRow}>
                    <Typography variant="body2">Address:</Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {formData.address}
                      {formData.city && `, ${formData.city}`}
                      {formData.state && `, ${formData.state}`}
                      {formData.zipCode && ` ${formData.zipCode}`}
                    </Typography>
                  </div>
                )}
                {formData.country && (
                  <div className={styles.reviewRow}>
                    <Typography variant="body2">Country:</Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {formData.country}
                    </Typography>
                  </div>
                )}
                {formData.website && (
                  <div className={styles.reviewRow}>
                    <Typography variant="body2">Website:</Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {formData.website}
                    </Typography>
                  </div>
                )}
                {formData.preferredContact && (
                  <div className={styles.reviewRow}>
                    <Typography variant="body2">Preferred Contact:</Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {formData.preferredContact}
                    </Typography>
                  </div>
                )}
              </div>
              <Divider sx={{ my: 2 }} />
              <div className={styles.reviewSection}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  className={styles.reviewLabel}
                >
                  Company & Project
                </Typography>
                <div className={styles.reviewRow}>
                  <Typography variant="body2">Company:</Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {formData.company}
                  </Typography>
                </div>
                <div className={styles.reviewRow}>
                  <Typography variant="body2">Role:</Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {formData.role || "Not specified"}
                  </Typography>
                </div>
                <div className={styles.reviewRow}>
                  <Typography variant="body2">Department:</Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {formData.department || "Not specified"}
                  </Typography>
                </div>
                {formData.companySize && (
                  <div className={styles.reviewRow}>
                    <Typography variant="body2">Company Size:</Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {formData.companySize}
                    </Typography>
                  </div>
                )}
                {formData.industry && (
                  <div className={styles.reviewRow}>
                    <Typography variant="body2">Industry:</Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {formData.industry}
                    </Typography>
                  </div>
                )}
                <div className={styles.reviewRow}>
                  <Typography variant="body2">Budget:</Typography>
                  <Chip
                    label={formData.budget || "Not specified"}
                    size="small"
                  />
                </div>
                <div className={styles.reviewRow}>
                  <Typography variant="body2">Timeline:</Typography>
                  <Chip
                    label={formData.timeline || "Not specified"}
                    size="small"
                  />
                </div>
                {formData.requirements && (
                  <div className={styles.reviewRow}>
                    <Typography variant="body2">Requirements:</Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {formData.requirements}
                    </Typography>
                  </div>
                )}
                {formData.hearAboutUs && (
                  <div className={styles.reviewRow}>
                    <Typography variant="body2">
                      How you heard about us:
                    </Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {formData.hearAboutUs}
                    </Typography>
                  </div>
                )}
                {formData.additionalInfo && (
                  <div className={styles.reviewRow}>
                    <Typography variant="body2">Additional Info:</Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {formData.additionalInfo}
                    </Typography>
                  </div>
                )}
              </div>
              <Divider sx={{ my: 2 }} />
              <div className={styles.reviewSection}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange("agreeToTerms")}
                      required
                    />
                  }
                  label="I agree to the terms and conditions"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.subscribeToNewsletter}
                      onChange={handleInputChange("subscribeToNewsletter")}
                    />
                  }
                  label="Subscribe to newsletter for updates"
                />
              </div>
            </Paper>
          </div>
        );
      case 3:
        return (
          <div className={styles.stepContent}>
            <div className={styles.confirmationContent}>
              <CheckCircle className={styles.successIcon} color="success" />
              <Typography variant="h5" gutterBottom>
                Form Submitted Successfully!
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Thank you for your submission. We've received your information
                and will get back to you within 24 hours.
              </Typography>
              <Paper className={styles.confirmationCard} elevation={1}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  Submission Reference
                </Typography>
                <Typography variant="h6" component="div">
                  {referenceNumber}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Please save this reference number for your records.
                </Typography>
              </Paper>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isStepOptional = (_step: number) => {
    // Currently no steps are optional, but this function allows for future flexibility
    return false;
  };

  // Validation disabled for demonstration purposes - always allow navigation
  const canProceed = () => {
    return true;
  };

  // Allow clicking on stepper steps to jump to any step
  const handleStepClick = (step: number) => {
    setActiveStep(step);
    // Generate reference number if jumping to confirmation step
    if (step === 3 && !referenceNumber) {
      setReferenceNumber(generateReferenceNumber());
    }
  };

  return (
    <AppFrame
      showAppHeader
      showPageHeader
      showNav
      navItems={defaultNavItems}
      pageHeaderContent={
        <PageHeader
          title={steps[activeStep]}
          breadcrumbs={[
            { label: "Forms", path: "/layouts/form-workflow" },
            { label: steps[activeStep] },
          ]}
          status={
            <Chip
              label={`Step ${activeStep + 1} of ${steps.length}`}
              size="small"
              color="primary"
              variant="outlined"
            />
          }
        />
      }
    >
      <div className={styles.container}>
        {/* Progress Stepper */}
        <Paper className={styles.stepperPaper} elevation={1}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => {
              const stepProps: {
                completed?: boolean;
                optional?: React.ReactNode;
              } = {};
              const labelProps: {
                optional?: React.ReactNode;
                onClick?: () => void;
              } = {};
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption">Optional</Typography>
                );
              }
              // Make steps clickable for demonstration
              labelProps.onClick = () => handleStepClick(index);
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel
                    {...labelProps}
                    sx={{
                      cursor: "pointer",
                      "& .MuiStepLabel-label": {
                        cursor: "pointer",
                      },
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Paper>

        {/* Form Content */}
        <Paper className={styles.contentPaper} elevation={1}>
          {getStepContent(activeStep)}
        </Paper>

        {/* Sticky Action Bar */}
        <div className={styles.actionsBar}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            startIcon={<ArrowBack />}
            size="large"
          >
            Back
          </Button>
          <div className={styles.actionsRight}>
            {activeStep < steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleNext}
                endIcon={<ArrowForward />}
                disabled={!canProceed()}
                size="large"
              >
                Next Step
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                startIcon={<CheckCircle />}
                size="large"
                disabled
              >
                Submit Complete
              </Button>
            )}
          </div>
        </div>
      </div>
    </AppFrame>
  );
}
