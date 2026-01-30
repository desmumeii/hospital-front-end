import React, { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Stack } from "@mui/material"
import diseaseRecordsService from "../services/diseaserecords"

const DiseaseRecords = () => {
  const [records, setRecords] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await diseaseRecordsService.getAll()
      setRecords(data)
    }
    fetchData()
  }, [])

  const handleDelete = async (id) => {
    await diseaseRecordsService.deleteDiseaseRecord(id)
    setRecords(records.filter(record => record.id !== id))
  }

  return (
    <TableContainer component={Paper} sx={{ margin: 3 }}>
      <h2 style={{ padding: "16px" }}>Disease Records</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Diabetes</TableCell>
            <TableCell>Hypertension</TableCell>
            <TableCell>Thyroid Cancer</TableCell>
            <TableCell>Dyslipidemia</TableCell>
            <TableCell>Hyperuricemia</TableCell>
            <TableCell>Gallbladder Polyps</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((record, index) => (
            <TableRow key={record.id || index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{record.year}</TableCell>
              <TableCell>{record.diabetes}</TableCell>
              <TableCell>{record.hypertension}</TableCell>
              <TableCell>{record.thyroidcancer}</TableCell>
              <TableCell>{record.dyslipidemia}</TableCell>
              <TableCell>{record.hyperuricemia}</TableCell>
              <TableCell>{record.galibladderpolyps}</TableCell>
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

export default DiseaseRecords
