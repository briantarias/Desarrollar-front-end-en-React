import { useEffect, useState } from 'react'

export const ProductosCRUD = () => {
  const [datos, setDatos] = useState([])
  const [form, setForm] = useState({ id: '', nombre: '', precio: '', categoria: '' })
  const [modoEdicion, setModoEdicion] = useState(false)
  const [mensaje, setMensaje] = useState('')

  const getDatos = async () => {
    try {
      const response = await fetch('http://localhost:3000/productos')
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const url = modoEdicion 
      ? `http://localhost:3000/productos/${form.id}` 
      : 'http://localhost:3000/productos'
    const { id, ...payload } = form
    const body = modoEdicion ? form : payload
    
    try {
      const response = await fetch(url, {
        method: modoEdicion ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        setMensaje(`Producto ${modoEdicion ? 'actualizado' : 'insertado'} correctamente ✅`)
        setForm({ id: '', nombre: '', precio: '', categoria: '' })
        setModoEdicion(false)
        getDatos()
      } else {
        setMensaje(`Error: ${response.status} - ${response.statusText}`)
      }
    } catch (error) {
      setMensaje(`Error de conexión: ${error.message}`)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este registro?")) return
    
    try {
      const response = await fetch(`http://localhost:3000/productos/${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        setMensaje("Producto eliminado correctamente 🗑️")
        getDatos()
      } else {
        setMensaje(`Error: ${response.status} - ${response.statusText}`)
      }
    } catch (error) {
      setMensaje(`Error al eliminar: ${error.message}`)
    }
  }

  const cargarEditar = (producto) => {
    setForm(producto)
    setModoEdicion(true)
  }

  return (
    <div className="w3-row w3-margin-top">
      <div className="w3-col l4 m12 w3-padding">
        <form onSubmit={handleSubmit} className="w3-container w3-card-4 w3-light-grey w3-padding-large w3-round">
          <h3 className="w3-center">{modoEdicion ? '✏️ Editar' : '📦 Alta de'} Producto</h3>
          
          {modoEdicion && (
            <div className="w3-margin-bottom">
              <label className="w3-text-grey"><strong>🆔 ID Producto</strong></label>
              <input className="w3-input w3-border w3-round" name="id" value={form.id} disabled autoComplete="off" />
            </div>
          )}

          <div className="w3-margin-bottom w3-margin-top">
            <label className="w3-text-grey"><strong>📦 Nombre del Producto</strong></label>
            <input className="w3-input w3-border w3-round" name="nombre" value={form.nombre} onChange={handleChange} required />
          </div>

          <div className="w3-margin-bottom w3-margin-top">
            <label className="w3-text-grey"><strong>💰 Precio</strong></label>
            <input className="w3-input w3-border w3-round" type="number" name="precio" value={form.precio} onChange={handleChange} min="0" step="0.01" required />
          </div>

          <div className="w3-margin-bottom w3-margin-top">
            <label className="w3-text-grey"><strong>🏷️ Categoría</strong></label>
            <input className="w3-input w3-border w3-round" name="categoria" value={form.categoria} onChange={handleChange} required />
          </div>

          <button type="submit" className="w3-button w3-blue w3-block w3-round w3-margin-top">
            {modoEdicion ? 'Actualizar Producto' : 'Enviar registro'}
          </button>

          {modoEdicion && (
            <button type="button" onClick={() => { setModoEdicion(false); setForm({ id: '', nombre: '', precio: '', categoria: '' }) }} className="w3-button w3-gray w3-block w3-round w3-margin-top">
              Cancelar Edición
            </button>
          )}
          
          {mensaje && <p className="w3-text-blue w3-center w3-margin-top"><strong>{mensaje}</strong></p>}
        </form>
      </div>

      <div className="w3-col l8 m12 w3-padding">
        <table className="w3-table-all w3-hoverable">
          <thead>
            <tr className="w3-blue">
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((item, idx) => (
              <tr key={item.id ?? idx} style={{ backgroundColor: idx % 2 === 0 ? '#f1f1f1' : 'white' }}>
                <td>{item.id}</td>
                <td style={{ textAlign: 'left' }}>{item.nombre}</td>
                <td>${item.precio}</td>
                <td>{item.categoria}</td>
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