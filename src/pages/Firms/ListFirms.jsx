import { useSelector } from "react-redux";
import useStockRequest from "../../services/useStockRequest";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import FirmDetailModal from "../../components/FirmDetailModal";
import { useEffect, useState } from "react";

const ListFirms = () => {
  const [selectedFirm, setSelectedFirm] =useState(null)
  const [showModal, setShowModal] = useState(false)
  const { firms } = useSelector((state) => state.stock);
  const { getStock } = useStockRequest();
console.log(firms)
  const columns = [
    { field: "name", headerName: <Typography variant="p" color={"#0551B6"} textTransform={"uppercase"} fontWeight={"bold"}>Name</Typography>, width: 500,renderCell: (params) => (
      <Typography variant="body1" color="black">
        {params.value}
      </Typography>)},
    { field: "phone", headerName: <Typography variant="p" color={"#0551B6"} textTransform={"uppercase"} fontWeight={"bold"}>Phone</Typography>, width: 200,renderCell: (params) => (
      <Typography variant="body1" color="black">
        {params.value}
      </Typography>) },
  ];

  const rows = firms?.map((firm) => ({ name: firm?.name, phone: firm?.phone, id:firm?._id }));

  const handleRowClick = (row) => {
    setSelectedFirm(row)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }
useEffect(() => {
    getStock("firms");
  }, []);

  
  return (
    <>
      {" "}
      <Typography textAlign={"center"} color={"brown"} variant="h5" fontWeight={"bold"} textTransform={"uppercase"}>List Of Firms</Typography>
      <Box style={{ height: "70vh", width: "70%", margin: "auto" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          getRowId={row=>row.id} //! Her satırı  kimliklendirme
          onRowClick={handleRowClick}
          
        />
      </Box>
      <Typography fontSize={"14px"} mt={2} textAlign={"end"} pr={23} color={"brown"}>Click on a firm row for firm details.</Typography>
      <FirmDetailModal open={showModal} handleClose={closeModal} firm={selectedFirm}/>
    </>
  );
};

export default ListFirms;
