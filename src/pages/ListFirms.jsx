import * as React from "react";
import { useSelector } from "react-redux";
import useStockRequest from "../services/useStockRequest";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import FirmDetailModal from "../components/FirmDetailModal";


const ListFirms = () => {
  const [selectedFirm, setSelectedFirm] = React.useState(null)
  const [showModal, setShowModal] = React.useState(false)
  const { firms } = useSelector((state) => state.getfirms);
  const { getFirms } = useStockRequest();

  const columns = [
    { field: "name", headerName: "Name", width: 500 },
    { field: "phone", headerName: "Phone", width: 200 },
  ];

  const rows = firms.map((firm) => ({ name: firm.name, phone: firm.phone }));

  const handleRowClick = (row) => {
    setSelectedFirm(row)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }
  React.useEffect(() => {
    getFirms();
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
          checkboxSelection
          getRowId={(row) => row.name} //! Her satırı ismiyle kimliklendirme
          onRowClick={handleRowClick}
        />
      </Box>
      <Typography fontSize={"14px"} mt={2} textAlign={"end"} pr={23} color={"brown"}>Click on a firm row for firm details.</Typography>
      <FirmDetailModal open={showModal} handleClose={closeModal} firm={selectedFirm}/>
    </>
  );
};

export default ListFirms;
