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

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const FirmDetailModal = ({ open, handleClose, firm }) => {
  const { deleteStock, editStock, getStock } = useStockRequest();
  const [expanded, setExpanded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    image: "",
  });
  const { firms } = useSelector((state) => state.stock);
  const selectedFirm = firms?.find(
    (selectfirm) => selectfirm?.name === firm?.row.name
  );
  console.log("selected", selectedFirm);
  console.log("firms", firms);
  useEffect(() => {
    if (firm && open) {
      const selectedFirm = firm?.row;
      setFormData({
        name: selectedFirm?.name || "",
        phone: selectedFirm?.phone || "",
        address: selectedFirm?.address || "",
        image: selectedFirm?.image || "",
      });
    }
  }, [firm, open]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDelete = (id) => {
    deleteStock("firms", id);
    handleClose();
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleEdit = () => {
    if (selectedFirm) {
      editStock("firms", selectedFirm._id, formData);
      setEditMode(false);
      getStock("firms");
      handleClose();
    } else {
      console.error("Selected firm is undefined");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader
            title={
              !editMode ? (
                selectedFirm?.name
              ) : (
                <TextField
                  id="name"
                  name="name"
                  label="Firm Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              )
            }
            sx={{
              textAlign: "center",
              color: "black",
              textTransform: "uppercase",
            }}
          />
          {!editMode ? (
            <CardMedia
              component="img"
              height="194"
              image={selectedFirm?.image}
              alt={selectedFirm?.name}
              sx={{ objectFit: "contain" }}
            />
          ) : (
            <TextField
              id="image"
              name="image"
              label="Firm image"
              value={formData.image}
              onChange={handleChange}
              required
            />
          )}
          <CardContent>
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
                alignItems: "center",
              }}
              variant="body2"
              color="text.secondary"
            >
              <ContactPhoneIcon sx={{ color: "#03215A" }} />{" "}
              {!editMode ? (
                selectedFirm?.phone
              ) : (
                <TextField
                  id="phone"
                  name="phone"
                  label="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              )}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            {!editMode ? (
              <IconButton>
                <EditIcon onClick={handleEditClick} sx={{ color: "#1876D1" }} />
              </IconButton>
            ) : (
              <IconButton>
                <DoneOutlineIcon
                  onClick={handleEdit}
                  sx={{ color: "#1876D1" }}
                />
              </IconButton>
            )}
            <IconButton>
              <DeleteIcon
                onClick={() => handleDelete(selectedFirm?._id)}
                sx={{ color: "brown" }}
              />
            </IconButton>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
             <Box display={"flex"} justifyContent={"center"} alignItems={"center"}> 
                <ExpandMoreIcon style={{borderRadius:"none"}} />
                <Typography color={"brown"} style={{ display: expanded ? "none" : "inline-block" }}>Adress</Typography>
              </Box>
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              {!editMode ? (
                <Typography>{selectedFirm?.address}</Typography>
              ) : (
                <TextField
                  id="address"
                  name="address"
                  label="Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              )}
            </CardContent>
          </Collapse>
        </Card>
      </Box>
    </Modal>
  );
};

export default FirmDetailModal;
