import { Box, Button, Modal, Typography } from '@mui/material'
import { style } from '../pages/Brands/ListBrands'
const DeleteProductModal = ({selectedProduct,deleteConfirmationOpen,handleCancelDelete,handleDelete}) => {
  return (
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
  )
}

export default DeleteProductModal
