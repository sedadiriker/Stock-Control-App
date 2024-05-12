import { Box, Container, Divider, Typography } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MonetizationOnTwoToneIcon from "@mui/icons-material/MonetizationOnTwoTone";
import { useSelector } from "react-redux";

const HomeHistory = () => {
  const { sales, purchases } = useSelector((state) => state.stock);

  const totalSalesAmount = sales.reduce(
    (total, sale) => total + sale.amount,
    0
  );
  

  const totalPurchasesAmount = purchases.reduce(
    (total, purchase) => total + purchase.amount,
    0
  );
  const totalPurchasesQuantity = purchases.reduce(
    (total, purchase) => total + purchase.quantity,
    0
  );
  const totalSalesQuantity = sales.reduce(
    (total, sale) => total + sale.quantity,
    0
  );
  const totalproducts = [
    { value: `${totalSalesQuantity}`, name: "Total Sold Products" },
    {
      value: `${totalPurchasesQuantity}`,
      name: "Total Purchased Products",
    },
  ];
  const totals = [
    { value: totalSalesAmount.toLocaleString("tr-TR"), name: "Total Sales" },
    {
      value: totalPurchasesAmount.toLocaleString("tr-TR"),
      name: "Total Purchases",
    },
  ];
  const profit = totalSalesAmount - totalPurchasesAmount;

  return (
    <Box
      sx={{
        backgroundColor: "#F3F3F3",
        p: 2,
        borderRadius: "10px",
        width: { xs: "88%", md: "100%" },
      }}
    >
      <Typography
        fontWeight={"bold"}
        color={"brown"}
        textTransform={"uppercase"}
        sx={{ fontSize: { xs: "12px", md: "1rem" } }}
      >
        <AssignmentIcon
          sx={{
            fontSize: { xs: "2rem", md: "3rem" },
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
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
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
  );
};

export default HomeHistory;
