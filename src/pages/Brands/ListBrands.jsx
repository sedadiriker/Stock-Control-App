import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import useStockRequest from "../../services/useStockRequest";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Modal, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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
  const { editStock, getStock, deleteStock } = useStockRequest();
  const [editMode, setEditMode] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const { brands } = useSelector((state) => state.stock);

  const columns = [
    {
      field: "image",
      headerName: (
        <Typography
          variant="p"
          color={"#0551B6"}
          textTransform={"uppercase"}
          fontWeight={"bold"}
        >
          Logo
        </Typography>
      ),
      flex: 1,
      renderCell: (params) => (
        <Box
          component={"img"}
          alt={params.value}
          src={params.value}
          sx={{ width: "30%", height: "100%", objectFit: "contain" }}
        />
      ),
    },
    {
      field: "name",
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
      flex: 1,
      renderCell: (params) => (
        <Typography variant="body1" color="black">
          {params.value}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: (
          <Typography
            variant="p"
            color={"#0551B6"}
            textTransform={"uppercase"}
            fontWeight={"bold"}
          >
            Actions
          </Typography>
      ),
      flex: 1,
      renderCell: (params) => (
        <>
          <EditIcon
            sx={{ cursor: "pointer", color: "green" }}
            onClick={() => handleEditClick(params.row)}
          />
          <DeleteIcon
            sx={{ cursor: "pointer", color: "brown" }}
            onClick={() => handleDeleteConfirmation(params.row)}
          />
        </>
      ),
    },
  ];

  const rows = brands?.map((brand) => ({
    name: brand?.name,
    image: brand?.image,
  }));

  const handleDeleteConfirmation = (row) => {
    const selectedBrand = brands.find((brand) => brand.name === row.name);
    if (selectedBrand) {
      setSelectedBrand(selectedBrand);
      setDeleteConfirmationOpen(true);
    } else {
      console.error("Selected brand not found in brands!");
    }
  };
  const handleDelete = () => {
    deleteStock("brands", selectedBrand._id);
    setDeleteConfirmationOpen(false);
  };

  const handleCancelDelete = () => {
    setSelectedBrand(null);
    setDeleteConfirmationOpen(false);
  };
  const handleEditClick = (row) => {
    setEditMode(true);
    setFormData({ ...row });
    const selectedBrand = brands.find((brand) => brand.name === row.name);
    setSelectedBrand(selectedBrand);
    console.log(selectedBrand);
  };

  const handleSaveEdit = () => {
    if (selectedBrand) {
      editStock("brands", selectedBrand._id, formData);
      setEditMode(false);
    } else {
      console.error("Selected brand ID not found!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClose = () => {
    setEditMode(false);
  };
  useEffect(() => {
    getStock("brands");
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
        List Of Brands
      </Typography>
      <Box style={{ height: "70vh", width: "70%", margin: "auto" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row.name} //! Her satırı ismiyle kimliklendirme
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
              Edit Brand
            </Typography>
            <TextField
              label="Name"
              fullWidth
              value={formData.name}
              onChange={handleChange}
              name="name"
            />
            <TextField
              label="Image URL"
              fullWidth
              value={formData.image}
              onChange={handleChange}
              name="image"
            />
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
            Delete Brand
          </Typography>
          <Typography variant="body1" gutterBottom>
            {`Are you sure you want to delete ${selectedBrand?.name}?`}
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
