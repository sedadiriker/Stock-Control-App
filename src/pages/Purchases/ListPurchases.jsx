import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import useStockRequest from "../../services/useStockRequest";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ListPurchases = () => {
  const { getStock, deleteStock } = useStockRequest();
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const { purchases } = useSelector((state) => state.stock);
  console.log(purchases);
  const columns = [
    {
      field: "date",
      headerName: (
        <Typography
          variant="p"
          color={"#0551B6"}
          textTransform={"uppercase"}
          fontWeight={"bold"}
        >
          Date
        </Typography>
      ),
      flex: 1, // içeriğe göre yer kapla
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Typography variant="body1" color="black">
            {new Date(params.value).toLocaleString()}
          </Typography>
        </Box>
      )
    },
    {
      field: `firm`,
      headerName: (
        <Typography
          variant="p"
          color={"#0551B6"}
          textTransform={"uppercase"}
          fontWeight={"bold"}
        >
          Firm
        </Typography>
      ),
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Typography variant="body1" color="black">
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: `brand`,
      headerName: (
        <Typography
          variant="p"
          color={"#0551B6"}
          textTransform={"uppercase"}
          fontWeight={"bold"}
        >
          Brand
        </Typography>
      ),
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Typography variant="body1" color="black">
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: `product`,
      headerName: (
        <Typography
          variant="p"
          color={"#0551B6"}
          textTransform={"uppercase"}
          fontWeight={"bold"}
        >
          Product
        </Typography>
      ),
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Typography variant="body1" color="black">
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: "quantity",
      headerName: (
        <Typography
          variant="p"
          color={"#0551B6"}
          textTransform={"uppercase"}
          fontWeight={"bold"}
        >
          Quantity
        </Typography>
      ),
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Typography variant="body1" color="black">
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: "price",
      headerName: (
        <Typography
          variant="p"
          color={"#0551B6"}
          textTransform={"uppercase"}
          fontWeight={"bold"}
        >
          Price
        </Typography>
      ),
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Typography variant="body1" color="black">
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: "amount",
      headerName: (
        <Typography
          variant="p"
          color={"#0551B6"}
          textTransform={"uppercase"}
          fontWeight={"bold"}
        >
          Amount
        </Typography>
      ),
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Typography variant="body1" color="black">
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: (
        <Box textAlign={"center"} >
          <Typography
            variant="p"
            color={"#0551B6"}
            textTransform={"uppercase"}
            fontWeight={"bold"}
            textAlign={"center"}
          >
            Actions
          </Typography>
        </Box>
      ),
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'center' }}>
          <DeleteIcon
            sx={{ cursor: "pointer", color: "brown" }}
            onClick={() => handleDeleteConfirmation(params.row)}
          />
        </Box>
      ),
    },
  ];
  
  
  
  const rows = purchases?.map((purchase) => ({
    id:purchase?._id,
    date: purchase?.createdAt,
    firm: purchase?.firmId?.name,
    brand: purchase?.brandId?.name,
    product: purchase?.productId?.name,
    quantity: purchase?.quantity,
    price: purchase?.price,
    amount: purchase?.amount,
  }));

  const handleDeleteConfirmation = (row) => {
    setSelectedPurchase(row);
    setDeleteConfirmationOpen(true);
  };

  const handleDelete = () => {
    deleteStock("products", selectedPurchase.id);
    setDeleteConfirmationOpen(false);
  };

  const handleCancelDelete = () => {
    setSelectedPurchase(null);
    setDeleteConfirmationOpen(false);
  };

  useEffect(() => {
    getStock("purchases");
  }, []);

  return (
    <>
      <Typography
        textAlign={"center"}
        color={"brown"}
        variant="h5"
        fontWeight={"bold"}
        textTransform={"uppercase"}
      >
        List Of Products
      </Typography>
      <Box style={{ height: "70vh", width: "100%", margin: "auto" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableSelectionOnClick
          getRowId={row=>row.id} //! Her satırı  kimliklendirme
        />
      </Box>
      <Modal
        open={deleteConfirmationOpen}
        onClose={handleCancelDelete}
        aria-labelledby="delete-confirmation-modal-title"
        aria-describedby="delete-confirmation-modal-description"
      >
        <Box sx={style}>
          <Typography textAlign={"center"} color={"brown"} textTransform={"uppercase"} fontWeight={"bold"} gutterBottom>
            Delete Product
          </Typography>
          <Typography variant="body1" gutterBottom>
            {`Are you sure you want to delete ${selectedPurchase?.productId}?`}
          </Typography>
          <Box display="flex" justifyContent="center" gap={2} mt={2}>
            <Button variant="contained" color="info" onClick={handleDelete}>
              Delete
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleCancelDelete}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ListPurchases;
