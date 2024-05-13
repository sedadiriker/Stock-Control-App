import { useSelector } from "react-redux";
import useStockRequest from "../../services/useStockRequest";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import FirmDetailModal from "../../components/FirmDetailModal";
import { useEffect, useState } from "react";
import Table from "../../components/Table";

const ListFirms = () => {
  const [selectedFirm, setSelectedFirm] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { firms } = useSelector((state) => state.stock);
  const { getStock } = useStockRequest();
  // console.log(firms)

  const columns = [
    {
      field: "name",
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
          Name
        </Typography>
      ),
      flex: 1,
      renderCell: (params) => (
        <Typography
          variant="body1"
          color="black"
          sx={{
            fontSize: {
              xs: "10px",
              md: "15px",
            },
            cursor: "pointer",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "phone",
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
          Phone
        </Typography>
      ),
      flex: 1,
      renderCell: (params) => (
        <Typography
          variant="body1"
          color="black"
          sx={{
            fontSize: {
              xs: "10px",
              md: "15px",
            },
            cursor: "pointer",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
  ];

  const rows = firms?.map((firm) => ({
    name: firm?.name,
    phone: firm?.phone,
    id: firm?._id,
  }));

  const handleRowClick = (row) => {
    setSelectedFirm(row);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    getStock("firms");
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "#F3F3F3",
        p: 2,
        mt: 3,
        borderRadius: "10px",
        width: { xs: "100%", md: "80%" },
        m: "auto",
      }}
    >
      {" "}
      <Typography
        textAlign={"center"}
        color={"brown"}
        variant="h5"
        fontWeight={"bold"}
        textTransform={"uppercase"}
        my={4}
        sx={{ fontSize: { xs: "14px", md: "1rem" } }}
      >
        List Of Firms
      </Typography>
      <Box style={{ margin: "auto" }}>
        {/* <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row.id} //! Her satırı  kimliklendirme
          onRowClick={handleRowClick}
        /> */}
        <Table rows={rows} columns={columns} handleRowClick={handleRowClick} />
      </Box>
      <Typography
        fontSize={"14px"}
        mt={2}
        textAlign={"end"}
        sx={{ pr: { xs: 0, md: 5 } }}
        color={"brown"}
      >
        Click on a firm row for firm details.
      </Typography>
      <FirmDetailModal
        open={showModal}
        handleClose={closeModal}
        firm={selectedFirm}
      />
    </Box>
  );
};

export default ListFirms;
