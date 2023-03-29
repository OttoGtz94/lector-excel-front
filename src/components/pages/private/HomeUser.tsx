import React, { useEffect } from 'react';
import Sidebar from '../../layouts/Sidebar';
import useAuth from '../../../hooks/useAuth';
import { Outlet } from 'react-router-dom';
import TopBar from '../../layouts/TopBar';

const HomeUser = () => {
	const { auth, hasToken } = useAuth();

	useEffect(() => {
		hasToken();
	}, [auth.auth]);
	return (
		<div className='homeUser'>
			<TopBar />
			<div className='containerOutlet'>
				<Outlet />
			</div>
		</div>
	);
};

export default HomeUser;
