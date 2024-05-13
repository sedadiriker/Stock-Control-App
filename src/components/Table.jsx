import { DataGrid } from "@mui/x-data-grid"

const Table = ({rows,columns, handleRowClick}) => {
  return (
    <DataGrid
    rows={rows}
    columns={columns}
    pageSize={5}
    getRowId={(row) => row.name} //! Her satırı ismiyle kimliklendirme
    onRowClick={handleRowClick}
  />
  )
}

export default Table
