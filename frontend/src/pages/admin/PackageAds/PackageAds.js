import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { randomTraderName, randomEmail } from '@mui/x-data-grid-generator';

const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'age', headerName: 'Age', type: 'number' },
];

const rows = [
    { id: 1, name: randomTraderName(), email: randomEmail(), age: 25 },
    { id: 2, name: randomTraderName(), email: randomEmail(), age: 36 },
    { id: 3, name: randomTraderName(), email: randomEmail(), age: 19 },
    { id: 4, name: randomTraderName(), email: randomEmail(), age: 28 },
    { id: 5, name: randomTraderName(), email: randomEmail(), age: 23 },
    { id: 6, name: randomTraderName(), email: randomEmail(), age: 27 },
    { id: 7, name: randomTraderName(), email: randomEmail(), age: 18 },
    { id: 8, name: randomTraderName(), email: randomEmail(), age: 31 },
    { id: 9, name: randomTraderName(), email: randomEmail(), age: 24 },
    { id: 10, name: randomTraderName(), email: randomEmail(), age: 35 },
];

const PackageAds = () => {
    const [filterModel, setFilterModel] = React.useState({
        items: [],
        quickFilterExcludeHiddenColumns: true,
        quickFilterValues: [''], // Initialize with an empty string
    });

    const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({});

    const handleSearchChange = (event) => {
        const searchValue = event.target.value;
        setFilterModel((model) => ({
            ...model,
            quickFilterValues: [searchValue],
        }));
    };

    return (
        <div>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    columns={columns}
                    rows={rows}
                    filterModel={filterModel} //search
                    onFilterModelChange={(newModel) => setFilterModel(newModel)}
                    columnVisibilityModel={columnVisibilityModel}
                    onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
                    components={{
                        Toolbar: GridToolbar,
                    }}
                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,

                        },
                    }}
                />
            </div>
        </div>
    );
};

export default PackageAds;