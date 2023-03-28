import { toast, ToastOptions } from 'react-toastify';

export const alertToastify = (
	type: string = 'success',
	msg: string,
) => {
	const options: ToastOptions = {
		position: 'top-right',
		autoClose: 1000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: 'light',
	};
	return type === 'success'
		? toast.success(msg, options)
		: type === 'warn'
		? toast.warn(msg, options)
		: toast.error(msg, options);
};

export const formatHourString = (
	hour: string = '10:30',
): string => {
	let hourDate = new Date();

	const hora = Number(hour.split(':')[0]);
	const minutos = Number(hour.split(':')[1]);
	hourDate.setHours(hora, minutos);
	return hourDate.toString();
};
