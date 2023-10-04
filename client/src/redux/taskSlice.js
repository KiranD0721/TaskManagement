// Import necessary dependencies
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// Retrieve initial task data from local storage if available
const initialTask = localStorage.getItem('task')
  ? JSON.parse(localStorage.getItem('task'))
  : null;

// Define the initial state for the task slice
const initialState = {
  TaskData: initialTask, // Data for individual tasks
  AllTasks: {}, // Data for all tasks
};

// Create a task slice using Redux Toolkit
export const taskSlice = createSlice({
  name: 'Task', // Slice name
  initialState, // Initial state

  reducers: {
    // Reducer for successful task addition
    taskAddedSuccessfully: (state, action) => {
      state.TaskData = action.payload;
    },
    // Reducer for task addition failure
    taskAddFailure: (state) => {
      return state;
    },
    // Reducer for successful retrieval of all tasks
    getAllTaskSuccess: (state, action) => {
      state.AllTasks = action.payload;
    },
    // Reducer for failure in retrieving all tasks
    getAllTaskFailure: (state) => {
      return state;
    },
    // Reducer for successful task editing
    editTaskSuccess: (state, action) => {
      state.TaskData = action.payload;
    },
    // Reducer for successful task deletion
    deleteSuccess: (state, action) => {
      state.TaskData = action.payload;
    },
    // Reducer for task deletion failure
    deletefail: (state) => {
      return state;
    },
  },
});

// Export action creators
export const {
  taskAddFailure,
  taskAddedSuccessfully,
  getAllTaskFailure,
  getAllTaskSuccess,
  deleteSuccess,
  deletefail,
  editTaskSuccess,
} = taskSlice.actions;

// Export the task reducer
export default taskSlice.reducer;

// Action creator for adding a new task
export const addTask = (task, id) => async (dispatch) => {
  const taskData = {
    task,
    id,
  };

  try {
    // Make a POST request to add a new task
    const response = await axios.post('http://localhost:4000/task/add', taskData);

    if (response) {
      // Store the response data in local storage
      localStorage.setItem('task', JSON.stringify(response.data));

      // Dispatch a success action and display a success toast
      dispatch(taskAddedSuccessfully(response.data));
      toast.success('Task added successfully');
      window.location.reload();
    } else {
      // Dispatch a failure action if the request fails
      dispatch(taskAddFailure());
    }
  } catch (error) {
    console.error(error);
  }
};

// Action creator for retrieving all tasks
export const getAllTasks = (token, id) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      id,
    },
  };

  try {
    // Make a GET request to retrieve all tasks
    const response = await axios.get('http://localhost:4000/task/tasks', config);

    if (response) {
      // Dispatch a success action with the retrieved data
      dispatch(getAllTaskSuccess(response.data));
    }
  } catch (error) {
    if (error.response.status === 400) {
      // Dispatch a failure action if the request fails
      dispatch(getAllTaskFailure());
    }
  }
};

// Action creator for handling arrow button click to update task status
export const arrowClick = (item, string) => async () => {
  let taskData = {
    id: item._id,
    status: item.status,
    string,
  };

  try {
    // Make a PUT request to update the task status
    let response = await axios.put(`http://localhost:4000/task/${taskData.id}`, taskData);

    if (response) {
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
};

// Action creator for deleting a task
export const deleteItem = (id) => async (dispatch) => {
  try {
    // Make a DELETE request to delete the task
    let res = await axios.delete(`http://localhost:4000/task/${id}`);

    if (res) {
      // Dispatch a success action and display a success toast
      dispatch(deleteSuccess());
      toast.success('Task deleted successfully');
      window.location.reload();
    } else {
      // Dispatch a failure action if the request fails
      dispatch(deletefail());
    }
  } catch (error) {
    console.error(error);
  }
};
