import React, { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material"
import diseaseRecordsService from "../services/diseaserecords"

const DiseaseRecords = () => {
  const [records, setRecords] = useState([])
  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [editingRecord, setEditingRecord] = useState(null)
  const [formData, setFormData] = useState({
    year: '',
    diabetes: '',
    hypertension: '',
    thyroidcancer: '',
    dyslipidemia: '',
    hyperuricemia: '',
    galibladderpolyps: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      const data = await diseaseRecordsService.getAll()
      const sortedData = data.sort((a, b) => b.year - a.year)
      setRecords(sortedData)
    }
    fetchData()
  }, [])

  const handleDelete = async (id) => {
    await diseaseRecordsService.deleteDiseaseRecord(id)
    setRecords(records.filter(record => record.id !== id))
  }

  const handleOpenAdd = () => {
    setFormData({
      year: '',
      diabetes: '',
      hypertension: '',
      thyroidcancer: '',
      dyslipidemia: '',
      hyperuricemia: '',
      galibladderpolyps: ''
    })
    setOpenAdd(true)
  }

  const handleOpenEdit = (record) => {
    setEditingRecord(record)
    setFormData({
      year: record.year || '',
      diabetes: record.diabetes || '',
      hypertension: record.hypertension || '',
      thyroidcancer: record.thyroidcancer || '',
      dyslipidemia: record.dyslipidemia || '',
      hyperuricemia: record.hyperuricemia || '',
      galibladderpolyps: record.galibladderpolyps || ''
    })
    setOpenEdit(true)
  }

  const handleAdd = async () => {
    const newRecord = await diseaseRecordsService.createDiseaseRecord(formData)
    const updatedRecords = [...records, newRecord].sort((a, b) => b.year - a.year)
    setRecords(updatedRecords)
    setOpenAdd(false)
  }

  const handleUpdate = async () => {
    const updatedRecord = await diseaseRecordsService.updateDiseaseRecord(editingRecord.id, formData)
    const updatedRecords = records.map(r => r.id === editingRecord.id ? updatedRecord : r).sort((a, b) => b.year - a.year)
    setRecords(updatedRecords)
    setOpenEdit(false)
  }

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  return (
    <TableContainer component={Paper} sx={{ margin: 3 }}>
      <div style={{ padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0 }}>Hồ sơ bệnh tật</h2>
        <Button variant="contained" color="primary" onClick={handleOpenAdd}>Thêm mới</Button>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Hành động</TableCell>
            <TableCell>Năm</TableCell>
            <TableCell>ĐTĐ/Tiền ĐTĐ</TableCell>
            <TableCell>Tăng huyết áp</TableCell>
            <TableCell>Ung thư tuyến giáp</TableCell>
            <TableCell>Rối loạn lipid máu</TableCell>
            <TableCell>Tăng acid uric máu</TableCell>
            <TableCell>Polyp túi mật</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((record, index) => (
            <TableRow key={record.id || index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button variant="contained" color="primary" size="small" onClick={() => handleOpenEdit(record)}>Sửa</Button>
                  <Button variant="contained" color="error" size="small" onClick={() => handleDelete(record.id)}>Xóa</Button>
                </Stack>
              </TableCell>
              <TableCell>{record.year}</TableCell>
              <TableCell>{record.diabetes}</TableCell>
              <TableCell>{record.hypertension}</TableCell>
              <TableCell>{record.thyroidcancer}</TableCell>
              <TableCell>{record.dyslipidemia}</TableCell>
              <TableCell>{record.hyperuricemia}</TableCell>
              <TableCell>{record.galibladderpolyps}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add Dialog */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)} maxWidth="md" fullWidth>
        <DialogTitle>Thêm hồ sơ bệnh tật mới</DialogTitle>
        <DialogContent>
          <TextField label="Năm" fullWidth margin="normal" value={formData.year} onChange={(e) => handleChange('year', e.target.value)} />
          <TextField label="ĐTĐ/Tiền ĐTĐ" fullWidth margin="normal" value={formData.diabetes} onChange={(e) => handleChange('diabetes', e.target.value)} />
          <TextField label="Tăng huyết áp" fullWidth margin="normal" value={formData.hypertension} onChange={(e) => handleChange('hypertension', e.target.value)} />
          <TextField label="Ung thư tuyến giáp" fullWidth margin="normal" value={formData.thyroidcancer} onChange={(e) => handleChange('thyroidcancer', e.target.value)} />
          <TextField label="Rối loạn lipid máu" fullWidth margin="normal" value={formData.dyslipidemia} onChange={(e) => handleChange('dyslipidemia', e.target.value)} />
          <TextField label="Tăng acid uric máu" fullWidth margin="normal" value={formData.hyperuricemia} onChange={(e) => handleChange('hyperuricemia', e.target.value)} />
          <TextField label="Polyp túi mật" fullWidth margin="normal" value={formData.galibladderpolyps} onChange={(e) => handleChange('galibladderpolyps', e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)}>Hủy</Button>
          <Button onClick={handleAdd} variant="contained" color="primary">Thêm</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="md" fullWidth>
        <DialogTitle>Cập nhật hồ sơ bệnh tật</DialogTitle>
        <DialogContent>
          <TextField label="Năm" fullWidth margin="normal" value={formData.year} onChange={(e) => handleChange('year', e.target.value)} />
          <TextField label="ĐTĐ/Tiền ĐTĐ" fullWidth margin="normal" value={formData.diabetes} onChange={(e) => handleChange('diabetes', e.target.value)} />
          <TextField label="Tăng huyết áp" fullWidth margin="normal" value={formData.hypertension} onChange={(e) => handleChange('hypertension', e.target.value)} />
          <TextField label="Ung thư tuyến giáp" fullWidth margin="normal" value={formData.thyroidcancer} onChange={(e) => handleChange('thyroidcancer', e.target.value)} />
          <TextField label="Rối loạn lipid máu" fullWidth margin="normal" value={formData.dyslipidemia} onChange={(e) => handleChange('dyslipidemia', e.target.value)} />
          <TextField label="Tăng acid uric máu" fullWidth margin="normal" value={formData.hyperuricemia} onChange={(e) => handleChange('hyperuricemia', e.target.value)} />
          <TextField label="Polyp túi mật" fullWidth margin="normal" value={formData.galibladderpolyps} onChange={(e) => handleChange('galibladderpolyps', e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Hủy</Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">Cập nhật</Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  )
}

export default DiseaseRecords
