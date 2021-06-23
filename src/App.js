import React, {useState, useEffect} from 'react'
import {isEmpty, size} from 'lodash'

function App() {

  const db = `http://taskcorripio.somee.com/DistribuidoraTask`

  const result = {statusResponse : false, data: null, error: null}    
  const [task, setTask] = useState(null)

  const [taskList, setTaskList] = useState(null)
  const [error, setError] = useState(null)

  const [taskUpdate, setTaskUpdate] = useState(false)

  useEffect(() => {
    const getTask = () => {
      
  
      const url = db +"/GetTask"
  
       fetch(url).then((response) => {
          return response.json()
      }).then((task) => {
        setTaskList(task.result)       
      })   
  }

  getTask()
  setTaskUpdate(false)
  }, [taskUpdate])


  

  const  posTask = (e) =>{
      e.preventDefault()
      if (isEmpty(task)) {
        setError("El campo esta vacio")
        return
      }

      const taskElement = {
        taskDescription : task
      }
      const taskPost = {
        method: 'POST',
        headers: {'content-type' : 'application/json'},
        body: JSON.stringify(taskElement),
      }

      const urlReponse = db + "/PostTask"

      fetch(urlReponse, taskPost)
      .then(res=>res.text())
      .then(res=>console.log(res))

      setTaskUpdate(true)
       setTask("")
  }

  
  const deleteTask = (id) => {

    const taskDelete = {
      method: 'DELETE',
      headers: {'content-type' : 'application/json'},

    }

    const urlReponse = db + "/DeleteTask?id=" + id

    fetch(urlReponse, taskDelete)
    .then(res=>res.text())
    .then(res=>console.log(res))
    setTaskUpdate(true)
  }
  return (

    <div className="container mt-5">
       <h1 className="text-center">Distribuidora Corripio Tarea</h1>
       <hr/>
       
         
         <div className="col-12">
         <h5>Lista de Tarea</h5>    
         <form onSubmit={posTask}>

           <div>
             <button 
             className="btn btn-outline-success"
             type="submit"
             >Agregar</button>
           </div>
           <h4></h4>
           <input 
            className="form-control col-sm-2"
            type="text" 
            placeholder="Agrear nueva tarea...."
            onChange={(text) => setTask(text.target.value)}
            value={task}
            />
          {
            error &&  <span className="text-danger">{error}</span>
          }
         </form>       
           <h4></h4>

           {        
            size(taskList) === 0  ?(
              <li className="list-group-item text-center">No existe tareas</li>
            ) : (
              <ul className="list-group-item">
              {

                taskList.map((task) => (
                <li key={task.id} className="list-group-item" >
                  {task.taskDescription}
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                   <button type="button" className="btn btn-outline-danger me-md-2" onClick={() => deleteTask(task.id)}>Eliminar</button>
                   <button type="button" className="btn btn-outline-primary">Completa</button>
                  </div>
               </li>   
                ))
              }            
          </ul>

            )
          }
         </div>
       

    </div>
  );
}

export default App;
