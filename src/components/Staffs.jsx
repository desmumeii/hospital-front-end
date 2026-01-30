import React, { useMemo, useState } from "react"
import { useSelector } from "react-redux"
import StaffDetailsModal from "./StaffDetailsModal"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Stack, TablePagination } from "@mui/material"
import { createStaff, updateStaff, deleteStaff } from "../reducers/staffReducer"
import { useDispatch } from "react-redux"
import staffService from "../services/staffs"
import StaffFormModal from "./StaffFormModal"
import ClassificationChartModal from "./ClassificationChartModal"

const Staffs = () => {
  const dispatch = useDispatch()
  const staffs = useSelector((state) => state.staffs)

  // Derive a list sorted by year (latest first), keeping only the most recent record per employee
  const latestStaffs = useMemo(() => {
    const list = staffs || []
    // First, sort by year in descending order (latest years first)
    const sortedByYear = [...list].sort((a, b) => b.year - a.year)
    
    // Then keep only the latest year per employee
    const byEmployee = new Map()
    sortedByYear.forEach((record) => {
      if (!byEmployee.has(record.employeeCode)) {
        byEmployee.set(record.employeeCode, record)
      }
    })
    return Array.from(byEmployee.values())
  }, [staffs])
  
  const [open, setOpen] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState(null)
  const [graphOpen, setGraphOpen] = useState(false)
  const [graphData, setGraphData] = useState([])
  const [graphSubject, setGraphSubject] = useState(null)
  
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

  const handleGraphOpen = (staff) => {
    const list = (staffs || []).filter((item) => item.employeeCode === staff.employeeCode)
    setGraphSubject(staff)
    setGraphData(list)
    setGraphOpen(true)
  }

  const handleGraphClose = () => {
    setGraphOpen(false)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const paginatedStaffs = latestStaffs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  
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
                    <Button variant="outlined" size="small" onClick={() => handleGraphOpen(staff)}>Graphs</Button>
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
        count={latestStaffs.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />

      {/* Modal */}
      <StaffDetailsModal staff={selectedStaff} onOpen={open} onClose={handleClose} />
      <ClassificationChartModal open={graphOpen} onClose={handleGraphClose} data={graphData} subject={graphSubject} />
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
