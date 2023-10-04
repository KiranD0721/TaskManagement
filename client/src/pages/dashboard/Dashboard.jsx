// Import React, necessary components, stylesheets, and Redux hooks
import Sidebar from '../../components/sidebar/Sidebar'; // Sidebar component
import { Link } from 'react-router-dom'; // React Router for navigation
import { useSelector, useDispatch } from 'react-redux'; // Redux hooks
import '../../pages/dashboard/dashboard.scss'; // Styles for the Dashboard component
import { useEffect } from 'react'; // React useEffect for side effects
import { getAllTasks } from '../../redux/taskSlice'; // Import action to fetch tasks from Redux

// Define the Dashboard component
const Dashboard = () => {
	// Access task data and user authentication data from Redux state
	const tasklist = useSelector((state) => state.task);
	const { AllTasks } = tasklist;
	const user = useSelector((state) => state.auth);
	const { currentUser } = user;

	// Initialize arrays to store pending and completed tasks
	let pendingTask = [];
	let completedTask = [];

	// Iterate through AllTasks and categorize tasks as pending or completed
	for (let i = 0; i < AllTasks.length; i++) {
		if (AllTasks[i].status === 'todo') {
			pendingTask.push(AllTasks[i]);
		} else if (AllTasks[i].status === 'done') {
			completedTask.push(AllTasks[i]);
		}
	}

	// Initialize Redux dispatch
	const dispatch = useDispatch();

	// Fetch all tasks when the component mounts or when the user data changes
	useEffect(() => {
		dispatch(getAllTasks(currentUser.token, currentUser.id));
	}, [dispatch, currentUser.token, currentUser.id]);

	return (
		<div>
			<div className='dashboard'>
				<div className='dashboard__left'>
					<Sidebar />
				</div>
				<div className='dashboard__right'>
					<div className='dashboard__rightContent'>
						<h2>Task Status Dashboard</h2>

						{/* Display the count of pending and completed tasks */}
						<div className='taskcount'>
							<div className='todo box'>Todo - {pendingTask.length}</div>
							<div className='done box'>Complete - {completedTask.length}</div>
						</div>

						{/* Create Task button */}
						<div className='createButton'>
							<Link to='/taskmanager' className='button'>
								Create Task
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

// Export the Dashboard component as the default export
export default Dashboard;
