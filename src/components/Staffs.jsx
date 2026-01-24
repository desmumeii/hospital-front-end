import React, { useState } from "react"
import { useSelector } from "react-redux"
import StaffDetailsModal from "./StaffDetailsModal"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Stack, TablePagination } from "@mui/material"
import { createStaff, updateStaff, deleteStaff } from "../reducers/staffReducer"
import { useDispatch } from "react-redux"
import staffService from "../services/staffs"
import StaffFormModal from "./StaffFormModal"

const Staffs = () => {
  const dispatch = useDispatch()
  const staffs = useSelector((state) => state.staffs) || []
  
  const [open, setOpen] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState(null)
  
  const [formOpen, setFormOpen] = useState(false)
  const [formInitialData, setFormInitialData] = useState(null)


  const [page, setPage] = useState(0) // current page index
  const [rowsPerPage, setRowsPerPage] = useState(10) // number of rows per page
  
  const handleOpen = (staff) => {
    setSelectedStaff(staff)
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    setSelectedStaff(null)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const paginatedStaffs = staffs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  
  const handleDelete = async (id) => {
    await staffService.deleteStaff(id);
    dispatch(deleteStaff(id));
  };

  const handleUpdate = async (staffData) => {
    const updated = await staffService.updateStaff(staffData.id, staffData);
    dispatch(updateStaff(updated));
  };

  const handleCreate = async (staffData) => {
    const created = await staffService.createStaff(staffData);
    dispatch(createStaff(created));
  };
    // Open form modal (new or update)
  const handleFormOpen = (staff = null) => {
    setFormInitialData(staff) // null = new staff
    setFormOpen(true)
  }

  const handleFormClose = () => {
    setFormOpen(false)
    setFormInitialData(null)
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ margin: 3 }}>
        <h2 style={{ padding: "16px" }}>Staff Records</h2>
        <Button variant="contained" color="primary" sx={{ margin: 2 }} onClick={() => handleFormOpen(null)}>
          Add New Staff
        </Button>
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
            {paginatedStaffs.map((staff, index) => (
              <TableRow key={staff.id || index}>
                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                <TableCell>
                  <Stack direction="column" spacing={1}>
                    <Button variant="contained" size="small" onClick={() => handleOpen(staff)}>Details</Button>
                    <Button variant="outlined" size="small">Graphs</Button>
                    <Button variant="contained" color="success" size="small" onClick={() => handleFormOpen(staff)}>Update</Button>
                    <Button variant="contained" color="error" size="small" onClick={() => handleDelete(staff.id)}>Delete</Button>
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
      <TablePagination
        component="div"
        count={staffs.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />

      {/* Modal */}
      <StaffDetailsModal staff={selectedStaff} onOpen={open} onClose={handleClose} />
      <StaffFormModal
        open={formOpen}
        initialData={formInitialData}
        onClose={handleFormClose}
        onSubmit={(data) => {
          if (formInitialData) {
            handleUpdate(data);
          } else {
            handleCreate(data);
          }
          handleFormClose();
        }}
      />
    </>
  )
}

export default Staffs
