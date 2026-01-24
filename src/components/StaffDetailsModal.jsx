import React from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow
} from "@mui/material"

const StaffDetailsModal = ({ staff, onOpen, onClose }) => {
  if (!staff) return null

  return (
    <Dialog open={onOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Staff Details</DialogTitle>
      <DialogContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell>{staff.fullName}</TableCell>
              <TableCell><strong>DOB</strong></TableCell>
              <TableCell>{staff.dob}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Employee Code</strong></TableCell>
              <TableCell>{staff.employeeCode}</TableCell>
              <TableCell><strong>Department</strong></TableCell>
              <TableCell>{staff.department}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Medical History</strong></TableCell>
              <TableCell>{staff.medicalHistory || 'N/A'}</TableCell>
              <TableCell><strong>Clinical Exam</strong></TableCell>
              <TableCell>{staff.clinicalExam || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Gynecology Exam</strong></TableCell>
              <TableCell>{staff.gynecologyExam || 'N/A'}</TableCell>
              <TableCell><strong>Cytology Exam</strong></TableCell>
              <TableCell>{staff.cytologyExam || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Blood Test</strong></TableCell>
              <TableCell>{staff.bloodTest || 'N/A'}</TableCell>
              <TableCell><strong>Urine Test</strong></TableCell>
              <TableCell>{staff.urineTest || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>ECG</strong></TableCell>
              <TableCell>{staff.ecg || 'N/A'}</TableCell>
              <TableCell><strong>X-Ray</strong></TableCell>
              <TableCell>{staff.xray || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Pelvic Ultrasound 2D</strong></TableCell>
              <TableCell>{staff.pelvicUltrasound2D || 'N/A'}</TableCell>
              <TableCell><strong>Thyroid Ultrasound 2D</strong></TableCell>
              <TableCell>{staff.thyroidUltrasound2D || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Breast Ultrasound 2D</strong></TableCell>
              <TableCell>{staff.breastUltrasound2D || 'N/A'}</TableCell>
              <TableCell><strong>Bone Density</strong></TableCell>
              <TableCell>{staff.boneDensity || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Fine Needle Aspiration</strong></TableCell>
              <TableCell>{staff.fineNeedleAspiration || 'N/A'}</TableCell>
              <TableCell><strong>Classification</strong></TableCell>
              <TableCell>{staff.classification || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Conclusion</strong></TableCell>
              <TableCell>{staff.conclusion || 'N/A'}</TableCell>
              <TableCell><strong>Year</strong></TableCell>
              <TableCell>{staff.year}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default StaffDetailsModal
