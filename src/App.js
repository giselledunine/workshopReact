import './App.css';
import Home from './components/Home';
import AddStudent from './components/AddStudent';
import UpdateStudent from './components/UpdateStudent';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import * as React from 'react';
import {makeStyles, Paper} from "@material-ui/core";

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
    <Route
        {...rest}
        render={(props) => (
            <Layout>
                <Component {...props}/>
            </Layout>
        )}
    />
);

const useStyles = makeStyles((theme)=>({
    h1: {
        margin: 0,
        color: 'white',
        fontFamily: 'Readex Pro',
        fontWeight: 600,
        fontSize: '5rem'
    },
    title: {
        height: '10vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#e1523d',
        justifyContent: 'center',
        padding: '2rem',
    },
    background: {
        backgroundColor: '#00a2ad !important'
    }
}));

function App() {
    const classes = useStyles();
  return (
    <div className="App" >

        <Router>
            <div className={classes.background}>

                <Paper elevation={0} className={classes.title}>
                    <h1 className={classes.h1}>DC Campus</h1>
                </Paper>

                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/add-student" element={<AddStudent />}></Route>
                    <Route path="/update-student" element={<UpdateStudent />} />
                </Routes>
            </div>

        </Router>

    </div>
  );
}

export default App;
