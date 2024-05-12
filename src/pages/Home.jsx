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
import LoyaltyOutlinedIcon from "@mui/icons-material/LoyaltyOutlined";
import CreateChart from "../components/Chart";

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
  const sortedSales = Object.entries(salesByProduct).sort(
    ([, a], [, b]) => b - a
  );
  //En çok satılak ilk 3 ürün
  const bestSellers = sortedSales.slice(0, 3);
  console.log(bestSellers);

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
              xs: "7px",
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
              xs: "7px",
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
              xs: "7px",
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
    quantity: product[1],
  }));

  const totals = [
    { value: totalSalesAmount.toLocaleString("tr-TR"), name: "Total Sales" },
    {
      value: totalPurchasesAmount.toLocaleString("tr-TR"),
      name: "Total Purchases",
    },
  ];

  const totalproducts = [
    { value: `${totalSalesQuantity}`, name: "Total Sold Products" },
    {
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
      <Box sx={{ backgroundColor: "#F3F3F3", p: 2, borderRadius: "10px",width:{xs:"80%", md:"100%"} }}>
        <Typography
          fontWeight={"bold"}
          color={"brown"}
          textTransform={"uppercase"}
          sx={{fontSize:{xs:"12px", md:"1rem"}}}
        >
          <AssignmentIcon
            sx={{
              fontSize:{xs:"2rem", md:"3rem"},
              color: "#A5292A",
              backgroundColor: "#EBDADB",
              borderRadius: "50%",
              mr: 3,
              p: 1,
            }}
          />
          Sales & Purchases History
        </Typography>
        <Divider sx={{ borderColor: "#A5292A40" }} />
        <Container sx={{ display: "flex", alignItems: "center",flexWrap:"wrap", justifyContent:"center" }}>
          <Box sx={{ flex: 1 }}>
            <div className="px-12 pt-5">
              <dl className="flex gap-3 flex-wrap">
                {totals.map((total) => (
                  <div
                    key={total.id}
                    className="mx-auto flex  flex-col gap-y-4 text-center"
                  >
                    <dt className="text-base leading-7 text-gray-600">
                      {total.name}
                    </dt>
                    <dd className="order-first text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
                      {total.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <Divider />
            <div className="px-10 pt-5">
              <dl className="flex gap-3 flex-wrap">
                {totalproducts.map((purchase) => (
                  <div
                    key={purchase.id}
                    className="mx-auto flex max-w-xs flex-col gap-y-4 text-center"
                  >
                    <dt className="text-base leading-7 text-gray-600">
                      {purchase.name}
                    </dt>
                    <dd className="order-first text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
                      {purchase.value}
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
              <MonetizationOnTwoToneIcon
                sx={{
                  fontSize: "3rem",
                  color: profit > 0 ? "green" : profit < 0 ? "red" : "inherit",
                }}
              />{" "}
              Profit
            </Typography>
            <Typography
              sx={{
                color: profit > 0 ? "green" : profit < 0 ? "red" : "inherit",
                fontSize: "2rem",
                fontWeight: "bold",
              }}
            >
              {profit.toLocaleString("tr-TR")}$
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* CHART */}
      <Box
        sx={{ backgroundColor: "#F3F3F3", p: 2, mt: 3, borderRadius: "10px",width:{xs:"80%", md:"100%"} }}
      >
        <Typography
          fontWeight={"bold"}
          color={"brown"}
          textTransform={"uppercase"}
          mb={2}
          sx={{fontSize:{xs:"12px", md:"1rem"}}}

        >
          <TrendingDownIcon
            sx={{
              fontSize:{xs:"2rem", md:"3rem"},
              color: "#0551B6",
              backgroundColor: "#11B4BB50",
              borderRadius: "50%",
              mr: 3,
              p: 1,
            }}
          />
          Statistics
        </Typography>
        <Divider sx={{ borderColor: "#A5292A40" }} />
        <Box
          display={"flex"}
          flexWrap={"wrap"}
          gap={5}
          justifyContent={"center"}
        >
          {/* <LineChart
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
          /> */}
          {/* <LineChart
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
          /> */}
          <CreateChart data={sales} chartName="Sales" />
          <CreateChart data={purchases} chartName="Purchases" />
        </Box>
      </Box>

      {/* STOCK ALERT */}
      <Box
        sx={{ backgroundColor: "#F3F3F3", p: 2, mt: 3, borderRadius: "10px",width: {xs:"80%", md:"100%"},
      }}
      >
        <Typography
          fontWeight={"bold"}
          color={"brown"}
          textTransform={"uppercase"}
          mb={2}
          sx={{fontSize:{xs:"12px", md:"1rem"}}}
        >
          <NotificationImportantIcon
            sx={{
              fontSize:{xs:"2rem", md:"3rem"},
              color: "#red",
              backgroundColor: "#FFECB3",
              borderRadius: "50%",
              mr: 3,
              p: 1,
            }}
          />
          Stock alert
        </Typography>
        <Divider sx={{ borderColor: "#A5292A40" }} />
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
      <Box
        sx={{
          backgroundColor: "#F3F3F3",
          p: 2,
          mt: 3,
          width: {xs:"75%", md:"50%"},
          borderRadius: "10px",
        }}
      >
        <Typography
          fontWeight={"bold"}
          color={"brown"}
          textTransform={"uppercase"}
          mb={2}
          sx={{fontSize:{xs:"12px", md:"1rem"}}}
        >
          <LoyaltyOutlinedIcon
            sx={{
              fontSize:{xs:"2rem", md:"3rem"},
              color: "#008001",
              backgroundColor: "#B6D1B1",
              borderRadius: "50%",
              mr: 3,
              p: 1,
            }}
          />
          Best Sellers
        </Typography>
        <Divider sx={{ borderColor: "#A5292A40" }} />
        <Box
          style={{
            margin: "auto",
          }}
        >
          <DataGrid
            rows={sellerRows}
            columns={sellerColumns}
            pageSize={5}
            getRowId={(row) => row.name} //! Her satırı ismiyle kimliklendirme
            sx={{width:"100%"}}
            autoHeight
            autoPageSize
          />
        </Box>
      </Box>
    </>
  );
};

export default Home;
