import * as React from "react";
import { useSelector } from "react-redux";
import useStockRequest from "../services/useStockRequest";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import FirmDetailModal from "../components/FirmDetailModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ListBrands = () => {
  const [selectedFirm, setSelectedFirm] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const { brands } = useSelector((state) => state.getbrands);
  const { getBrands } = useStockRequest();

  const ActionCell = ({ onEdit, onDelete }) => {
    return (
      <div>
        <IconButton onClick={onEdit}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </div>
    );
  };
  
  const columns = [
    {
      field: "image",
      headerName: <span style={{ fontWeight: "bold",color:"#0551B6", textTransform:"uppercase" }}>Logo</span>,
      width: 200,
      renderCell: (params) => (
        <Avatar alt={params.value} src={params.value} sx={{ width: 50, height: 50 }} /> //! özel hücre bileşeni
      ),
    },
    { field: "name", headerName: <span style={{ fontWeight: "bold",color:"#0551B6", textTransform:"uppercase" }}>Name</span>, width: 500 },
    { field: "action", headerName: <span style={{ fontWeight: "bold", color: "#0551B6", textTransform: "uppercase" }}>Actions</span>, width: 100,
    renderCell: (params) => (
      <ActionCell 
        // onEdit={() => handleEdit(params.row)} 
        // onDelete={() => handleDelete(params.row)} 
      />
    ),
  },
  ];

  const rows = brands?.map((brand) => ({ name: brand?.name, image: brand?.image }));

  const handleRowClick = (row) => {
    setSelectedFirm(row);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  React.useEffect(() => {
    getBrands();
  }, [brands]);

  return (
    <>
      <Typography textAlign={"center"} color={"brown"} variant="h5" fontWeight={"bold"} textTransform={"uppercase"}>
        List Of Brands
      </Typography>
      <Box style={{ height: "70vh", width: "70%", margin: "auto" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          getRowId={(row) => row.name}
          onRowClick={handleRowClick}
        />
      </Box>
      <FirmDetailModal open={showModal} handleClose={closeModal} firm={selectedFirm} />
    </>
  );
};

export default ListBrands;
