import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
	return (
		<>
			<div className='containerDes'>
				<h2 className='titleDes'>
					Crea tu cuenta o Inicia Sesión para utilizar
					el Lector de Excel
				</h2>
			</div>
			<div className='containerOutlet'>
				<Outlet />
			</div>
		</>
	);
};

export default AuthLayout;
