// Import React and necessary stylesheets, components, and Redux hooks
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTasks } from '../../redux/taskSlice'; // Import action to fetch tasks from Redux
import ListCard from './ListCard'; // Import the ListCard component
import '../../components/taskmanager/tasklist.scss'; // Styles for the TaskList component

// Define the TaskList component
const TaskList = () => {
	// Access user authentication data and task data from Redux state
	const auth = useSelector((state) => state.auth);
	const tasks = useSelector((state) => state.task);

	// Destructure necessary data from the auth and tasks objects
	const { currentUser } = auth;
	const { AllTasks } = tasks;

	// Initialize Redux dispatch
	const dispatch = useDispatch();

	// Fetch all tasks when the component mounts or when the user data changes
	useEffect(() => {
		dispatch(getAllTasks(currentUser.token, currentUser.id));
	}, [dispatch, currentUser.token, currentUser.id]);

	return (
		<div>
			{/* Task list header */}
			<ul className='list-header'>
				<li>
					<h5>Id</h5>
				</li>
				<li>
					<h5>Task</h5>
				</li>
				<li>
					<h5>Status</h5>
				</li>
				<li>
					<h5>Action</h5>
				</li>
			</ul>

			{/* Render ListCard component for each task */}
			{Object.values(AllTasks).map((item) => {
				return <ListCard key={item._id} item={item} />;
			})}
		</div>
	);
};

// Export the TaskList component as the default export
export default TaskList;
