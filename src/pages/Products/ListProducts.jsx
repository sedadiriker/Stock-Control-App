import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import useStockRequest from "../../services/useStockRequest";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteProductModal from "../../components/DeleteProductModal";
import Table from "../../components/Table";

const ListProducts = () => {
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
          sx={{
            fontSize: {
              xs: "8px",
              md: "18px",
            },
          }}
        >
          Name
        </Typography>
      ),
      flex: 1,
      renderCell: (params) => (
        <Box height={"100%"} display={"flex"} alignItems={"center"}>
          <Typography
            variant="body1"
            color="black"
            sx={{
              fontSize: {
                xs: "10px",
                md: "15px",
              },
            }}
          >
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: "category",
      headerName: (
        <Typography
          variant="p"
          color={"#0551B6"}
          textTransform={"uppercase"}
          fontWeight={"bold"}
          sx={{
            fontSize: {
              xs: "8px",
              md: "18px",
            },
          }}
        >
          Category
        </Typography>
      ),
      flex: 1,
      renderCell: (params) => (
        <Box height={"100%"} display={"flex"} alignItems={"center"}>
          <Typography
            variant="body1"
            color="black"
            sx={{
              fontSize: {
                xs: "10px",
                md: "15px",
              },
            }}
          >
            {params.value}
          </Typography>
        </Box>
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
          sx={{
            fontSize: {
              xs: "8px",
              md: "18px",
            },
          }}
        >
          Brand
        </Typography>
      ),
      flex: 1,
      renderCell: (params) => (
        <Box height={"100%"} display={"flex"} alignItems={"center"}>
          <Typography
            variant="body1"
            color="black"
            sx={{
              fontSize: {
                xs: "10px",
                md: "15px",
              },
            }}
          >
            {params.value}
          </Typography>
        </Box>
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
          sx={{
            fontSize: {
              xs: "8px",
              md: "18px",
            },
          }}
        >
          Stock
        </Typography>
      ),
      flex: 1,
      renderCell: (params) => (
        <Box height={"100%"} display={"flex"} alignItems={"center"}>
          <Typography
            variant="body1"
            color="black"
            sx={{
              fontSize: {
                xs: "10px",
                md: "15px",
              },
            }}
          >
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: (
        <Box textAlign={"center"}>
          <Typography
            variant="p"
            color={"#0551B6"}
            textTransform={"uppercase"}
            fontWeight={"bold"}
            textAlign={"center"}
            sx={{
              fontSize: {
                xs: "8px",
                md: "18px",
              },
            }}
          >
            Actions
          </Typography>
        </Box>
      ),
      flex: 1,
      renderCell: (params) => (
        <DeleteIcon
          sx={{
            cursor: "pointer",
            color: "brown",
            fontSize: {
              xs: "14px",
              md: "20px",
            },
          }}
          onClick={() => handleDeleteConfirmation(params.row)}
        />
      ),
    },
  ];
  // console.log("selectedProduct",selectedProduct)
  const rows = products?.map((product) => ({
    name: product?.name,
    category: product?.categoryId.name,
    brand: product?.brandId.name,
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
    <Box
      sx={{
        backgroundColor: "#F3F3F3",
        p: 2,
        mt: 3,
        borderRadius: "10px",
        width: { xs: "100%", md: "100%" },
      }}
    >
      {" "}
      <Typography
        textAlign={"center"}
        color={"brown"}
        variant="h5"
        fontWeight={"bold"}
        textTransform={"uppercase"}
        my={4}
        sx={{fontSize:{xs:"14px", md:"1rem"}}}
      >
        List Of Products
      </Typography>
      <Box
        style={{
          margin: "auto",
        }}
      >
       <Table rows={rows} columns={columns}/>
      </Box>
      {/* DELETEMODE */}
      <DeleteProductModal
        selectedProduct={selectedProduct}
        deleteConfirmationOpen={deleteConfirmationOpen}
        handleDelete={handleDelete}
        handleCancelDelete={handleCancelDelete}
      />
    </Box>
  );
};

export default ListProducts;
