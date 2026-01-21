import React, { useState } from "react"
import { useSelector } from "react-redux"
import StaffDetailsModal from "./StaffDetailsModal"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Stack } from "@mui/material"

const Staffs = () => {
  const staffs = useSelector((state) => state.staffs) || []
  const [open, setOpen] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState(null)

  const handleOpen = (staff) => {
    setSelectedStaff(staff)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedStaff(null)
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ margin: 3 }}>
        <h2 style={{ padding: "16px" }}>Staff Records</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Actions</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Employee Code</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Classification</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staffs.map((staff, index) => (
              <TableRow key={staff.id || index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Stack direction="column" spacing={1}>
                    <Button variant="contained" size="small" onClick={() => handleOpen(staff)}>Details</Button>
                    <Button variant="outlined" size="small">Graphs</Button>
                    <Button variant="contained" color="success" size="small">Update</Button>
                    <Button variant="contained" color="error" size="small">Delete</Button>
                  </Stack>
                </TableCell>
                <TableCell>{staff.year}</TableCell>
                <TableCell>{staff.employeeCode}</TableCell>
                <TableCell>{staff.fullName}</TableCell>
                <TableCell>{staff.department}</TableCell>
                <TableCell>{staff.dob}</TableCell>
                <TableCell>{staff.classification}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal */}
      <StaffDetailsModal staff={selectedStaff} open={open} onClose={handleClose} />
    </>
  )
}

export default Staffs
