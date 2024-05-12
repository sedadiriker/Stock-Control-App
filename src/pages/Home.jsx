import { Box, Container, Divider, Typography } from "@mui/material";
import { useEffect } from "react";
import useStockRequest from "../services/useStockRequest";
import { useSelector } from "react-redux";
import { LineChart } from "@mui/x-charts/LineChart";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import AssignmentIcon from "@mui/icons-material/Assignment";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import { DataGrid } from "@mui/x-data-grid";
import MonetizationOnTwoToneIcon from "@mui/icons-material/MonetizationOnTwoTone";
import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined';
const Home = () => {
  const { getStock } = useStockRequest();
  const { sales, purchases, products } = useSelector((state) => state.stock);
  console.log(sales);
  const totalSalesAmount = sales.reduce(
    (total, sale) => total + sale.amount,
    0
  );
  const totalPurchasesAmount = purchases.reduce(
    (total, purchase) => total + purchase.amount,
    0
  );
  const profit = totalSalesAmount - totalPurchasesAmount;
  const totalPurchasesQuantity = purchases.reduce(
    (total, purchase) => total + purchase.quantity,
    0
  );
  const totalSalesQuantity = sales.reduce(
    (total, sale) => total + sale.quantity,
    0
  );

  //! Stock filtreleme
  const lowStockProducts = products.filter((product) => product.quantity < 100);
  // console.log(lowStockProducts);

  //! Best Sellers
  // adet ve adına göre yeni object
  const salesByProduct = sales.reduce((acc, sale) => {
    if (!acc[sale.productId.name]) {
      acc[sale.productId.name] = 0;
    }
    acc[sale.productId.name] += sale.quantity;
    return acc;
  }, {});
  // console.log("group",salesByProduct)

  //Gruplandırılan ürünlerden en çok atılandan en aza satılana sıralama
  const sortedSales = Object.entries(salesByProduct).sort(([, a], [, b]) => b - a);
  //En çok satılak ilk 3 ürün
  const bestSellers = sortedSales.slice(0, 3);
  console.log(bestSellers)

  const productColumns = [
    {
      field: "name", // nesneyle aynı olmalı
      headerName: (
        <Typography
          variant="p"
          color={"#0551B6"}
          textTransform={"uppercase"}
          fontWeight={"bold"}
          sx={{
            fontSize: {
              xs: "10px",
              md: "18px",
            },
          }}
        >
          Name
        </Typography>
      ),
      flex: 1,
      renderCell: (params) => (
        <Box height={"100%"} display={"flex"} alignItems={"center"}>
          <Typography
            variant="body1"
            color="black"
            sx={{
              fontSize: {
                xs: "10px",
                md: "15px",
              },
            }}
          >
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: "category",
      headerName: (
        <Typography
          variant="p"
          color={"#0551B6"}
          textTransform={"uppercase"}
          fontWeight={"bold"}
          sx={{
            fontSize: {
              xs: "10px",
              md: "18px",
            },
          }}
        >
          Category
        </Typography>
      ),
      flex: 1,
      renderCell: (params) => (
        <Box height={"100%"} display={"flex"} alignItems={"center"}>
          <Typography
            variant="body1"
            color="black"
            sx={{
              fontSize: {
                xs: "10px",
                md: "15px",
              },
            }}
          >
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: "brand",
      headerName: (
        <Typography
          variant="p"
          color={"#0551B6"}
          textTransform={"uppercase"}
          fontWeight={"bold"}
          sx={{
            fontSize: {
              xs: "10px",
              md: "18px",
            },
          }}
        >
          Brand
        </Typography>
      ),
      flex: 1,
      renderCell: (params) => (
        <Box height={"100%"} display={"flex"} alignItems={"center"}>
          <Typography
            variant="body1"
            color="black"
            sx={{
              fontSize: {
                xs: "10px",
                md: "15px",
              },
            }}
          >
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: "stock",
      headerName: (
        <Typography
          variant="p"
          color={"#0551B6"}
          textTransform={"uppercase"}
          fontWeight={"bold"}
          sx={{
            fontSize: {
              xs: "10px",
              md: "18px",
            },
          }}
        >
          Stock
        </Typography>
      ),
      flex: 1,
      renderCell: (params) => (
        <Box height={"100%"} display={"flex"} alignItems={"center"}>
          <Typography
            variant="body1"
            color="black"
            sx={{
              fontSize: {
                xs: "10px",
                md: "15px",
              },
            }}
          >
            {params.value}
          </Typography>
        </Box>
      ),
    },
  ];
  const productRows = lowStockProducts?.map((product) => ({
    name: product?.name,
    category: product?.categoryId.name,
    brand: product?.brandId.name,
    stock: product?.quantity,
  }));
  const sellerColumns = [
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
              xs: "10px",
              md: "18px",
            },
          }}
        >
          Name
        </Typography>
      ),
      flex: 1,
      renderCell: (params) => (
        <Box height={"100%"} display={"flex"} alignItems={"center"}>
          <Typography
            variant="body1"
            color="black"
            sx={{
              fontSize: {
                xs: "10px",
                md: "15px",
              },
            }}
          >
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: "quantity",
      headerName: (
        <Typography
          variant="p"
          color={"#0551B6"}
          textTransform={"uppercase"}
          fontWeight={"bold"}
          sx={{
            fontSize: {
              xs: "10px",
              md: "18px",
            },
          }}
        >
          quantity
        </Typography>
      ),
      flex: 1,
      renderCell: (params) => (
        <Box height={"100%"} display={"flex"} alignItems={"center"}>
          <Typography
            variant="body1"
            color="black"
            sx={{
              fontSize: {
                xs: "10px",
                md: "15px",
              },
            }}
          >
            {params.value}
          </Typography>
        </Box>
      ),
    },
  ];
  const sellerRows = bestSellers?.map((product) => ({
    name: product[0],
    quantity: product[1]
  }));

  const totalsales = [
    { id: 1, value: `${totalSalesAmount}`, name: "Total Sales" },
    { id: 2, value: `${totalSalesQuantity}`, name: "Total Sold Products" },
  ];
  const totalpurchases = [
    { id: 1, value: `${totalPurchasesAmount}`, name: "Total Purchases" },
    {
      id: 2,
      value: `${totalPurchasesQuantity}`,
      name: "Total Purchased Products",
    },
  ];

  useEffect(() => {
    getStock("sales");
    getStock("purchases");
    getStock("products");
  }, []);

  return (
    <>
      {/* HİSTORY */}
      <Box sx={{ backgroundColor: "#F3F3F3", p: 2 }}>
        <Typography
          variant="h6"
          fontWeight={"bold"}
          color={"brown"}
          textTransform={"uppercase"}
        >
          <AssignmentIcon
            sx={{
              fontSize: "3rem",
              color: "#A5292A",
              backgroundColor: "#FFECB3",
              borderRadius: "50%",
              mr: 3,
              p: 1,
            }}
          />
          Sales & Purchases History
        </Typography>
        <Container sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ flex: 1 }}>
            <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-5">
              <dl className="flex gap-3 flex-wrap">
                {totalsales.map((sale) => (
                  <div
                    key={sale.id}
                    className="mx-auto flex max-w-xs flex-col gap-y-4 text-center"
                  >
                    <dt className="text-base leading-7 text-gray-600">
                      {sale.name}
                    </dt>
                    <dd className="order-first text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
                      {sale.value}$
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <Divider />
            <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-5">
              <dl className="flex gap-3 flex-wrap">
                {totalpurchases.map((purchase) => (
                  <div
                    key={purchase.id}
                    className="mx-auto flex max-w-xs flex-col gap-y-4 text-center"
                  >
                    <dt className="text-base leading-7 text-gray-600">
                      {purchase.name}
                    </dt>
                    <dd className="order-first text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
                      {purchase.value}$
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Box>
         
            <Box
              sx={{
                p: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: "1.5rem" }}>
                <MonetizationOnTwoToneIcon sx={{ fontSize: "3rem",  color: profit > 0 ? "green" : profit < 0 ? "red" : "inherit", }} /> Profit
              </Typography>
              <Typography
                sx={{
                  color: profit > 0 ? "green" : profit < 0 ? "red" : "inherit",fontSize:"2rem",fontWeight:"bold"
                }}
              >
                {profit}$
              </Typography>
            </Box>
        </Container>
      </Box>

      {/* CHART */}
      <Box sx={{ backgroundColor: "#F3F3F3", p: 2, mt: 3 }}>
        <Typography
          variant="h6"
          fontWeight={"bold"}
          color={"brown"}
          textTransform={"uppercase"}
          mb={2}
        >
          <TrendingDownIcon
            sx={{
              fontSize: "3rem",
              color: "#0551B6",
              backgroundColor: "#11B4BB50",
              borderRadius: "50%",
              mr: 3,
              p: 1,
            }}
          />
          Statistics
        </Typography>

        <Box display={"flex"} flexWrap={"wrap"} gap={2}>
          <LineChart
            sx={{ backgroundColor: "#0551B630", borderRadius: "20px" }}
            xAxis={[
              {
                data: sales.map((sale) => new Date(sale.createdAt)),
                valueFormatter: (date) => {
                  const options = {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  };
                  return new Date(date).toLocaleDateString("tr-TR", options);
                },
              },
            ]}
            series={[
              {
                label: "Sales",
                data: sales.map((sale) => sale.amount),
                color: "#3f51b5",
              },
            ]}
            width={400}
            height={300}
          />
          <LineChart
            sx={{ backgroundColor: "#0551B630", borderRadius: "20px" }}
            xAxis={[
              {
                data: purchases.map((purchase) => new Date(purchase.createdAt)),
                valueFormatter: (date) => {
                  const options = {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  };
                  return new Date(date).toLocaleDateString("tr-TR", options);
                },
              },
            ]}
            series={[
              {
                label: "Purchases",
                data: purchases.map((purchase) => purchase.amount),
                color: "#A5292A",
              },
            ]}
            width={400}
            height={300}
          />
        </Box>
      </Box>

      {/* STOCK ALERT */}
      <Box sx={{ backgroundColor: "#F3F3F3", p: 2, mt: 3 }}>
        <Typography
          variant="h6"
          fontWeight={"bold"}
          color={"brown"}
          textTransform={"uppercase"}
          mb={2}
        >
          <NotificationImportantIcon
            sx={{
              fontSize: "3rem",
              color: "#red",
              backgroundColor: "#A5292A20",
              borderRadius: "50%",
              mr: 3,
              p: 1,
            }}
          />
          Stock alert
        </Typography>
        <Box
          style={{
            width: { xs: "100%", md: "70%" },
            margin: "auto",
          }}
        >
          <DataGrid
            rows={productRows}
            columns={productColumns}
            pageSize={5}
            getRowId={(row) => row.name} //! Her satırı ismiyle kimliklendirme
            autoHeight
            autoPageSize
          />
        </Box>
      </Box>

      {/* BEST SELLERS */}
      <Box sx={{ backgroundColor: "#F3F3F3", p: 2, mt: 3,width:"50%" }}>
      <Typography
          variant="h6"
          fontWeight={"bold"}
          color={"brown"}
          textTransform={"uppercase"}
          mb={2}
        >
          <LoyaltyOutlinedIcon
            sx={{
              fontSize: "3rem",
              color: "#008001",
              backgroundColor: "#B6D1B1",
              borderRadius: "50%",
              mr: 3,
              p: 1,
            }}
          />
          Best Sellers
        </Typography>
        <Box
          style={{
            width: { xs: "100%", md: "50%" },
            margin: "auto",
          }}
        >
          <DataGrid
            rows={sellerRows}
            columns={sellerColumns}
            pageSize={5}
            getRowId={(row) => row.name} //! Her satırı ismiyle kimliklendirme
            autoHeight
            autoPageSize
          />
        </Box>
      </Box>
    </>
  );
};

export default Home;
