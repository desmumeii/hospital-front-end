import { useState, useEffect } from "react"
import { Routes, Route, NavLink, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import Staffs from "./components/Staffs"
import HomePage from "./components/HomePage"
import ClassifyPatients from "./components/ClassifyPatients"
import DiseaseRecords from "./components/DiseaseRecords"
import TotalPatients from "./components/TotalPatients"
import Login from "./components/Login"
import { initializeStaffs } from "./reducers/staffReducer"

const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      // Check if token exists
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('username')
      
      if (token && user) {
        setIsAuthenticated(true)
        setUsername(user)
        await dispatch(initializeStaffs())
      } else {
        setIsAuthenticated(false)
        navigate('/login')
      }
      setLoading(false)
    }
    fetchData()
  }, [dispatch, navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    setIsAuthenticated(false)
    setUsername('')
    navigate('/login')
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Login />} />
    </Routes>
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#eff6ff" }}>
      {/* Header */}
      <header
        style={{
          background: "#0284c7",
          padding: "12px 24px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "4px solid #1e40af"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX2_Y2dh831BjXg97i8jXC_hvJugLBYtXRuQ&s"
            alt="Health Logo"
            style={{ height: "40px", width: "auto" }}
          />
          <div style={{ color: "#fff" }}>
            <h1 style={{ color: "#fff", margin: 0, fontSize: "18px", fontWeight: 700 }}>
              HỒ SƠ SỨC KHỎE CÁN BỘ VIÊN CHỨC VÀ NGƯỜI LAO ĐỘNG BỆNH VIỆN NHI TRUNG ƯƠNG
            </h1>
          </div>
        </div>
        <div style={{ color: "#fff", display: "flex", alignItems: "center", gap: "20px" }}>
          <span style={{ fontSize: "14px" }}>Người dùng: <strong>{username}</strong></span>
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 16px",
              backgroundColor: "#dc2626",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "13px",
              transition: "background-color 0.2s"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#b91c1c"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#dc2626"}
          >
            Đăng xuất
          </button>
        </div>
      </header>

      <div style={{ display: "flex", flex: 1 }}>
        <nav
          style={{
            width: "200px",
            padding: "20px 12px",
            background: "#0284c7",
            color: "#f0f9ff",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            boxShadow: "2px 0 4px rgba(0, 0, 0, 0.1)",
            borderRight: "2px solid #1e40af"
          }}
        >
          <h2 style={{
            color: "#dbeafe",
            margin: "0 0 12px 0",
            fontSize: "13px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            paddingBottom: "8px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.2)"
          }}>
            Menu
          </h2>
          <NavLink
            to="/"
            end
            style={({ isActive }) => ({
              color: isActive ? "#fff" : "#dbeafe",
              textDecoration: "none",
              fontWeight: isActive ? 600 : 500,
              padding: "10px 12px",
              borderRadius: "6px",
              background: isActive ? "rgba(255, 255, 255, 0.15)" : "transparent",
              transition: "all 0.2s",
              fontSize: "14px",
              borderLeft: isActive ? "4px solid #fbbf24" : "4px solid transparent",
              paddingLeft: "8px"
            })}
          >
            📊 Trang chính
          </NavLink>
          <NavLink
            to="/staffs"
            style={({ isActive }) => ({
              color: isActive ? "#fff" : "#dbeafe",
              textDecoration: "none",
              fontWeight: isActive ? 600 : 500,
              padding: "10px 12px",
              borderRadius: "6px",
              background: isActive ? "rgba(255, 255, 255, 0.15)" : "transparent",
              transition: "all 0.2s",
              fontSize: "14px",
              borderLeft: isActive ? "4px solid #fbbf24" : "4px solid transparent",
              paddingLeft: "8px"
            })}
          >
            👥 Hồ sơ sức khỏe
          </NavLink>
          <NavLink
            to="/classify-patients"
            style={({ isActive }) => ({
              color: isActive ? "#fff" : "#dbeafe",
              textDecoration: "none",
              fontWeight: isActive ? 600 : 500,
              padding: "10px 12px",
              borderRadius: "6px",
              background: isActive ? "rgba(255, 255, 255, 0.15)" : "transparent",
              transition: "all 0.2s",
              fontSize: "14px",
              borderLeft: isActive ? "4px solid #fbbf24" : "4px solid transparent",
              paddingLeft: "8px"
            })}
          >
            🏥 Phân loại sức khỏe
          </NavLink>
          <NavLink
            to="/disease-records"
            style={({ isActive }) => ({
              color: isActive ? "#fff" : "#dbeafe",
              textDecoration: "none",
              fontWeight: isActive ? 600 : 500,
              padding: "10px 12px",
              borderRadius: "6px",
              background: isActive ? "rgba(255, 255, 255, 0.15)" : "transparent",
              transition: "all 0.2s",
              fontSize: "14px",
              borderLeft: isActive ? "4px solid #fbbf24" : "4px solid transparent",
              paddingLeft: "8px"
            })}
          >
            📋 Phân loại bệnh tật
          </NavLink>
          <NavLink
            to="/total-patients"
            style={({ isActive }) => ({
              color: isActive ? "#fff" : "#dbeafe",
              textDecoration: "none",
              fontWeight: isActive ? 600 : 500,
              padding: "10px 12px",
              borderRadius: "6px",
              background: isActive ? "rgba(255, 255, 255, 0.15)" : "transparent",
              transition: "all 0.2s",
              fontSize: "14px",
              borderLeft: isActive ? "4px solid #fbbf24" : "4px solid transparent",
              paddingLeft: "8px"
            })}
          >
            👤 Tổng người khám
          </NavLink>
        </nav>
        <main style={{
          flex: 1,
          background: "#f0f9ff",
          margin: "16px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          overflow: "auto"
        }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/staffs" element={<Staffs />} />
            <Route path="/classify-patients" element={<ClassifyPatients />} />
            <Route path="/disease-records" element={<DiseaseRecords />} />
            <Route path="/total-patients" element={<TotalPatients />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
export default App
