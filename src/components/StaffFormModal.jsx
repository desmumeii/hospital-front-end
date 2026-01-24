import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Stack,
  Typography
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  maxHeight: "90vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

const defaultFormData = {
  employeeCode: "",
  fullName: "",
  dob: "",
  department: "",
  classification: "",
  year: "",
  medicalHistory: "",
  clinicalExam: "",
  gynecologyExam: "",
  cytologyExam: "",
  bloodTest: "",
  urineTest: "",
  ecg: "",
  xray: "",
  pelvicUltrasound2D: "",
  thyroidUltrasound2D: "",
  breastUltrasound2D: "",
  boneDensity: "",
  fineNeedleAspiration: "",
  conclusion: ""
};

const StaffFormModal = ({ open, onClose, initialData = {}, onSubmit }) => {
  const [formData, setFormData] = useState({ ...defaultFormData, ...initialData });

  // Update formData safely on initialData change
  useEffect(() => {
    const id = setTimeout(() => {
      setFormData({ ...defaultFormData, ...(initialData || {}) });
    }, 0);
    return () => clearTimeout(id);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { ...formData };

    payload.employeeCode = Number(payload.employeeCode);
    payload.year = payload.year ? Number(payload.year) : null;

    Object.keys(payload).forEach(key => {
      if (payload[key] === "") payload[key] = null;
    });

    onSubmit(payload);
    onClose();
  };


  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style} component="form" onSubmit={handleSubmit}>
        <Typography variant="h6" mb={2}>
          {initialData && initialData.id ? "Update Staff" : "Add New Staff"}
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Employee Code"
            name="employeeCode"
            value={formData.employeeCode}
            onChange={handleChange}
            required
          />
          <TextField
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <TextField
            label="DOB"
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
          <TextField
            label="Classification"
            name="classification"
            value={formData.classification}
            onChange={handleChange}
          />
          <TextField
            label="Year"
            name="year"
            type="number"
            value={formData.year}
            onChange={handleChange}
            required
          />

          <TextField
            label="Medical History"
            name="medicalHistory"
            value={formData.medicalHistory}
            onChange={handleChange}
          />
          <TextField
            label="Clinical Exam"
            name="clinicalExam"
            value={formData.clinicalExam}
            onChange={handleChange}
          />
          <TextField
            label="Gynecology Exam"
            name="gynecologyExam"
            value={formData.gynecologyExam}
            onChange={handleChange}
          />
          <TextField
            label="Cytology Exam"
            name="cytologyExam"
            value={formData.cytologyExam}
            onChange={handleChange}
          />
          <TextField
            label="Blood Test"
            name="bloodTest"
            value={formData.bloodTest}
            onChange={handleChange}
          />
          <TextField
            label="Urine Test"
            name="urineTest"
            value={formData.urineTest}
            onChange={handleChange}
          />
          <TextField
            label="ECG"
            name="ecg"
            value={formData.ecg}
            onChange={handleChange}
          />
          <TextField
            label="X-Ray"
            name="xray"
            value={formData.xray}
            onChange={handleChange}
          />
          <TextField
            label="Pelvic Ultrasound 2D"
            name="pelvicUltrasound2D"
            value={formData.pelvicUltrasound2D}
            onChange={handleChange}
          />
          <TextField
            label="Thyroid Ultrasound 2D"
            name="thyroidUltrasound2D"
            value={formData.thyroidUltrasound2D}
            onChange={handleChange}
          />
          <TextField
            label="Breast Ultrasound 2D"
            name="breastUltrasound2D"
            value={formData.breastUltrasound2D}
            onChange={handleChange}
          />
          <TextField
            label="Bone Density"
            name="boneDensity"
            value={formData.boneDensity}
            onChange={handleChange}
          />
          <TextField
            label="Fine Needle Aspiration"
            name="fineNeedleAspiration"
            value={formData.fineNeedleAspiration}
            onChange={handleChange}
          />
          <TextField
            label="Conclusion"
            name="conclusion"
            value={formData.conclusion}
            onChange={handleChange}
          />

          <Button type="submit" variant="contained">
            {initialData && initialData.id ? "Update" : "Add"}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default StaffFormModal;
