// Import React and necessary stylesheets
import React from 'react';
import '../registeration/registeration.scss'; // Styles for the Signin component
import '../../styles/components/_buttons.scss'; // Button styles
import { useState } from 'react'; // Import useState hook for managing component state
import { useDispatch } from 'react-redux'; // Import useDispatch hook for Redux
import { signin } from '../../redux/authSlice'; // Import the signin action from Redux

// Define the Signin component
const Signin = () => {
	// Initialize Redux dispatch
	const dispatch = useDispatch();

	// Initialize component state using the useState hook
	const [state, setState] = useState({
		email: '',
		password: '',
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

		// Dispatch the signin action with the provided email and password
		dispatch(
			signin({
				email: state.email,
				password: state.password,
			})
		);
	};

	return (
		<div className='signup-form'>
			<div className='signup-form__wrapper'>
				<form className='form' onSubmit={handleSubmit}>
					<h4>Sign In</h4>
					<div className='form-group'>
						<input
							type='email'
							name='email'
							value={state.email}
							id=''
							placeholder='Enter Email'
							onChange={handleChange}
						/>
					</div>
					<div className='form-group'>
						<input
							type='password'
							name='password'
							value={state.password}
							id=''
							placeholder='Enter Password'
							onChange={handleChange}
						/>
					</div>
					<div className='form-group'>
						<button className='button'>Sign In</button>
					</div>
				</form>
			</div>
		</div>
	);
};

// Export the Signin component as the default export
export default Signin;
