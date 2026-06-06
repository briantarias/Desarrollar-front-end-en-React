import { Route, Routes, Navigate } from 'react-router-dom'
import { NavBar } from './NavBar'
import { JefesCRUD } from './JefesCRUD'
import { ProductosCRUD } from './ProductosCRUD'
import { EmpleadosCRUD } from './EmpleadosCRUD'

function App() {
  return (
    <div className='w3-container w3-padding'>
      <NavBar />
      <Routes>
        <Route path="/" element={<h2 className="w3-center w3-margin-top">Bienvenido a la Administración de CFE</h2>} />
        
        {/* Usando 3 entidades Jefes, Productos y Empleados */}
        <Route path="/jefes" element={<JefesCRUD />} />
        <Route path="/productos" element={<ProductosCRUD />} />
        <Route path="/empleados" element={<EmpleadosCRUD />} />
        
        <Route path="/*" element={<Navigate to='/' />} />
      </Routes>
    </div>
  )
}

export default App