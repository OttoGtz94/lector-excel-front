import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../../layouts/Navbar';

const Home = () => {
	const navigate = useNavigate();
	useEffect(() => {
		const auth: boolean =
			localStorage.getItem('auth')?.toLowerCase() ===
			'true';
		if (auth) {
			navigate('/user');
			return;
		}
	}, []);
	return (
		<div>
			<Navbar />
			<main>
				<Outlet />
			</main>
		</div>
	);
};

export default Home;
