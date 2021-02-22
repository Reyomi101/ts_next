import Layout from "../src/components/layout";
import Link from "next/link";
import useStyles from "../src/helper/headStyles";
import Pagination from "@material-ui/lab/Pagination";
import { usePagination, Skeleton } from "@material-ui/lab";
import {
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Paper,
  Button,
  Grid,
  Toolbar,
  Container,
  Avatar,
  Divider,
} from "@material-ui/core";
import { WebClient } from "../src/api/webclient";
import { useState, useEffect } from "react";
import { TablePagination } from "@material-ui/core";
import { number } from "yup";

function paginator(array, limit, page) {
  return array.slice((page - 1) * limit, page * limit);
  // return array.slice(page * limit, (page * limit) + limit);
}

export default function Home() {
  const [pageItems, setPageitems] = useState([]);
  const [items, setItems] = useState([]);

  const [loader, setLoader] = useState(true);

  const classes = useStyles();
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);

  const ratetotal = items.length / limit;

  const total = Math.round(ratetotal);

  const handleChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    // setLoader(true);
    setTimeout(() => {
      setPageitems(paginator(items, limit, page));
      setPage(newPage);
      // setLoader(false);
    }, 500);
  };

  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      WebClient.get("/posts").then((res) => {
        setItems(res.data);
        setPageitems(paginator(res.data, limit, page));
        setLoader(false);
      });
    }, 500);
  }, []);

  return (
    <div>
      <Toolbar />
      <Container maxWidth="lg">
        <div className={classes.imagedex}>
          <Avatar
            variant="square"
            style={{
              width: "100%",
              height: "25rem",
              color: "#fff",
              backgroundColor: "#eee",
            }}
          >
            Sample IMAGE
          </Avatar>
        </div>
      </Container>
      <Layout title="Tsx NEXT blog">
        <Typography variant="h3">Articles</Typography>

        <Typography variant="subtitle2">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni
          voluptatem illum sapiente nisi ab! Eligendi consequuntur sapiente
          architecto vitae natus neque veniam voluptatem enim. Explicabo
          accusamus consequatur voluptatibus quisquam fugiat!
        </Typography>
        <Divider />
        {/* <div className={classes.indexItems}> */}
        <Grid
          container
          spacing={3}
          direction="row"
          justify="space-around"
          alignItems="center"
          // style={{ marginTop: "5px" }}
        >
          {loader === true ? (
            <Skeleton variant="rect" width="100%">
              <div style={{ paddingTop: "57%", marginTop: "20px" }} />
            </Skeleton>
          ) : (
            pageItems.map((item, idx) => {
              return (
                <Grid item lg={4} md={6} sm={6}>
                  <Paper className={classes.paper}>
                    <Card>
                     
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="button"
                            component="h2"
                          >
                            {item.title}
                          </Typography>

                          <Typography
                            variant="caption"
                            color="secondary"
                            component="p"
                            className={classes.cardBody}
                          >
                            {item.body}
                          </Typography>
                        </CardContent>
                      
                      <CardActions></CardActions>
                    </Card>
                    <div className={classes.bottomcard}>
                      <Typography
                        variant="caption"
                        component="p"
                        className={classes.pageno}
                      >
                        {item.userId}, {item.id}
                      </Typography>
                      <div className={classes.linkButton}>
                        <Link
                          key={idx}
                          href={{ pathname: "/blogpage", query: item }}
                          passHref
                        >
                          <Button
                            // target="_blank"
                            component="a"
                            size="small"
                            color="primary"
                            variant="contained"
                          >
                            Learn More
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Paper>
                </Grid>
              );
            })
          )}
        </Grid>
        {/* </div> */}

        <Toolbar />
        <div className={classes.pagenator}>
          <Pagination
            count={total}
            page={page}
            onChange={handleChange}
            defaultPage={2}
            color="primary"
            size="large"
            shape="rounded"
            showFirstButton
            showLastButton
          />
        </div>
        <Toolbar />
      </Layout>
    </div>
  );
}
