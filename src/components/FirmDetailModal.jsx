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
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
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

const FirmDetailModal = ({open,handleClose,firm}) => {
  
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
    // console.log(firm)
    const {firms} = useSelector(state => state.getfirms)
    const selectedFirm = firms?.find(selectfirm => selectfirm.name === firm?.row.name)
    console.log(selectedFirm)


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
        title={selectedFirm?.name}
        sx={{textAlign:"center",color:"#0000FF", textTransform:"uppercase"}}
      />
      <CardMedia
        component="img"
        height="194"
        image={selectedFirm?.image}
        alt={selectedFirm?.name}
        sx={{objectFit:"contain"}}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" sx={{display:"flex", justifyContent:"center", alignItems:"center", gap:"1rem"}}>
          <ContactPhoneIcon sx={{color:"#03215A"}}/> {selectedFirm?.phone}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton >
          <EditIcon sx={{color:"#1876D1"}} />
        </IconButton>
        <IconButton >
          <DeleteIcon sx={{color:"brown"}}/>
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
          <Typography>{selectedFirm?.address}</Typography>
        </CardContent>
      </Collapse>
    </Card>
    </Box>
  </Modal>
  )
}

export default FirmDetailModal
