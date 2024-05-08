import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import useStockRequest from '../services/useStockRequest';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
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

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const FirmDetailModal = ({ open, handleClose, firm }) => {
    const { deleteFirm, editFirm } = useStockRequest();
    const [expanded, setExpanded] = React.useState(false);
    const [editMode, setEditMode] = React.useState(false);
    const [formData, setFormData] = React.useState({
        name: '',
        phone: '',
        address: '',
        image: ''
    });

    React.useEffect(() => {
        if (firm && open) {
            const selectedFirm = firm?.row;
            setFormData({
                name: selectedFirm?.name || '',
                phone: selectedFirm?.phone || '',
                address: selectedFirm?.address || '',
                image: selectedFirm?.image || ''
            });
        }
    }, [firm, open]);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleDelete = (id) => {
        deleteFirm(id);
    };

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleEdit = () => {
        editFirm(selectedFirm._id, formData);
        setEditMode(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const { firms } = useSelector(state => state.getfirms);
    const selectedFirm = firms?.find(selectfirm => selectfirm?.name === firm?.row.name);

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
                        title={!editMode ? selectedFirm?.name : (
                            <TextField
                                id="name"
                                name="name"
                                label="Firma Adı"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        )}
                        sx={{ textAlign: "center", color: "#0000FF", textTransform: "uppercase" }}
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
                            label="Resim URL'si"
                            value={formData.image}
                            onChange={handleChange}
                        />
                    )}
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            <ContactPhoneIcon sx={{ color: "#03215A" }} /> {!editMode ? selectedFirm?.phone : (
                                <TextField
                                    id="phone"
                                    name="phone"
                                    label="Telefon"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            )}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        {!editMode ? (
                            <IconButton >
                                <EditIcon onClick={handleEditClick} sx={{ color: "#1876D1" }} />
                            </IconButton>
                        ) : (
                            <IconButton >
                                <DoneOutlineIcon onClick={handleEdit} sx={{ color: "#1876D1" }} />
                            </IconButton>
                        )}
                        <IconButton >
                            <DeleteIcon onClick={() => handleDelete(selectedFirm._id)} sx={{ color: "brown" }} />
                        </IconButton>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
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
                label="Adres"
                value={formData.address}
                onChange={handleChange}
            />
        )}
    </CardContent>
                    </Collapse>
                </Card>
            </Box>
        </Modal>
    );
}

export default FirmDetailModal;