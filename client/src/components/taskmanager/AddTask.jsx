// Import React and necessary stylesheets
import { useState } from 'react';
import '../../components/taskmanager/addtask.scss'; // Styles for the AddTask component
import { addTask } from '../../redux/taskSlice'; // Import the addTask action from Redux
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector hooks for Redux

// Define the AddTask component
const AddTask = () => {
	// Initialize Redux dispatch and access user authentication data from Redux state
	const dispatch = useDispatch();
	const { auth } = useSelector((state) => ({ ...state }));
	const { currentUser } = auth;

	// Initialize component state using the useState hook
	const [state, setState] = useState({
		task: '',
	});

	// Handle input changes and update the component state
	const handleChange = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};

	// Handle form submission
	const handleSubmit = (e) => {
		e.preventDefault();

		// Dispatch the addTask action with the provided task and user ID
		dispatch(addTask(state.task, currentUser.id));

		// Clear the input field after task is added
		setState({
			task: '',
		});
	};

	return (
		<div>
			<div className='addtask'>
				{/* Task input form */}
				<form action='' onSubmit={handleSubmit}>
					<input
						type='text'
						name='task'
						placeholder='Add your task'
						onChange={handleChange}
						value={state.task}
					/>
					<button className='button'>Add Task</button>
				</form>
			</div>
		</div>
	);
};

// Export the AddTask component as the default export
export default AddTask;
