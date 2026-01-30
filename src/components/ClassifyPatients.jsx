import React, { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Stack } from "@mui/material"
import classifyPatientsService from "../services/classifypatients"

const ClassifyPatients = () => {
  const [records, setRecords] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await classifyPatientsService.getAll()
      setRecords(data)
    }
    fetchData()
  }, [])

  const handleDelete = async (id) => {
    await classifyPatientsService.deleteClassifyPatient(id)
    setRecords(records.filter(record => record.id !== id))
  }

  return (
    <TableContainer component={Paper} sx={{ margin: 3 }}>
      <h2 style={{ padding: "16px" }}>Patient Classification Records</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Type I</TableCell>
            <TableCell>Type II</TableCell>
            <TableCell>Type III</TableCell>
            <TableCell>Type IV</TableCell>
            <TableCell>Type V</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((record, index) => (
            <TableRow key={record.id || index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{record.year}</TableCell>
              <TableCell>{record.typeI}</TableCell>
              <TableCell>{record.typeII}</TableCell>
              <TableCell>{record.typeIII}</TableCell>
              <TableCell>{record.typeIV}</TableCell>
              <TableCell>{record.typeV}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button variant="contained" color="error" size="small" onClick={() => handleDelete(record.id)}>Delete</Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ClassifyPatients
