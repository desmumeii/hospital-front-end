import React, { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material"
import totalPatientsService from "../services/totalpatients"

const TotalPatients = () => {
  const [records, setRecords] = useState([])
  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [editingRecord, setEditingRecord] = useState(null)
  const [formData, setFormData] = useState({
    year: '',
    totalPatients: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      const data = await totalPatientsService.getAll()
      const sortedData = data.sort((a, b) => b.year - a.year)
      setRecords(sortedData)
    }
    fetchData()
  }, [])

  const handleDelete = async (id) => {
    await totalPatientsService.deleteTotalPatient(id)
    setRecords(records.filter(record => record.id !== id))
  }

  const handleOpenAdd = () => {
    setFormData({
      year: '',
      totalPatients: ''
    })
    setOpenAdd(true)
  }

  const handleOpenEdit = (record) => {
    setEditingRecord(record)
    setFormData({
      year: record.year || '',
      totalPatients: record.totalPatients || ''
    })
    setOpenEdit(true)
  }

  const handleAdd = async () => {
    const newRecord = await totalPatientsService.createTotalPatient(formData)
    const updatedRecords = [...records, newRecord].sort((a, b) => b.year - a.year)
    setRecords(updatedRecords)
    setOpenAdd(false)
  }

  const handleUpdate = async () => {
    const updatedRecord = await totalPatientsService.updateTotalPatient(editingRecord.id, formData)
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
        <h2 style={{ margin: 0 }}>Tổng khám</h2>
        <Button variant="contained" color="primary" onClick={handleOpenAdd}>Thêm mới</Button>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Hành động</TableCell>
            <TableCell>Năm</TableCell>
            <TableCell>Tổng người khám</TableCell>
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
              <TableCell>{record.totalPatients}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add Dialog */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Thêm tổng khám mới</DialogTitle>
        <DialogContent>
          <TextField label="Năm" fullWidth margin="normal" value={formData.year} onChange={(e) => handleChange('year', e.target.value)} />
          <TextField label="Tổng người khám" fullWidth margin="normal" type="number" value={formData.totalPatients} onChange={(e) => handleChange('totalPatients', e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)}>Hủy</Button>
          <Button onClick={handleAdd} variant="contained" color="primary">Thêm</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Cập nhật tổng khám</DialogTitle>
        <DialogContent>
          <TextField label="Năm" fullWidth margin="normal" value={formData.year} onChange={(e) => handleChange('year', e.target.value)} />
          <TextField label="Tổng người khám" fullWidth margin="normal" type="number" value={formData.totalPatients} onChange={(e) => handleChange('totalPatients', e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Hủy</Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">Cập nhật</Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  )
}

export default TotalPatients
