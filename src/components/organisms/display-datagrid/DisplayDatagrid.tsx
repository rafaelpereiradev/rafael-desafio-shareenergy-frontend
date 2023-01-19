import { DataGrid,GridCallbackDetails, GridEventListener, GridRowIdGetter, GridRowsProp, GridSlotsComponent, GridSlotsComponentsProps,GridSortModel, GridValidRowModel } from '@mui/x-data-grid';
import {  SxProps, Theme } from '@mui/material';
import { GridInitialStateCommunity } from '@mui/x-data-grid/models/gridStateCommunity';
import CustomNoRowsOverlay from '../../molecules/custom-no-rows-overlay/CustomNoRowsOverlay';

type DataGridType = {
    rows: GridRowsProp;
    columns?: any;
    loading?: boolean;
    sx?: SxProps<Theme>,
    onRowClick?:GridEventListener<'rowClick'>,
    componentsProps?:GridSlotsComponentsProps,
    sortModel?:GridSortModel,
    onSortModelChange?:((model: GridSortModel, details: GridCallbackDetails<any>) => void),
    initialState?: GridInitialStateCommunity,
    getRowId?:GridRowIdGetter<GridValidRowModel>;
    components?:Partial<GridSlotsComponent>;
    minHeight?:string;

};

const DisplayDataGrid = ({ rows, columns, loading,onRowClick,componentsProps,sortModel,minHeight,onSortModelChange,initialState,getRowId,components}: DataGridType) => {
    
    return (
        <>
            <DataGrid
                loading={loading}
                disableSelectionOnClick
                onRowClick={onRowClick}
                hideFooterSelectedRowCount
                rowHeight={48}
                // autoHeight
                pageSize={10}
                rowsPerPageOptions={[10]}
                sortModel={sortModel}
                onSortModelChange={onSortModelChange}
                rows={rows}
                columns={columns}
                getRowId={getRowId}
                components={{
                    NoRowsOverlay: CustomNoRowsOverlay,
                  ...components
                }}
                componentsProps={componentsProps}
                initialState={
                  initialState
                }
                sx={{backgroundColor:'#fff'}}
            />
        </>
    );
};
export default DisplayDataGrid;