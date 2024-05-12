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
import { useRef } from 'react';
import { style } from "../Brands/ListBrands";



const ListPurchases = () => {
  const { getStock, deleteStock, editStock } = useStockRequest();
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const formRef = useRef(null); // Form ref'i oluştur

  const { firms, brands, products } = useSelector((state) => state.stock);
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
          <Typography variant="body1" color="black" sx={{
              fontSize: {
                xs: "10px",
                md: "15px",
              },
            }}>
            {new Date(params.value).toLocaleString()}
          </Typography>
        </Box>
      ),
    },
    {
      field: `firm`,
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
          Firm
        </Typography>
      ),
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
          <Typography variant="body1" color="black" sx={{
              fontSize: {
                xs: "10px",
                md: "15px",
              },
            }}>
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
          <Typography variant="body1" color="black" sx={{
              fontSize: {
                xs: "10px",
                md: "15px",
              },
            }}>
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
          <Typography variant="body1" color="black" sx={{
              fontSize: {
                xs: "10px",
                md: "15px",
              },
            }}>
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
          <Typography variant="body1" color="black" sx={{
              fontSize: {
                xs: "10px",
                md: "15px",
              },
            }}>
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
          <Typography variant="body1" color="black" sx={{
              fontSize: {
                xs: "10px",
                md: "15px",
              },
            }}>
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
          <Typography variant="body1" color="black" sx={{
              fontSize: {
                xs: "10px",
                md: "15px",
              },
            }}>
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
            sx={{ cursor: "pointer", color: "green", fontSize: {
              xs: "10px",
              md: "15px",
            }, }}
            onClick={() => handleEditClick(params.row)}
          />
          <DeleteIcon
            sx={{ cursor: "pointer", color: "brown", fontSize: {
              xs: "10px",
              md: "15px",
            }, }}
            onClick={() => handleDeleteConfirmation(params.row)}
          />
        </Box>
      ),
    },
  ];

  const rows = purchases?.map((purchase) => ({
    id: purchase?._id,
    date: purchase?.createdAt,
    firm: purchase?.firmId?.name,
    brand: purchase?.brandId?.name,
    product: purchase?.productId?.name,
    quantity: purchase?.quantity,
    price: purchase?.price,
    amount: purchase?.amount,
  }));

  const handleEditClick = (row) => {
    setEditMode(true);
    setSelectedPurchase(row);
  };

  const handleSaveEdit = () => {
    formRef.current.submitForm(); // Ref'i kullanarak form submit edebiliyoruz
    setEditMode(false);
  };

  const handleClose = () => {
    setEditMode(false);
  };

  const handleDeleteConfirmation = (row) => {
    setSelectedPurchase(row);
    setDeleteConfirmationOpen(true);
  };

  const handleDelete = () => {
    deleteStock("purchases", selectedPurchase.id);
    setDeleteConfirmationOpen(false);
  };

  const handleCancelDelete = () => {
    setSelectedPurchase(null);
    setDeleteConfirmationOpen(false);
  };

  useEffect(() => {
    getStock("purchases");
    getStock("firms");
    getStock("brands");
    getStock("products");
  }, []);

 
  return (
    <Box  sx={{
      backgroundColor: "#F3F3F3",
      p: 2,
      mt: 3,
      borderRadius: "10px",
      width: { xs: "100%", md: "100%" },
    }}>
      <Typography
        textAlign={"center"}
        color={"brown"}
        variant="h5"
        fontWeight={"bold"}
        textTransform={"uppercase"}
        my={4}
        sx={{ fontSize: { xs: "14px", md: "1rem" } }}
      >
        List Of Purchases
      </Typography>
      <Box style={{ height: "70vh", width: "100%", margin: "auto" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          // checkboxSelection
          disableSelectionOnClick
          getRowId={(row) => row.id} //! Her satırı  kimliklendirme
          autoHeight
          autoPageSize
        />
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
              Edit Purchase
            </Typography>
            <Formik
              innerRef={formRef}
              initialValues={{
                // selectyapılan bilgileri tutuyoruz
                firm: selectedPurchase?.firm || "",
                brand: selectedPurchase?.brand || "",
                product: selectedPurchase?.product || "",
                quantity: selectedPurchase?.quantity || "",
                price: selectedPurchase?.price || "",
              }}
              onSubmit={(values, actions) => {
                const firmId = firms.find(
                  (firm) => firm.name === values.firm
                )?._id; //find ile bul, id sini yakala
                const brandId = brands.find(
                  (brand) => brand.name === values.brand
                )?._id; //find ile bul, id sini yakala
                const productId = products.find(
                  (product) => product.name === values.product
                )?._id; //find ile bul, id sini yakala

                const formData = {
                  firmId,
                  brandId,
                  productId,
                  quantity: values.quantity,
                  price: values.price,
                };
                editStock("purchases",selectedPurchase.id, formData);
                console.log("selected",selectedPurchase)
                actions.resetForm();
                actions.setSubmitting(false);
                console.log("form",formData)
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
                          Firm
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="firm"
                          name="firm" //! bu name önemli, belirtilmezse algılamıyor!!
                          value={values.firm}
                          label="Firm"
                          onChange={(e) => handleChange(e)}
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
                          {firms?.map(({ _id, name }) => (
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
            Delete Purchase
          </Typography>
          <Typography variant="body1" textAlign={"center"} gutterBottom>
            {`Are you sure you want to delete purchase?`}
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

export default ListPurchases;
