import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Grid, makeStyles, Paper} from "@material-ui/core";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const outerTheme = createTheme({
    palette: {
        primary: {
            main: '#00A2AD',
        },
        secondary: {
            main: "#E1523D",
        },
    },
});

const useStyles = makeStyles((theme)=>({
    background: {
        backgroundColor: 'transparent'
    },
    gridContainer: {
        height: '83vh',
    },
    button: {
        borderRadius: "14px",
        fontSize: '2rem',
        fontFamily: 'Readex Pro',
        fontWeight: 200
    },
    link: {
        textDecoration: 'none'
    }
}));

export default function UpdateStudent() {
    const classes = useStyles();

    return (
        <ThemeProvider theme={outerTheme}>
            <Paper className={classes.background}>
                <Grid className={classes.gridContainer} container spacing={3} justifyContent={"center"} alignItems={"center"}>
                    <Grid item xs={12}>
                        <h1>Bientôt disponnible</h1>
                        <Link className={classes.link} to={"/"}>
                            <Button className={classes.button} variant={"contained"} color={"secondary"} >Retourner à l'accueil</Button>
                        </Link>
                    </Grid>
                </Grid>
            </Paper>
        </ThemeProvider>
    );
}