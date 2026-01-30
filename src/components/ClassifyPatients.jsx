import React, { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material"
import classifyPatientsService from "../services/classifypatients"

const ClassifyPatients = () => {
  const [records, setRecords] = useState([])
  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [editingRecord, setEditingRecord] = useState(null)
  const [formData, setFormData] = useState({
    year: '',
    typeI: '',
    typeII: '',
    typeIII: '',
    typeIV: '',
    typeV: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      const data = await classifyPatientsService.getAll()
      const sortedData = data.sort((a, b) => b.year - a.year)
      setRecords(sortedData)
    }
    fetchData()
  }, [])

  const handleDelete = async (id) => {
    await classifyPatientsService.deleteClassifyPatient(id)
    setRecords(records.filter(record => record.id !== id))
  }

  const handleOpenAdd = () => {
    setFormData({
      year: '',
      typeI: '',
      typeII: '',
      typeIII: '',
      typeIV: '',
      typeV: ''
    })
    setOpenAdd(true)
  }

  const handleOpenEdit = (record) => {
    setEditingRecord(record)
    setFormData({
      year: record.year || '',
      typeI: record.typeI || '',
      typeII: record.typeII || '',
      typeIII: record.typeIII || '',
      typeIV: record.typeIV || '',
      typeV: record.typeV || ''
    })
    setOpenEdit(true)
  }

  const handleAdd = async () => {
    const newRecord = await classifyPatientsService.createClassifyPatient(formData)
    const updatedRecords = [...records, newRecord].sort((a, b) => b.year - a.year)
    setRecords(updatedRecords)
    setOpenAdd(false)
  }

  const handleUpdate = async () => {
    const updatedRecord = await classifyPatientsService.updateClassifyPatient(editingRecord.id, formData)
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
        <h2 style={{ margin: 0 }}>Hồ sơ phân loại sức khỏe</h2>
        <Button variant="contained" color="primary" onClick={handleOpenAdd}>Thêm mới</Button>
      </div>
      <Table>
        <TableHead>
          <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Hành động</TableCell>
              <TableCell>Năm</TableCell>
              <TableCell>Loại I</TableCell>
              <TableCell>Loại II</TableCell>
              <TableCell>Loại III</TableCell>
              <TableCell>Loại IV</TableCell>
              <TableCell>Loại V</TableCell>
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
                <TableCell>{record.typeI}</TableCell>
                <TableCell>{record.typeII}</TableCell>
                <TableCell>{record.typeIII}</TableCell>
                <TableCell>{record.typeIV}</TableCell>
                <TableCell>{record.typeV}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add Dialog */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)} maxWidth="md" fullWidth>
        <DialogTitle>Thêm hồ sơ phân loại sức khỏe mới</DialogTitle>
        <DialogContent>
          <TextField label="Năm" fullWidth margin="normal" value={formData.year} onChange={(e) => handleChange('year', e.target.value)} />
          <TextField label="Loại I" fullWidth margin="normal" value={formData.typeI} onChange={(e) => handleChange('typeI', e.target.value)} />
          <TextField label="Loại II" fullWidth margin="normal" value={formData.typeII} onChange={(e) => handleChange('typeII', e.target.value)} />
          <TextField label="Loại III" fullWidth margin="normal" value={formData.typeIII} onChange={(e) => handleChange('typeIII', e.target.value)} />
          <TextField label="Loại IV" fullWidth margin="normal" value={formData.typeIV} onChange={(e) => handleChange('typeIV', e.target.value)} />
          <TextField label="Loại V" fullWidth margin="normal" value={formData.typeV} onChange={(e) => handleChange('typeV', e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)}>Hủy</Button>
          <Button onClick={handleAdd} variant="contained" color="primary">Thêm</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="md" fullWidth>
        <DialogTitle>Cập nhật hồ sơ phân loại sức khỏe</DialogTitle>
        <DialogContent>
          <TextField label="Năm" fullWidth margin="normal" value={formData.year} onChange={(e) => handleChange('year', e.target.value)} />
          <TextField label="Loại I" fullWidth margin="normal" value={formData.typeI} onChange={(e) => handleChange('typeI', e.target.value)} />
          <TextField label="Loại II" fullWidth margin="normal" value={formData.typeII} onChange={(e) => handleChange('typeII', e.target.value)} />
          <TextField label="Loại III" fullWidth margin="normal" value={formData.typeIII} onChange={(e) => handleChange('typeIII', e.target.value)} />
          <TextField label="Loại IV" fullWidth margin="normal" value={formData.typeIV} onChange={(e) => handleChange('typeIV', e.target.value)} />
          <TextField label="Loại V" fullWidth margin="normal" value={formData.typeV} onChange={(e) => handleChange('typeV', e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Hủy</Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">Cập nhật</Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  )
}

export default ClassifyPatients
