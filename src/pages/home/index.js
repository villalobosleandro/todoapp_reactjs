import { useState } from "react";
import {
  useMutation,
  useQuery
} from "@apollo/client";
import Checkbox from '@material-ui/core/Checkbox';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Pencil from '@material-ui/icons/Edit'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CircularProgress from '@material-ui/core/CircularProgress';

import { TASKS_LIST } from './../../queries'
import {
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK
} from './../../mutation'
import { useAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";

export const Home = () => {
  const [title, setTitle] = useState('')
  const [taskId, setTaskId] = useState('')
  const [value, setValue] = useState('false');
  const [err, setErr] = useState('')
  const {logout, currentUser} = useAuth()
  const history = useHistory()
  const [load, setLoad] = useState(false)

  const { loading, error, data } = useQuery(TASKS_LIST);
  const [taskCreate, { data: info, loading: loading2, error: error2 }] = useMutation(CREATE_TASK, {
    refetchQueries: [
      { query: TASKS_LIST }
    ]
  });
  const [taskUpdate, { data: infoUpdated, loading: loadingUpdated, error: errorUpdated }] = useMutation(UPDATE_TASK, {
    refetchQueries: [
      { query: TASKS_LIST }
    ]
  });
  const [taskDelete, { data: infoRemove, loading: loadingRemove, error: errorRemove }] = useMutation(DELETE_TASK, {
    refetchQueries: [
      { query: TASKS_LIST }
    ]
  });

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleChangeCheck = (task) => {
    const data = {
      title: task.title,
      completed: task.completed === "true" ? "false" : "true",
      id: task.id
    }

    taskUpdate({ variables: { data } });
  };

  const cleanInputs = () => {
    setTaskId('')
    setTitle('')
    setValue('')
  }

  const addOrEditTask = () => {
    const data = {
      title: title,
      completed: value
    }
    if (taskId) {
      data.id = taskId
      taskUpdate({ variables: { data } });
    } else {
      taskCreate({ variables: { data } });
    }

    cleanInputs()
  }

  const removeTask = (id) => {
    const res = window.confirm("Are you sure to delete the task?");
    if (res)
      taskDelete({ variables: { data: { id: id } } })
  }

  const handleLogout = async () => {
    try{
      setLoad(true)
      await logout()
      history.push('/')
    } catch(e) {
      setErr('Failed to logout')
      setLoad(false)
    }
  }

  if (loading || loading2 ||
    loadingUpdated || load ||
    loadingRemove) return <div className="d-flex justify-content-center"><CircularProgress /></div>;
  if (error) return <p>Error</p>;

  return (
    <div className="row">
      <div className="col-md-4">
        <div className="card">
          <div className="px-2">
            <h1>Tasks</h1>
            <button 
                  className="btn btn-danger" 
                  type="button" 
                  onClick={handleLogout}
                >
                  Logout
                </button>
          </div>

          <div className="card-body">
            <form autoComplete="off">
              <input type="hidden" name="_id" formcontrolname="_id" />
              <div className="form-group">
                <input
                  type="text"
                  className="form-control p-3 my-1"
                  value={title}
                  placeholder="Title"
                  required
                  name="title"
                  formcontrolname="title"
                  onChange={(e) => setTitle(e.target.value)}
                />

                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                  <FormControlLabel value="true" control={<Radio />} label="Completed" />
                  <FormControlLabel value="false" control={<Radio />} label="Incompleted" />
                </RadioGroup>
              </div>

              <div className="mt-2">
                <button 
                  className="btn btn-primary" 
                  type="button" 
                  onClick={() => cleanInputs()}
                  disabled={loading || loading2 ||
                    loadingUpdated ||
                    loadingRemove}
                >
                  Clean
                </button>
                <button 
                  className="btn btn-secondary m-3" 
                  onClick={e => {
                    e.preventDefault()
                    addOrEditTask()
                  }}
                  disabled={loading || loading2 ||
                    loadingUpdated ||
                    loadingRemove}
                >
                  {taskId === '' ? 'Save' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="col-md-8">
        <table className="table table-striped">
          <thead>

            <tr >
              <th>title</th>
              <th>completed</th>
            </tr>


          </thead>
          <tbody>
            {
              data?.tasksList.items.map((task, i) => (
                <tr key={i}>
                  <td>{task.title}</td>
                  <td>
                    <Checkbox
                      checked={task.completed === 'true' ? true : false}
                      onChange={() => handleChangeCheck(task)}
                      color="primary"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                  </td>
                  <td>
                    <button className="btn btn-secondary btn-sm mx-2" onClick={() => {
                      setTaskId(task.id)
                      setTitle(task.title)
                      setValue(task.completed)
                    }}>
                      <Pencil />
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => removeTask(task.id)}>
                      <DeleteForeverIcon />
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}