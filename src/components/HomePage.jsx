import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { getAll } from '../services/classifypatients'
import { getAll as getAllDiseases } from '../services/diseaserecords'

const HomePage = () => {
  const [yearlyData, setYearlyData] = useState([])
  const [chartData, setChartData] = useState([])
  const [years, setYears] = useState([])
  const [diseaseChartData, setDiseaseChartData] = useState([])
  const [diseaseYears, setDiseaseYears] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classifyDataRaw = await getAll()
        const diseaseDataRaw = await getAllDiseases()
        
        // For overview charts
        const classifyYearsUnique = [...new Set(classifyDataRaw.map(record => record.year))].sort()
        setYears(classifyYearsUnique)
        
        const transformedClassifyData = [
          {
            name: 'Loại I',
            ...Object.fromEntries(classifyYearsUnique.map(year => {
              const record = classifyDataRaw.find(r => r.year === year)
              return [year.toString(), record ? record.typeI : 0]
            }))
          },
          {
            name: 'Loại II',
            ...Object.fromEntries(classifyYearsUnique.map(year => {
              const record = classifyDataRaw.find(r => r.year === year)
              return [year.toString(), record ? record.typeII : 0]
            }))
          },
          {
            name: 'Loại III',
            ...Object.fromEntries(classifyYearsUnique.map(year => {
              const record = classifyDataRaw.find(r => r.year === year)
              return [year.toString(), record ? record.typeIII : 0]
            }))
          },
          {
            name: 'Loại IV',
            ...Object.fromEntries(classifyYearsUnique.map(year => {
              const record = classifyDataRaw.find(r => r.year === year)
              return [year.toString(), record ? record.typeIV : 0]
            }))
          },
          {
            name: 'Loại V',
            ...Object.fromEntries(classifyYearsUnique.map(year => {
              const record = classifyDataRaw.find(r => r.year === year)
              return [year.toString(), record ? record.typeV : 0]
            }))
          }
        ]
        setChartData(transformedClassifyData)
        
        const diseaseYearsUnique = [...new Set(diseaseDataRaw.map(record => record.year))].sort()
        setDiseaseYears(diseaseYearsUnique)
        
        const transformedDiseaseData = [
          {
            name: 'ĐTĐ/Tiền ĐTĐ',
            ...Object.fromEntries(diseaseYearsUnique.map(year => {
              const record = diseaseDataRaw.find(r => r.year === year)
              return [year.toString(), record ? record.diabetes : 0]
            }))
          },
          {
            name: 'Tăng huyết áp',
            ...Object.fromEntries(diseaseYearsUnique.map(year => {
              const record = diseaseDataRaw.find(r => r.year === year)
              return [year.toString(), record ? record.hypertension : 0]
            }))
          },
          {
            name: 'K tuyến giáp',
            ...Object.fromEntries(diseaseYearsUnique.map(year => {
              const record = diseaseDataRaw.find(r => r.year === year)
              return [year.toString(), record ? record.thyroidcancer : 0]
            }))
          },
          {
            name: 'Rối loạn lipid máu',
            ...Object.fromEntries(diseaseYearsUnique.map(year => {
              const record = diseaseDataRaw.find(r => r.year === year)
              return [year.toString(), record ? record.dyslipidemia : 0]
            }))
          },
          {
            name: 'Tăng acid uric',
            ...Object.fromEntries(diseaseYearsUnique.map(year => {
              const record = diseaseDataRaw.find(r => r.year === year)
              return [year.toString(), record ? record.hyperuricemia : 0]
            }))
          },
          {
            name: 'Polyp túi mật',
            ...Object.fromEntries(diseaseYearsUnique.map(year => {
              const record = diseaseDataRaw.find(r => r.year === year)
              return [year.toString(), record ? record.galibladderpolyps : 0]
            }))
          }
        ]
        setDiseaseChartData(transformedDiseaseData)
        
        // Get all unique years from both datasets
        const classifyYears = new Set(classifyDataRaw.map(r => r.year))
        const diseaseYears = new Set(diseaseDataRaw.map(r => r.year))
        const allYears = [...new Set([...classifyYears, ...diseaseYears])].sort((a, b) => b - a)
        
        // Create data structure for each year
        const dataByYear = allYears.map(year => {
          const classifyRecord = classifyDataRaw.find(r => r.year === year)
          const diseaseRecord = diseaseDataRaw.find(r => r.year === year)
          
          const classifyChartData = classifyRecord ? [
            { name: 'Loại I', value: classifyRecord.typeI },
            { name: 'Loại II', value: classifyRecord.typeII },
            { name: 'Loại III', value: classifyRecord.typeIII },
            { name: 'Loại IV', value: classifyRecord.typeIV },
            { name: 'Loại V', value: classifyRecord.typeV }
          ] : []
          
          const diseaseChartData = diseaseRecord ? [
            { name: 'ĐTĐ/Tiền ĐTĐ', value: diseaseRecord.diabetes },
            { name: 'Tăng huyết áp', value: diseaseRecord.hypertension },
            { name: 'K tuyến giáp', value: diseaseRecord.thyroidcancer },
            { name: 'Rối loạn lipid máu', value: diseaseRecord.dyslipidemia },
            { name: 'Tăng acid uric', value: diseaseRecord.hyperuricemia },
            { name: 'Polyp túi mật', value: diseaseRecord.galibladderpolyps }
          ] : []
          
          return {
            year,
            classifyData: classifyChartData,
            diseaseData: diseaseChartData,
            hasClassifyData: !!classifyRecord,
            hasDiseaseData: !!diseaseRecord
          }
        })
        
        setYearlyData(dataByYear)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    
    fetchData()
  }, [])

  // Color palette for different years
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#a4de6c', '#d084d0', '#8dd1e1']

  return (
    <div style={{ padding: "24px", background: "#f0f9ff" }}>
      {/* Overview Charts */}
      <div style={{
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "24px",
        marginBottom: "24px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.07)"
      }}>
        <h2 style={{ color: "#0284c7", marginTop: 0, fontSize: "20px", borderBottom: "2px solid #0284c7", paddingBottom: "12px" }}>
          Biểu đồ phân loại sức khỏe - Tất cả các năm
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'Số lượng', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            {years.map((year, index) => (
              <Bar 
                key={year} 
                dataKey={year.toString()} 
                fill={colors[index % colors.length]} 
                name={`Năm ${year}`}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "24px",
        marginBottom: "24px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.07)"
      }}>
        <h2 style={{ color: "#0284c7", marginTop: 0, fontSize: "20px", borderBottom: "2px solid #0284c7", paddingBottom: "12px" }}>
          Biểu đồ tình hình bệnh tật - Tất cả các năm
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={diseaseChartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'Số lượng', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            {diseaseYears.map((year, index) => (
              <Bar 
                key={year} 
                dataKey={year.toString()} 
                fill={colors[index % colors.length]} 
                name={`Năm ${year}`}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Per-Year Charts */}
      {yearlyData.map((yearData) => (
        <div 
          key={yearData.year}
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "24px",
            marginBottom: "24px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.07)"
          }}
        >
          <h2 style={{ 
            color: "#0284c7", 
            marginTop: 0, 
            fontSize: "24px", 
            borderBottom: "2px solid #0284c7", 
            paddingBottom: "12px",
            marginBottom: "24px"
          }}>
            Năm {yearData.year}
          </h2>
          
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
            {yearData.hasClassifyData && (
              <div style={{
                flex: 1,
                minWidth: "400px",
                backgroundColor: "#fafafa",
                borderRadius: "8px",
                padding: "16px",
                border: "1px solid #e0e0e0"
              }}>
                <h3 style={{ color: "#0369a1", margin: "0 0 16px 0", fontSize: "16px" }}>
                  Phân loại sức khỏe
                </h3>
                <ResponsiveContainer width="100%" height={380}>
                  <BarChart
                    data={yearData.classifyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'Số lượng', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#0284c7" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
            
            {yearData.hasDiseaseData && (
              <div style={{
                flex: 1,
                minWidth: "400px",
                backgroundColor: "#fafafa",
                borderRadius: "8px",
                padding: "16px",
                border: "1px solid #e0e0e0"
              }}>
                <h3 style={{ color: "#0369a1", margin: "0 0 16px 0", fontSize: "16px" }}>
                  Tình hình bệnh tật
                </h3>
                <ResponsiveContainer width="100%" height={380}>
                  <BarChart
                    data={yearData.diseaseData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'Số lượng', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#059669" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default HomePage
