import React, { createContext, useState, useEffect } from "react";

// Create context
export const StudentContext = createContext();

const StudentProvider = ({ children }) => {
    const [studentsDatas, setStudentData] = useState(null)
    const [loading,setLoading]=useState(true)
    useEffect(() => {
      const get=async()=>{
        console.log('start fetching');
        setLoading(true)
        if (!JSON.parse(localStorage.getItem('studentsData'))) {
          console.log('data from local storage',JSON.parse(localStorage.getItem('studentsData')));
          setStudentData(JSON.parse(localStorage.getItem('studentsData')))
          setLoading(false)
          return        
        }
        const res=await fetch('http://localhost:5000/api/data')
        const data=await res.json().finally(()=>setLoading(false))
        console.log(data)
        setStudentData(data)
        localStorage.setItem('studentsData',JSON.stringify(data))
      }
      get()
    }, [])

  return (
    <StudentContext.Provider value={{ studentsDatas, loading }}>
      {children}
    </StudentContext.Provider>
  );
};

export default StudentProvider;
