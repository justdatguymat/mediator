import React, { useState, useEffect } from "react";

import Head from "next/head";
// import Image from 'next/image'

import Box from "@mui/material/Box";
//import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [uri, setUri] = useState("");
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");
  const [items, setItems] = useState(null);
  const [refresh, setRefresh] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(event);
    setLoading(true);
    const response = await fetch("http://localhost:3000/api/torrent", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uri }),
    });
    const data = await response.json();
    console.log(data);
    setSeverity(!response.ok ? "error" : "success");
    setLoading(false);
    setMessage(data.message ? data.message : "");
  };

  const retrieveItem = async (id = null) => {
    var url = "http://localhost:3000/api/torrent";
    if (id) {
      url += "/id";
    }
    console.log(url);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  };

  useEffect(() => {
    var intervalId = setInterval(() => {
      setRefresh((prev) => prev + 1);
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(async () => {
    if (refresh > 0) {
      var data = await retrieveItem();
      console.log("effect", data);
      setItems(data);
    }
  }, [refresh]);

  return (
    <Container maxWidth="md">
      <Head>
        <title>Raspberry PI Plex</title>
        <meta name="description" content="Plex Media Center" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item>
          <Paper elevation={12} sx={{ borderRadius: 2, padding: 5 }}>
            <Typography variant="h3" gutterBottom>
              Raspberry Plex Flex
            </Typography>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <Grid
                container
                justifyContent="space-between"
                alignItems="stretch"
                direction="column"
                spacing={1}
              >
                <Snackbar
                  open={Boolean(message)}
                  autoHideDuration={6000}
                  onClose={() => setMessage("")}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <Alert
                    onClose={() => setMessage("")}
                    severity={severity}
                    variant="filled"
                    sx={{ width: "100%" }}
                  >
                    {message}
                  </Alert>
                </Snackbar>
                <Grid item>
                  <TextField
                    disabled={loading}
                    fullWidth
                    autoFocus
                    id="magnet-uri"
                    label="Enter Magnet's URI"
                    variant="outlined"
                    required
                    multiline
                    value={uri}
                    onInput={(e) => setUri(e.target.value)}
                    rows={4}
                  />
                </Grid>
                <Grid item>
                  <LoadingButton
                    type="submit"
                    loading={loading}
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Submit
                  </LoadingButton>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
        {items && items.data && (
          <Grid item>
            <Paper elevation={12} sx={{ borderRadius: 2, padding: 5 }}>
              {Object.entries(items.data).map((item, idx) => (
                <Box key={idx}>
                  <Typography variant="h5">{item[0]}</Typography>
                  <Typography variant="body1">{item[1]}</Typography>
                </Box>
              ))}
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
