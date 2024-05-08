import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useStockRequest from "../services/useStockRequest";
import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

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

const ListFirms = () => {
  const [expanded, setExpanded] = React.useState(false);
  const { firms } = useSelector((state) => state.getfirms);
  const { getFirms } = useStockRequest();
  // console.log(firms)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    getFirms();
  }, []);
  return (
    <Container>
      <Typography>FİRMS</Typography>

      <Box>
        {firms.map((firm) => (
          <Card key={firm.id} sx={{ maxWidth: 345 }}>
            <CardHeader
              title={firm.name}
              sx={{textAlign:"center"}}
            />
            <CardMedia
              component="img"
              height="194"
              image={firm.image}
              alt="Paella dish"
              sx={{ objectFit: "contain" }}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {firm.address}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
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
        
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default ListFirms;
