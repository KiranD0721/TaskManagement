// Import necessary components, stylesheets, and Sidebar component
import Sidebar from '../../components/sidebar/Sidebar'; // Sidebar component
import AddTask from '../../components/taskmanager/AddTask'; // AddTask component
import TaskList from '../../components/taskmanager/TaskList'; // TaskList component
import '../../pages/taskmanagement/taskmanagement.scss'; // Styles for the TaskManagement component

// Define the TaskManagement component
const TaskManagement = () => {
	return (
		<div>
			<div className='taskmanager'>
				<div className='taskmanager__left'>
					<Sidebar />
				</div>
				<div className='taskmanager__right'>
					{/* AddTask component */}
					<div className='taskmanager__addtask'>
						<AddTask />
					</div>
					{/* TaskList component */}
					<div className='taskmanager__tasklist'>
						<TaskList />
					</div>
				</div>
			</div>
		</div>
	);
};

// Export the TaskManagement component as the default export
export default TaskManagement;
