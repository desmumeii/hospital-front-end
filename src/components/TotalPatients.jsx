import React, { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Stack } from "@mui/material"
import totalPatientsService from "../services/totalpatients"

const TotalPatients = () => {
  const [records, setRecords] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await totalPatientsService.getAll()
      setRecords(data)
    }
    fetchData()
  }, [])

  const handleDelete = async (id) => {
    await totalPatientsService.deleteTotalPatient(id)
    setRecords(records.filter(record => record.id !== id))
  }

  return (
    <TableContainer component={Paper} sx={{ margin: 3 }}>
      <h2 style={{ padding: "16px" }}>Total Patient Records</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Total Patients</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((record, index) => (
            <TableRow key={record.id || index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{record.year}</TableCell>
              <TableCell>{record.totalPatients}</TableCell>
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

export default TotalPatients
