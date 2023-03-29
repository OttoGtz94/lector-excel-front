import { UsuariosExcel } from './users.excel.interface';
import { GridColDef } from '@mui/x-data-grid';

export interface TableRegisterInterface {
	rows: UsuariosExcel[];
	columns: GridColDef[];
	onRowSelectionModelChange: (e: any) => void;
}
