import React, { useMemo, useState } from "react"
import { useSelector } from "react-redux"
import StaffDetailsModal from "./StaffDetailsModal"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Stack, TablePagination, TextField, Box, Select, MenuItem, FormControl, InputLabel } from "@mui/material"
import { createStaff, updateStaff, deleteStaff } from "../reducers/staffReducer"
import { useDispatch } from "react-redux"
import staffService from "../services/staffs"
import StaffFormModal from "./StaffFormModal"
import ClassificationChartModal from "./ClassificationChartModal"

const Staffs = () => {
  const dispatch = useDispatch()
  const staffs = useSelector((state) => state.staffs)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchName, setSearchName] = useState("")
  const [filterYear, setFilterYear] = useState("")

  const filteredStaffs = useMemo(() => {
    const list = staffs || []
    
    let filtered = [...list].sort((a, b) => b.year - a.year)
    
    // Filter by employee code
    if (searchQuery.trim()) {
      filtered = filtered.filter((staff) =>
        staff.employeeCode?.toString().includes(searchQuery)
      )
    }
    
    // Filter by name
    if (searchName.trim()) {
      filtered = filtered.filter((staff) =>
        staff.fullName?.toLowerCase().includes(searchName.toLowerCase())
      )
    }
    
    // Filter by year
    if (filterYear) {
      filtered = filtered.filter((staff) => staff.year?.toString() === filterYear)
    }
    
    return filtered
  }, [staffs, searchQuery, searchName, filterYear])
  
  const [open, setOpen] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState(null)
  const [graphOpen, setGraphOpen] = useState(false)
  const [graphData, setGraphData] = useState([])
  const [graphSubject, setGraphSubject] = useState(null)
  
  const [formOpen, setFormOpen] = useState(false)
  const [formInitialData, setFormInitialData] = useState(null)


  const [page, setPage] = useState(0) 
  const [rowsPerPage, setRowsPerPage] = useState(10)
  
  const handleOpen = (staff) => {
    setSelectedStaff(staff)
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    setSelectedStaff(null)
  }

  const handleGraphOpen = (staff) => {
    const list = (staffs || []).filter((item) => item.fullName === staff.fullName)
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

  const paginatedStaffs = filteredStaffs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  
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
        <h2 style={{ padding: "16px" }}>Hồ sơ nhân viên</h2>
        <Box sx={{ padding: 2, display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
          <TextField
            label="Tìm kiếm theo mã nhân viên"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setPage(0)
            }}
            sx={{ minWidth: 250 }}
          />
          <TextField
            label="Tìm kiếm theo tên"
            variant="outlined"
            size="small"
            value={searchName}
            onChange={(e) => {
              setSearchName(e.target.value)
              setPage(0)
            }}
            sx={{ minWidth: 250 }}
          />
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Lọc theo năm</InputLabel>
            <Select
              value={filterYear}
              label="Lọc theo năm"
              onChange={(e) => {
                setFilterYear(e.target.value)
                setPage(0)
              }}
            >
              <MenuItem value="">Tất cả</MenuItem>
              {Array.from(
                new Set((staffs || []).map((staff) => staff.year).filter(Boolean))
              )
                .sort((a, b) => b - a)
                .map((year) => (
                  <MenuItem key={year} value={year.toString()}>
                    {year}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={() => handleFormOpen(null)}>
            Thêm mới
          </Button>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Hành động</TableCell>
              <TableCell>Năm</TableCell>
              <TableCell>Mã nhân viên</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Đơn vị</TableCell>
              <TableCell>Ngày sinh</TableCell>
              <TableCell>Phân loại</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedStaffs.map((staff, index) => (
              <TableRow key={staff.id || index}>
                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                <TableCell>
                  <Stack direction="column" spacing={1}>
                    <Button variant="contained" size="small" onClick={() => handleOpen(staff)}>Chi tiết</Button>
                    <Button variant="outlined" size="small" onClick={() => handleGraphOpen(staff)}>Biểu đồ</Button>
                    <Button variant="contained" color="success" size="small" onClick={() => handleFormOpen(staff)}>Cập nhật</Button>
                    <Button variant="contained" color="error" size="small" onClick={() => handleDelete(staff.id)}>Xóa</Button>
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
        count={filteredStaffs.length}
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
