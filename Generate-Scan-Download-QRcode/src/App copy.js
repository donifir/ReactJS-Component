import React from "react";
// import { Container, Card, CardContent } from "@mui/material";
import { styled } from '@mui/material/styles';
// import {makeStyles} from "@mui/material/styles";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";


export default function App() {
  const classes = useStyle();
  return (
    <Container className={classes.container}>
      <Card>
        <h2 className={classes.title}>Generate Download & scan QR-code with reactJS</h2>
        <CardContent>

        </CardContent>
      </Card>
    </Container>
  );
}

const useStyle = styled((theme) => ({
  container: {
    martginTop: 10,
  },
}));
