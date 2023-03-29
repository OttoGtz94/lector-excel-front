import { useState, useEffect, createContext } from 'react';
import { authModel } from '../interfaces/auth.interface';
import { decodeToken } from 'react-jwt';
import axios from 'axios';
import { alertToastify } from '../helpers/index';
import { useNavigate } from 'react-router-dom';

interface props {
	children: JSX.Element | JSX.Element[];
}

interface stateInitial {
	//decodedJWT: (token: string) => void;
	auth: authModel;
	setAuth: (param: authModel) => void;
	hasToken: () => Promise<any>;
}

const AuthContext = createContext<stateInitial>(
	{} as stateInitial,
);

const AuthProvider = ({ children }: props) => {
	const [auth, setAuth] = useState<authModel>({
		id: '',
		name: '',
		firstName: '',
		userName: '',
	});

	const navigate = useNavigate();

	const hasToken = async (): Promise<any> => {
		const token = localStorage.getItem('token');
		try {
			if (token) {
				const { data } = await axios.post(
					`${
						import.meta.env.VITE_BACKEND_URL
					}/users/verify-token`,
					{ token: token },
				);
				if (data.status === 400) {
					alertToastify('error', data.msg);
					localStorage.removeItem('token');
					if (localStorage.getItem('auth')) {
						localStorage.removeItem('auth');
					}
					navigate('/');
					return false;
				} else {
					alertToastify('success', data.msg);
					setAuth({
						id: data.dataJWT.id,
						name: data.dataJWT.name,
						firstName: data.dataJWT.firstName,
						userName: data.dataJWT.userName,
						auth: true,
					});
					return true;
				}
			} else {
				alertToastify('error', 'No existe token');
				if (localStorage.getItem('auth')) {
					localStorage.removeItem('auth');
				}
				navigate('/');
				return false;
			}
		} catch (error) {}
	};

	return (
		<AuthContext.Provider
			value={{ hasToken, auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthProvider };

export default AuthContext;
