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

const ListBrands = () => {
  const { getStock, deleteStock } = useStockRequest();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const { products } = useSelector((state) => state.stock);
  console.log(products);
  const columns = [
    {
      field: "name", // nesneyle aynı olmalı
      headerName: (
        <Typography
          variant="p"
          color={"#0551B6"}
          textTransform={"uppercase"}
          fontWeight={"bold"}
        >
          Name
        </Typography>
      ),
      width: 170,
    },
    {
      field: "category",
      headerName: (
        <Typography
          variant="p"
          color={"#0551B6"}
          textTransform={"uppercase"}
          fontWeight={"bold"}
        >
          Category
        </Typography>
      ),
      width: 170,
      renderCell: (params) => (
        <Typography variant="body1" color="black">
          {params.value}
        </Typography>
      ),
    },
    {
      field: "brand",
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
      width: 150,
      renderCell: (params) => (
        <Typography variant="body1" color="black">
          {params.value}
        </Typography>
      ),
    },
    {
      field: "stock",
      headerName: (
        <Typography
          variant="p"
          color={"#0551B6"}
          textTransform={"uppercase"}
          fontWeight={"bold"}
        >
          Stock
        </Typography>
      ),
      width: 150,
    },
    {
      field: "actions",
      headerName: (
        <Box textAlign={"center"} sx={{ width: 150 }}>
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
      width: 150,
      renderCell: (params) => (
        <Box textAlign={"center"}>
          <DeleteIcon
            sx={{ cursor: "pointer", color: "brown" }}
            onClick={() => handleDeleteConfirmation(params.row)}
          />
        </Box>
      ),
    },
  ];
console.log("selectedProduct",selectedProduct)
  const rows = products?.map((product) => ({
    name: product?.name,
    category: product?.categoryId.name,
    brand: product?.brandId,
    stock: product?.quantity,
  }));

  const handleDeleteConfirmation = (row) => {
    const selectedProduct = products.find((brand) => brand.name === row.name);
    if (selectedProduct) {
      setSelectedProduct(selectedProduct);
      setDeleteConfirmationOpen(true);
    } else {
      console.error("Selected brand not found in brands!");
    }
  };
  const handleDelete = () => {
    deleteStock("products", selectedProduct._id);
    setDeleteConfirmationOpen(false);
  };

  const handleCancelDelete = () => {
    setSelectedProduct(null);
    setDeleteConfirmationOpen(false);
  };

  useEffect(() => {
    getStock("products");
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
      <Box style={{ height: "70vh", width: "70%", margin: "auto" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row.name} //! Her satırı ismiyle kimliklendirme
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
            {`Are you sure you want to delete ${selectedProduct?.name}?`}
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

export default ListBrands;
