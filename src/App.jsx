import { useState, useEffect } from 'react'
import Staffs from './components/Staffs'
import { useDispatch } from 'react-redux'
import { initializeStaffs } from './reducers/staffReducer'

const App = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(initializeStaffs())
      setLoading(false)
    }
    fetchData()
  }, [dispatch])

  if (loading) {
    return <div>Loading staff records...</div>
  }

  return (
    <div>
      <Staffs />
    </div>
  )
}
export default App
