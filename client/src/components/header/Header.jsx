// Import necessary stylesheets and libraries
import './header.scss'; // Header component styles
import '../../styles/components/_buttons.scss'; // Button styles
import { useSelector, useDispatch } from 'react-redux'; // Redux state management
import { Link } from 'react-router-dom'; // React Router for navigation
import { logoutSuccess } from '../../redux/authSlice'; // Logout action from Redux
import history from '../../history'; // Custom history object for navigation

// Define the Header component
const Header = () => {
	// Initialize Redux dispatch and select 'auth' state from Redux store
	const dispatch = useDispatch();
	const { auth } = useSelector((state) => ({ ...state }));

	// Handle click event when signing out
	const handleClick = (e) => {
		e.preventDefault();

		// Dispatch the logoutSuccess action to log the user out
		dispatch(logoutSuccess());

		// Remove authentication data from localStorage
		localStorage.removeItem('auth');

		// Redirect to the '/signin' page
		history.push('/signin');

		// Reload the window to ensure a fresh state
		window.location.reload();
	};

	return (
		<div>
			{/* Header navigation */}
			<nav className='header'>
				<div className='header__logo'>
					<h5>Task Management</h5>
				</div>
				<div className='header__buttons'>
					{/* Conditional rendering based on user authentication */}
					{auth.currentUser && auth.currentUser.token ? (
						// If user is authenticated, show SignOut button
						<Link to='/signin' className='buttonss' onClick={handleClick}>
							SignOut
						</Link>
					) : (
						// If user is not authenticated, show SignIn and SignUp buttons
						<>
							<Link to='/signin' className='buttonss'>
								SignIn
							</Link>
							<Link to='/signup' className='buttonss'>
								SignUp
							</Link>
						</>
					)}
				</div>
			</nav>
		</div>
	);
};

// Export the Header component as the default export
export default Header;
