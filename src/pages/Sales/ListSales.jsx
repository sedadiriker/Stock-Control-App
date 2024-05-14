import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import useStockRequest from "../../services/useStockRequest";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useRef } from "react";
import { style } from "../Brands/ListBrands";
import Table from "../../components/Table";

const ListSales = () => {
  const { getStock, deleteStock, editStock } = useStockRequest();
  const [selectedSales, setSelectedSales] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const formRef = useRef(null); // Form ref'i oluştur

  const { brands, products } = useSelector((state) => state.stock);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const { sales } = useSelector((state) => state.stock);
  console.log(sales);

  const columns = [
    {
      field: "date",
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
          Date
        </Typography>
      ),
      flex: 1, // içeriğe göre yer kapla
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
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
            {new Date(params.value).toLocaleString()}
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
        <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
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
      field: `product`,
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
          Product
        </Typography>
      ),
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
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
      field: "quantity",
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
          Quantity
        </Typography>
      ),
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
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
      field: "price",
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
          Price
        </Typography>
      ),
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
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
      field: "amount",
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
          Amount
        </Typography>
      ),
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            justifyContent: "center",
          }}
        >
          <EditIcon
            sx={{
              cursor: "pointer",
              color: "green",
              fontSize: {
                xs: "10px",
                md: "15px",
              },
            }}
            onClick={() => handleEditClick(params.row)}
          />
          <DeleteIcon
            sx={{
              cursor: "pointer",
              color: "brown",
              fontSize: {
                xs: "10px",
                md: "15px",
              },
            }}
            onClick={() => handleDeleteConfirmation(params.row)}
          />
        </Box>
      ),
    },
  ];

  const rows = sales?.map((sale) => ({
    name: sale?._id,
    date: sale?.createdAt,
    brand: sale?.brandId?.name,
    product: sale?.productId?.name,
    quantity: sale?.quantity,
    price: sale?.price,
    amount: sale?.amount,
  }));

  const handleEditClick = (row) => {
    setEditMode(true);
    setSelectedSales(row);
  };

  const handleSaveEdit = () => {
    formRef.current.submitForm(); // Ref'i kullanarak form submit edebiliyoruz
    setEditMode(false);
  };

  const handleClose = () => {
    setEditMode(false);
  };

  const handleDeleteConfirmation = (row) => {
    setSelectedSales(row);
    setDeleteConfirmationOpen(true);
  };

  const handleDelete = () => {
    deleteStock("sales", selectedSales.name);
    setDeleteConfirmationOpen(false);
  };

  const handleCancelDelete = () => {
    setSelectedSales(null);
    setDeleteConfirmationOpen(false);
  };

  useEffect(() => {
    getStock("sales");
    getStock("brands");
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
      <Typography
        textAlign={"center"}
        color={"brown"}
        variant="h5"
        fontWeight={"bold"}
        textTransform={"uppercase"}
        my={4}
        sx={{ fontSize: { xs: "14px", md: "1rem" } }}
      >
        List Of Sales
      </Typography>
      <Box style={{ margin: "auto" }}>
        <Table rows={rows} columns={columns} />
      </Box>
      {/* EDİTMODE */}
      {editMode && (
        <Modal
          open
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box display={"flex"} flexDirection={"column"} gap={3} sx={style}>
            <Typography
              textAlign={"center"}
              color={"brown"}
              textTransform={"uppercase"}
              fontWeight={"bold"}
              gutterBottom
            >
              Edit Sales
            </Typography>
            <Formik
              innerRef={formRef}
              initialValues={{
                // selectyapılan bilgileri tutuyoruz
                brand: selectedSales?.brand || "",
                product: selectedSales?.product || "",
                quantity: selectedSales?.quantity || "",
                price: selectedSales?.price || "",
              }}
              onSubmit={(values, actions) => {
                const brandId = brands.find(
                  (brand) => brand.name === values.brand
                )?._id; //find ile bul, id sini yakala
                const productId = products.find(
                  (product) => product.name === values.product
                )?._id; //find ile bul, id sini yakala

                const formData = {
                  brandId,
                  productId,
                  quantity: values.quantity,
                  price: values.price,
                };
                editStock("sales", selectedSales.name, formData);
                console.log("selected", selectedSales);
                actions.resetForm();
                actions.setSubmitting(false);
                console.log("form", formData);
              }}
            >
              {({ values, handleChange, handleBlur, isSubmitting }) => (
                <Form>
                  <Box
                    width={"60%"}
                    m={"auto"}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                      py: "3rem",
                      px: "1.5rem",
                      borderRadius: "10px",
                    }}
                  >
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel
                          sx={{ color: "white" }}
                          id="demo-simple-select-label"
                        >
                          Brand
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="brand"
                          name="brand"
                          value={values.brand}
                          label="Brand"
                          onChange={handleChange}
                          sx={{
                            color: "white",
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "white",
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#37B3E2",
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#37B3E2",
                            },
                          }}
                        >
                          {brands?.map(({ _id, name }) => (
                            <MenuItem key={_id} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel
                          sx={{ color: "white" }}
                          id="demo-simple-select-label"
                        >
                          Product
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="product"
                          name="product"
                          value={values.product}
                          label="Product"
                          onChange={handleChange}
                          sx={{
                            color: "white",
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "white",
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#37B3E2",
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#37B3E2",
                            },
                          }}
                        >
                          {products?.map(({ _id, name }) => (
                            <MenuItem key={_id} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <TextField
                      label="Quantity *"
                      name="quantity"
                      id="outlined-number"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                        sx: {
                          color: "white",
                        },
                      }}
                      variant="outlined"
                      value={values.quantity}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      InputProps={{
                        sx: {
                          color: "white",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#37B3E2",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#37B3E2",
                          },
                        },
                      }}
                    />
                    <TextField
                      label="Price *"
                      name="price"
                      id="outlined-number"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                        sx: {
                          color: "white",
                        },
                      }}
                      variant="outlined"
                      value={values.price}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      InputProps={{
                        sx: {
                          color: "white",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#37B3E2",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#37B3E2",
                          },
                        },
                      }}
                    />
                  </Box>
                </Form>
              )}
            </Formik>
            <Box display={"flex"} justifyContent={"center"} gap={2}>
              <Button variant="contained" color="info" onClick={handleSaveEdit}>
                Save Changes
              </Button>
              <Button variant="contained" color="error" onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      )}

      {/* DELETEMODE */}
      <Modal
        open={deleteConfirmationOpen}
        onClose={handleCancelDelete}
        aria-labelledby="delete-confirmation-modal-title"
        aria-describedby="delete-confirmation-modal-description"
      >
        <Box sx={style}>
          <Typography
            textAlign={"center"}
            color={"brown"}
            textTransform={"uppercase"}
            fontWeight={"bold"}
            gutterBottom
          >
            Delete Sales
          </Typography>
          <Typography variant="body1" textAlign={"center"} gutterBottom>
            {`Are you sure you want to delete sales?`}
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
    </Box>
  );
};

export default ListSales;
