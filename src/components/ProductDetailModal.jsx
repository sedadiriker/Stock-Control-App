import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import useStockRequest from "../services/useStockRequest";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import { useState, useEffect } from "react";
import { Avatar, Button } from "@mui/material";
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



const ProductDetailModal = ({ open, handleClose, product }) => {
  const { deleteStock, editStock, getStock } = useStockRequest();
 
 
  const { products } = useSelector((state) => state.stock);
  const selectedProduct = products?.find(
    (selectproduct) => selectproduct?.name === selectproduct?.row.name
  );



  const handleDelete = (id) => {
    handleClose();
  };

  





  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Card sx={{ maxWidth: 345, bgcolor: "#F3F3F3" }}>
          <CardHeader
            title={selectedProduct?.name}
            sx={{
              textAlign: "center",
              color: "black",
              textTransform: "uppercase",
            }}
          />

          {selectedProduct?.image ? (
            <CardMedia
              component="img"
              height="194"
              image={selectedProduct?.image}
              alt={selectedProduct?.name}
              sx={{ objectFit: "contain", px: 1 }}
            />
          ) : (
            <Avatar sx={{ bgcolor: "#03215A", m: "auto" }}>Product</Avatar>
          )}

          <CardContent>
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                alignItems: "center",
              }}
              variant="body2"
              color="text.secondary"
            >
              <Button href={`tel:+90${selectedProduct?.phone}`} target="_blank">
                <ContactPhoneIcon sx={{ color: "green", fontSize: "2rem" }} />
              </Button>

              {selectedProduct?.phone}
            </Typography>
          </CardContent>
         
        </Card>
      </Box>
    </Modal>
  );
};

export default ProductDetailModal;
