import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import useStockRequest from '../services/useStockRequest';
import { useState,useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import {  Button, Modal, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ListBrands = () => {
    const {  editBrands,getBrands,deleteBrand } = useStockRequest();
    // const [expanded, setExpanded] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedBrandId, setSelectedBrandId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        image: ''
    });
    const { brands } = useSelector(state => state.getbrands);

    const columns = [
      { field: "image", headerName: <Typography fontWeight={"bold"} color={"blue"} textTransform={"uppercase"}>Logo</Typography>, width: 250,renderCell:(params) => (
        <Box component={"img"} alt={params.value} src={params.value} sx={{width:"30%", height:"100%",objectFit:"contain"}}/>
      ) },
      { field: "name", headerName: <Typography fontWeight={"bold"} color={"blue"} textTransform={"uppercase"}>Name</Typography>, width: 400, renderCell: (params) => (
        <Typography variant="body1" color="black">
          {params.value}
        </Typography>) },
      { field: "actions", headerName: <Box display={'flex'} justifyContent={'center'}  width={200}><Typography fontWeight={"bold"} color={"blue"} textTransform={"uppercase"}>Actions</Typography></Box>, width: 200 ,renderCell:(params) => (
        <Box display={'flex'} justifyContent={'center'} gap={1}><EditIcon sx={{cursor:"pointer", color:"green"}} onClick={(()=>handleEditClick(params.row))}/>
        <DeleteIcon sx={{cursor:"pointer", color:"brown"}} onClick={(()=>handleDelete(selectedBrandId))}/></Box>
      )},
      
    ];

    const rows = brands?.map((brand) => ({ name: brand?.name, image: brand?.image }));
   
    const handleDelete = (id) => {
      deleteBrand(id)
    }
    const handleEditClick = (row) => {
        setEditMode(true)
        setFormData({...row})
        const selectedBrand = brands.find((brand) => brand.name === row.name);
        setSelectedBrandId(selectedBrand ? selectedBrand._id : null);


    };

    const handleSaveEdit = () => {
      if (selectedBrandId) {
        editBrands(selectedBrandId, formData);
        setEditMode(false);
    } else {
        console.error('Selected brand ID not found!');
    }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleClose = () => {
      setEditMode(false)
    }
    useEffect(()=>{
      getBrands()
    },[])

    return (
      <>
      <Typography textAlign={"center"} color={"brown"} variant="h5" fontWeight={"bold"} textTransform={"uppercase"} >List Of Brands</Typography>
      <Box style={{ height: "70vh", width: "70%", margin: "auto" }}>
          <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              getRowId={(row) => row.name} //! Her satırı ismiyle kimliklendirme
          />
      </Box>
      
      {editMode && (
          <Modal
          open
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box display={'flex'} flexDirection={'column'} gap={3} sx={style}>
          <Typography textAlign={'center'} color={"brown"} variant="h6" gutterBottom>
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
              <Box display={'flex'} justifyContent={'center'} gap={2}>
              <Button variant="contained" color="primary" onClick={handleSaveEdit}>Save Changes</Button>
              <Button variant="contained" color="primary" onClick={handleClose}>Back</Button>
              </Box>
          </Box>
        </Modal>
      )}
  </>
    );
}

export default ListBrands;