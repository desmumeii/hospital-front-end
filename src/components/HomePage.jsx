import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { getAll } from '../services/classifypatients'
import { getAll as getAllDiseases } from '../services/diseaserecords'

const HomePage = () => {
  const [chartData, setChartData] = useState([])
  const [years, setYears] = useState([])
  const [diseaseChartData, setDiseaseChartData] = useState([])
  const [diseaseYears, setDiseaseYears] = useState([])
  const [classifyData2024, setClassifyData2024] = useState([])
  const [diseaseData2024, setDiseaseData2024] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAll()
        
        // Extract unique years and sort them
        const uniqueYears = [...new Set(data.map(record => record.year))].sort()
        setYears(uniqueYears)
        
        // Transform data for grouped bar chart
        // Each patient type is a column group, each year is a different colored bar
        const transformedData = [
          {
            name: 'Type I',
            ...Object.fromEntries(uniqueYears.map(year => {
              const record = data.find(r => r.year === year)
              return [year.toString(), record ? record.typeI : 0]
            }))
          },
          {
            name: 'Type II',
            ...Object.fromEntries(uniqueYears.map(year => {
              const record = data.find(r => r.year === year)
              return [year.toString(), record ? record.typeII : 0]
            }))
          },
          {
            name: 'Type III',
            ...Object.fromEntries(uniqueYears.map(year => {
              const record = data.find(r => r.year === year)
              return [year.toString(), record ? record.typeIII : 0]
            }))
          },
          {
            name: 'Type IV',
            ...Object.fromEntries(uniqueYears.map(year => {
              const record = data.find(r => r.year === year)
              return [year.toString(), record ? record.typeIV : 0]
            }))
          },
          {
            name: 'Type V',
            ...Object.fromEntries(uniqueYears.map(year => {
              const record = data.find(r => r.year === year)
              return [year.toString(), record ? record.typeV : 0]
            }))
          }
        ]
        
        setChartData(transformedData)
      } catch (error) {
        console.error('Error fetching classification data:', error)
      }
    }
    
    const fetchDiseaseData = async () => {
      try {
        const data = await getAllDiseases()
        
        // Extract unique years and sort them
        const uniqueYears = [...new Set(data.map(record => record.year))].sort()
        setDiseaseYears(uniqueYears)
        
        // Transform data for grouped bar chart
        const transformedData = [
          {
            name: 'Diabetes',
            ...Object.fromEntries(uniqueYears.map(year => {
              const record = data.find(r => r.year === year)
              return [year.toString(), record ? record.diabetes : 0]
            }))
          },
          {
            name: 'Hypertension',
            ...Object.fromEntries(uniqueYears.map(year => {
              const record = data.find(r => r.year === year)
              return [year.toString(), record ? record.hypertension : 0]
            }))
          },
          {
            name: 'Thyroid Cancer',
            ...Object.fromEntries(uniqueYears.map(year => {
              const record = data.find(r => r.year === year)
              return [year.toString(), record ? record.thyroidcancer : 0]
            }))
          },
          {
            name: 'Dyslipidemia',
            ...Object.fromEntries(uniqueYears.map(year => {
              const record = data.find(r => r.year === year)
              return [year.toString(), record ? record.dyslipidemia : 0]
            }))
          },
          {
            name: 'Hyperuricemia',
            ...Object.fromEntries(uniqueYears.map(year => {
              const record = data.find(r => r.year === year)
              return [year.toString(), record ? record.hyperuricemia : 0]
            }))
          },
          {
            name: 'Gall Bladder Polyps',
            ...Object.fromEntries(uniqueYears.map(year => {
              const record = data.find(r => r.year === year)
              return [year.toString(), record ? record.galibladderpolyps : 0]
            }))
          }
        ]
        
        setDiseaseChartData(transformedData)
      } catch (error) {
        console.error('Error fetching disease data:', error)
      }
    }
    
    const fetchData2024 = async () => {
      try {
        const classifyDataRaw = await getAll()
        const diseaseDataRaw = await getAllDiseases()
        
        // Filter data for 2024
        const classify2024 = classifyDataRaw.find(r => r.year === 2024)
        const disease2024 = diseaseDataRaw.find(r => r.year === 2024)
        
        if (classify2024) {
          const classifyFormatted = [
            { name: 'Type I', value: classify2024.typeI },
            { name: 'Type II', value: classify2024.typeII },
            { name: 'Type III', value: classify2024.typeIII },
            { name: 'Type IV', value: classify2024.typeIV },
            { name: 'Type V', value: classify2024.typeV }
          ]
          setClassifyData2024(classifyFormatted)
        }
        
        if (disease2024) {
          const diseaseFormatted = [
            { name: 'Diabetes', value: disease2024.diabetes },
            { name: 'Hypertension', value: disease2024.hypertension },
            { name: 'Thyroid Cancer', value: disease2024.thyroidcancer },
            { name: 'Dyslipidemia', value: disease2024.dyslipidemia },
            { name: 'Hyperuricemia', value: disease2024.hyperuricemia },
            { name: 'Gall Bladder Polyps', value: disease2024.galibladderpolyps }
          ]
          setDiseaseData2024(diseaseFormatted)
        }
      } catch (error) {
        console.error('Error fetching 2024 data:', error)
      }
    }
    
    fetchData()
    fetchDiseaseData()
    fetchData2024()
  }, [])

  // Color palette for different years
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#a4de6c', '#d084d0', '#8dd1e1']

  return (
    <div style={{ padding: "24px", background: "#f0f9ff" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "0 0 8px 0", color: "#0284c7", fontSize: "32px" }}>
          Patient Classification Dashboard
        </h1>
        <p style={{ margin: 0, color: "#666", fontSize: "16px" }}>
          Healthcare Analytics and Monitoring System
        </p>
      </div>
      
      <div style={{
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "24px",
        marginBottom: "24px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.07)"
      }}>
        <h2 style={{ color: "#0284c7", marginTop: 0, fontSize: "20px", borderBottom: "2px solid #0284c7", paddingBottom: "12px" }}>
          Patient Classification by Type and Year
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'Number of Patients', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            {years.map((year, index) => (
              <Bar 
                key={year} 
                dataKey={year.toString()} 
                fill={colors[index % colors.length]} 
                name={`Year ${year}`}
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
          Disease Records by Type and Year
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={diseaseChartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'Number of Cases', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            {diseaseYears.map((year, index) => (
              <Bar 
                key={year} 
                dataKey={year.toString()} 
                fill={colors[index % colors.length]} 
                name={`Year ${year}`}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "24px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.07)"
      }}>
        <h2 style={{ color: "#0284c7", marginTop: 0, fontSize: "20px", borderBottom: "2px solid #0284c7", paddingBottom: "12px" }}>
          2024 Overview - Detailed Comparison
        </h2>
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          <div style={{
            flex: 1,
            minWidth: "400px",
            backgroundColor: "#fafafa",
            borderRadius: "8px",
            padding: "16px",
            border: "1px solid #e0e0e0"
          }}>
            <h3 style={{ color: "#0369a1", margin: "0 0 16px 0", fontSize: "16px" }}>
              Patient Classification 2024
            </h3>
            <ResponsiveContainer width="100%" height={380}>
              <BarChart
                data={classifyData2024}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Bar dataKey="value" fill="#0284c7" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div style={{
            flex: 1,
            minWidth: "400px",
            backgroundColor: "#fafafa",
            borderRadius: "8px",
            padding: "16px",
            border: "1px solid #e0e0e0"
          }}>
            <h3 style={{ color: "#0369a1", margin: "0 0 16px 0", fontSize: "16px" }}>
              Disease Records 2024
            </h3>
            <ResponsiveContainer width="100%" height={380}>
              <BarChart
                data={diseaseData2024}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Bar dataKey="value" fill="#059669" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
