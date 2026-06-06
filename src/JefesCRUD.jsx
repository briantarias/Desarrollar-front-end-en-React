import { useEffect, useState } from 'react'

export const JefesCRUD = () => {
  const [datos, setDatos] = useState([])
  const [form, setForm] = useState({ id: '', nombre: '', edad: '', sexo: '', carrera: '' })
  const [modoEdicion, setModoEdicion] = useState(false)
  const [mensaje, setMensaje] = useState('')

  // READ GET DATOS DEL SERVIDOR
  const getDatos = async () => {
    try {
      const response = await fetch('http://localhost:3000/jefes')
      if (!response.ok) throw new Error("No hay respuesta del servidor")
      const data = await response.json()
      setDatos(data)
    } catch (error) {
      setMensaje(`Error: ${error.message}`)
    }
  }

  useEffect(() => {
    getDatos()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // CREATE DE POST y UPDATE (PUT)
  const handleSubmit = async (e) => {
    e.preventDefault()
    const url = modoEdicion 
      ? `http://localhost:3000/jefes/${form.id}` 
      : 'http://localhost:3000/jefes'
    const { id, ...payload } = form
    const body = modoEdicion ? form : payload
    
    try {
      const response = await fetch(url, {
        method: modoEdicion ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        setMensaje(`Jefe ${modoEdicion ? 'actualizado' : 'insertado'} correctamente ✅`)
        setForm({ id: '', nombre: '', edad: '', sexo: '', carrera: '' })
        setModoEdicion(false)
        getDatos()
      } else {
        setMensaje(`Error: ${response.status} - ${response.statusText}`)
      }
    } catch (error) {
      setMensaje(`Error de conexión: ${error.message}`)
    }
  }

  // DELETE (Borrar)
  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este registro?")) return
    
    try {
      const response = await fetch(`http://localhost:3000/jefes/${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        setMensaje("Jefe eliminado correctamente 🗑️")
        getDatos()
      } else {
        setMensaje(`Error: ${response.status} - ${response.statusText}`)
      }
    } catch (error) {
      setMensaje(`Error al eliminar: ${error.message}`)
    }
  }

  const cargarEditar = (jefe) => {
    setForm(jefe)
    setModoEdicion(true)
  }

  return (
    <div className="w3-row w3-margin-top">
      {/* Columna que contiene el Formulario donde se rellena los datos jeje */}
      <div className="w3-col l4 m12 w3-padding">
        <form onSubmit={handleSubmit} className="w3-container w3-card-4 w3-light-grey w3-padding-large w3-round">
          <h3 className="w3-center">{modoEdicion ? '✏️ Editar' : '👤 Alta de'} Jefe</h3>
          
          {modoEdicion && (
            <div className="w3-margin-bottom-custom">
              <label className="w3-text-grey"><strong>🆔 ID (Identificador)</strong></label>
              <input className="w3-input w3-border w3-round" name="id" value={form.id} disabled autoComplete="off" />
            </div>
          )}

          <div className="w3-margin-bottom-custom w3-margin-top">
            <label className="w3-text-grey"><strong>👤 Nombre completo</strong></label>
            <input className="w3-input w3-border w3-round" name="nombre" value={form.nombre} onChange={handleChange} required />
          </div>

          <div className="w3-margin-bottom-custom w3-margin-top">
            <label className="w3-text-grey"><strong>🎂 Edad</strong></label>
            <input className="w3-input w3-border w3-round" type="number" name="edad" value={form.edad} onChange={handleChange} min="1" max="120" required />
          </div>

          <div className="w3-margin-bottom-custom w3-margin-top">
            <label className="w3-text-grey"><strong>⚥ Sexo</strong></label>
            <div style={{ display: 'flex', gap: '20px', marginTop: '5px' }}>
              <label>
                <input type="radio" className="w3-radio" name="sexo" value="m" checked={form.sexo === 'm'} onChange={handleChange} required /> 
                <span className="w3-margin-left">Masculino</span>
              </label>
              <label>
                <input type="radio" className="w3-radio" name="sexo" value="f" checked={form.sexo === 'f'} onChange={handleChange} /> 
                <span className="w3-margin-left">Femenino</span>
              </label>
            </div>
          </div>

          <div className="w3-margin-bottom-custom w3-margin-top">
            <label className="w3-text-grey"><strong>🏢 Departamento</strong></label>
            <select className="w3-select w3-border w3-round" name="carrera" value={form.carrera} onChange={handleChange} required>
              <option value="" disabled>-- Seleccione un departamento --</option>
              <option value="Dirección General">Dirección General</option>
              <option value="Operaciones CFE">Operaciones CFE</option>
              <option value="Comercialización">Comercialización</option>
              <option value="Finanzas">Finanzas</option>
              <option value="Recursos Humanos">Recursos Humanos</option>
            </select>
          </div>

          <button type="submit" className="w3-button w3-blue w3-block w3-round w3-margin-top">
            {modoEdicion ? 'Actualizar Registro' : 'Enviar registro'}
          </button>

          {modoEdicion && (
            <button type="button" onClick={() => { setModoEdicion(false); setForm({ id: '', nombre: '', edad: '', sexo: '', carrera: '' }) }} className="w3-button w3-gray w3-block w3-round w3-margin-top">
              Cancelar Edición
            </button>
          )}
          
          {mensaje && <p className="w3-text-blue w3-center w3-margin-top"><strong>{mensaje}</strong></p>}
        </form>
      </div>

      {/* Columna Tabla */}
      <div className="w3-col l8 m12 w3-padding">
        <table className="w3-table-all w3-hoverable">
          <thead>
            <tr className="w3-blue">
              <th>ID</th>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Sexo</th>
              <th>Departamento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((item, idx) => (
              <tr key={item.id ?? idx} style={{ backgroundColor: idx % 2 === 0 ? '#f1f1f1' : 'white' }}>
                <td>{item.id}</td>
                <td style={{ textAlign: 'left' }}>{item.nombre}</td>
                <td>{item.edad}</td>
                <td>{item.sexo}</td>
                <td>{item.carrera}</td>
                <td>
                  <button onClick={() => cargarEditar(item)} className="w3-button w3-small w3-teal w3-round w3-margin-right">Editar</button>
                  <button onClick={() => handleDelete(item.id)} className="w3-button w3-small w3-red w3-round">Borrar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}