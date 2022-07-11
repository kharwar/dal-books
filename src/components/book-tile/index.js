import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Favorite, ShoppingCart } from "@mui/icons-material";

function MediaCard(props) {
  return (
    <Card>
      <CardActionArea component={Link} to={`/book/${props.id}`}>
        <CardMedia
          component="img"
          image={props.url}
          sx={{
            height: {
              xs: 150,
              md: 200,
            },
            width: { md: "100%" },
          }}
        />
        <CardContent>
          <Typography variant="h6">{props.title}</Typography>
          <Typography sx={{ color: "#888" }} variant="caption">
            {props.description}
          </Typography>
          <br />
          <Typography sx={{ color: "#888" }} variant="overline">
            {props.author}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Divider></Divider>
      <CardActions>
        <Grid container>
          <Grid textAlign="center" item xs={6}>
          <Typography sx={{ color: "#888" }} variant="overline">
            {props.points} Points Needed
          </Typography>
          </Grid>

          <Grid item xs={6} sx={{ display: { xs: "none", sm: "block" } }}>
            <Button fullWidth variant="contained" color="secondary">
              Borrow
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}

export default MediaCard;
