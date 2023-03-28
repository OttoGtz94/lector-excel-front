import { useContext } from 'react';
import ExcelContext from '../context/ExcelProvider';

const useUserExcel = () => {
	return useContext(ExcelContext);
};

export default useUserExcel;
