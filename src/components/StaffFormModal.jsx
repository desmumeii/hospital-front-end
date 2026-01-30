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
            label="Mã nhân viên"
            name="Mã nhân viên"
            value={formData.employeeCode}
            onChange={handleChange}
            required
          />
          <TextField
            label="Họ và tên"
            name="Họ và tên"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <TextField
            label="Ngày sinh"
            name="Ngày sinh"
            type="date"
            value={formData.dob}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            label="Đơn vị"
            name="Đơn vị"
            value={formData.department}
            onChange={handleChange}
            required
          />
          <TextField
            label="Phân loại"
            name="Phân loại"
            value={formData.classification}
            onChange={handleChange}
          />
          <TextField
            label="Năm"
            name="Năm"
            type="number"
            value={formData.year}
            onChange={handleChange}
            required
          />

          <TextField
            label="Tiền sử bệnh"
            name="Tiền sử bệnh"
            value={formData.medicalHistory}
            onChange={handleChange}
          />
          <TextField
            label="Khám lâm sàng"
            name="Khám lâm sàng"
            value={formData.clinicalExam}
            onChange={handleChange}
          />
          <TextField
            label="Khám phụ khoa"
            name="Khám phụ khoa"
            value={formData.gynecologyExam}
            onChange={handleChange}
          />
          <TextField
            label="Khám tế bào học"
            name="Khám tế bào học"
            value={formData.cytologyExam}
            onChange={handleChange}
          />
          <TextField
            label="Xét nghiệm máu"
            name="Xét nghiệm máu"
            value={formData.bloodTest}
            onChange={handleChange}
          />
          <TextField
            label="Xét nghiệm nước tiểu"
            name="Xét nghiệm nước tiểu"
            value={formData.urineTest}
            onChange={handleChange}
          />
          <TextField
            label="Điện tâm đồ (ECG)"
            name="Điện tâm đồ (ECG)"
            value={formData.ecg}
            onChange={handleChange}
          />
          <TextField
            label="X-Quang"
            name="X-Quang"
            value={formData.xray}
            onChange={handleChange}
          />
          <TextField
            label="Siêu âm vùng chậu 2D"
            name="Siêu âm vùng chậu 2D"
            value={formData.pelvicUltrasound2D}
            onChange={handleChange}
          />
          <TextField
            label="Siêu âm tuyến giáp 2D"
            name="Siêu âm tuyến giáp 2D"
            value={formData.thyroidUltrasound2D}
            onChange={handleChange}
          />
          <TextField
            label="Siêu âm tuyến vú 2D"
            name="Siêu âm tuyến vú 2D"
            value={formData.breastUltrasound2D}
            onChange={handleChange}
          />
          <TextField
            label="Mật độ xương"
            name="Mật độ xương"
            value={formData.boneDensity}
            onChange={handleChange}
          />
          <TextField
            label="Chọc hút kim nhỏ"
            name="Chọc hút kim nhỏ"
            value={formData.fineNeedleAspiration}
            onChange={handleChange}
          />
          <TextField
            label="Kết luận"
            name="Kết luận"
            value={formData.conclusion}
            onChange={handleChange}
          />

          <Button type="submit" variant="contained">
            {initialData && initialData.id ? "Cập nhật" : "Thêm mới"}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default StaffFormModal;
