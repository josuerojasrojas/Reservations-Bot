import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    marginBottom: 20
  },
  media: {
    height: 140
  }
});

function getTime(date) {
  const split = date.split(" ")[3];
  const digits = split.split(":");
  return `${digits[0] % 12}:${digits[1]} ${digits[0] > 11 ? "PM" : "AM"}`;
}

function getDate(date) {
  const split = date.split(" ");
  return `${split[0]} ${split[1]} ${split[2]}`;
}

function cardImage(date) {
  const split = date.split(" ")[3];
  const digits = split.split(":");
  const hours = parseInt(digits[0]);
  
  if (hours > 17 && hours < 20) {
    return "/images/wendys_evening.jpg";
  } else if (hours > 20 || hours < 7) {
    return "/images/wendys_night.jpg";
  } else {
    return "/images/wendys_day.jpeg";
  }
}

export default function MediaCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={cardImage(props.date)}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography variant="h6" color="textSecondary" component="p">
            {getTime(props.date)}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {getDate(props.date)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
