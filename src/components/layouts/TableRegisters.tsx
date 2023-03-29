import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import { TableRegisterInterface } from '../../interfaces/table.registers';

const TableRegisters = ({
	rows,
	columns,
	onRowSelectionModelChange,
}: TableRegisterInterface) => {
	return (
		<Box
			sx={{
				height: 380,
				width: 'auto',
			}}>
			<DataGrid
				rows={rows}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: {
							pageSize: 5,
						},
					},
				}}
				style={{ backgroundColor: '#363636' }}
				pageSizeOptions={[5]}
				checkboxSelection
				disableRowSelectionOnClick
				onRowSelectionModelChange={(e: any) =>
					onRowSelectionModelChange(e)
				}
			/>
		</Box>
	);
};

export default TableRegisters;
