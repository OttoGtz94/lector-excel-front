import {
	BrowserRouter,
	Routes,
	Route,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AuthLayout from './components/layouts/AuthLayout';
import Navbar from './components/layouts/Navbar';
import Home from './components/pages/public/Home';
import Login from './components/pages/public/Login';
import Register from './components/pages/public/Register';
import { AuthProvider } from './context/AuthProvider';
import 'react-toastify/dist/ReactToastify.css';
import HomeUser from './components/pages/private/HomeUser';
import FormExcel from './components/layouts/FormExcel';
import ShowExcel from './components/pages/private/ShowData';
import { ExcelProvider } from './context/ExcelProvider';
import RegistersExcel from './components/pages/private/RegistersExcel';
import Config from './components/pages/private/Config';
import Error404 from './components/pages/public/Error404';

function App() {
	return (
		<div className='app'>
			<ToastContainer />
			<BrowserRouter>
				<AuthProvider>
					<ExcelProvider>
						<Routes>
							<Route path='/' element={<Home />}>
								<Route
									path='account'
									element={<AuthLayout />}>
									<Route
										index
										element={<Login />}
									/>
									<Route
										path='register'
										element={<Register />}
									/>
								</Route>
								<Route
									path='*'
									element={<Error404 />}
								/>
							</Route>

							<Route
								path='/user'
								element={<HomeUser />}>
								<Route
									index
									element={<FormExcel />}
								/>
								<Route
									path='show-excel'
									element={<ShowExcel />}
								/>
								<Route
									path='ver-registros'
									element={<RegistersExcel />}
								/>
								{/*Descomentar cuando este listo la pagina de
										cofiguracion*/}
								{/* <Route
									path='configuracion'
									element={<Config />}
								/> */}
								<Route
									path='*'
									element={<Error404 />}
								/>
							</Route>
						</Routes>
					</ExcelProvider>
				</AuthProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
