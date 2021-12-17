import React, {useState} from 'react';
import {Button, Grid, makeStyles, Paper, TextField, Checkbox, FormControlLabel, Collapse, FormControl, InputLabel, Select, MenuItem, CircularProgress} from "@material-ui/core";
import {createTheme, ThemeProvider} from "@material-ui/core/styles";

//Importer les dépendances nécessaires
const { doc, setDoc } = require("firebase/firestore");
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { default: axios } = require("axios");

// Configuration Firebase
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "dataco2-8f888.firebaseapp.com",
    databaseURL: "https://dataco2-8f888-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "dataco2-8f888",
    storageBucket: "dataco2-8f888.appspot.com",
    messagingSenderId: "228963406020",
    appId: "1:228963406020:web:ed8252a3f1463c6363b991",
    measurementId: "G-QXFP91DHHC"
};

initializeApp(firebaseConfig);
const db = getFirestore();

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
        backgroundColor: "transparent",
        padding: '2rem',
        minHeight: '74vh'
    },
    gridContainer: {
        width: '60%',
        margin: '0 auto'
    },
    button: {
        borderRadius: "14px",
        fontSize: '2rem',
        fontFamily: 'Readex Pro',
        fontWeight: 200
    },
    link: {
        textDecoration: 'none'
    },
    textfield: {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        border: 'none',
        borderRadius: "4px"
    },
    collapse: {
        width: '97%'
    }
}));

export default function AddStudent() {
    const classes = useStyles();
    const [student, setStudent] = useState({
        firstname: null,
        lastname: null,
        address: null,
        city: null,
        postCode: null,
        work_address: null,
        work_city: null,
        work_podtCode: null,
        cursus: null,
        id_class: null,

    });
    const [rgpd, setRgpd] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false)

    const handleSuccess = () => {
        setLoading(true)
        setTimeout(()=>{
            setSuccess(true)
            setLoading(false)
        }, 2000)
    }

    const handleSubmit = async() => {
        // Génération d'un id unique aléatoire
        const id = 0

            //Initialisation des données
            let address_coordinates = null;
            let work_coordinates = null;
            const school_coordinates = [2.368984,48.868514];
            let adresse_distance = null;
            let work_distance = null;
            let adress_co2 = null;
            let work_co2 = null;

            //Formater les adresse pour la requête
            let address = student.address.toString().replaceAll(' ', '+');
            let work = student.work_address?.toString().replaceAll(' ', '+') || null;

            //Récupérer ses coordonnées longitude latitude
            await axios.get(`https://api-adresse.data.gouv.fr/search/?q=${address}&postcode=${student.postCode}`)
                .then((res)=>{
                    console.log('coordonées', res.data.features[0].geometry.coordinates)
                    address_coordinates = res.data.features[0].geometry.coordinates;
                })
                .catch((err)=>{
                    console.log(err)
                })

            // Si l'élève possède une adresse d'alternance lancement de la requête
            if(work !== null) {
                await axios.get(`https://api-adresse.data.gouv.fr/search/?q=${work}&postcode=${student.work_postCode}`)
                    .then((res)=>{
                        console.log('coordonnées', res.data.features[0].geometry.coordinates)
                        work_coordinates = res.data.features[0].geometry.coordinates;
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
            }

            // Récupération de la distance entre domicile et école selon l'hypothèse qu'ils prennent tous les transiliens et
            // RER pour l'instant
            // A l'avenir produit en crois entre le temps de trajet des différentes étapes du trajet calculé par citymaper et la
            // vitesse de chaque type de transport utilisé
            if(address_coordinates !== null) {
                await axios.get(`https://api.external.citymapper.com/api/1/directions/transit?start=${address_coordinates[1]},${address_coordinates[0]}&end=${school_coordinates[1]},${school_coordinates[0]}`, {
                    headers: {
                        'Citymapper-Partner-Key': 'lhort6chJbLPF4jrdPxs5pHsDI22tmw6'
                    }
                })
                    .then((res) => {
                        adresse_distance = (40*res.data.routes[0].duration_seconds) / 3600;
                        console.log('distance du trajet domicile', adresse_distance);
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
            }

            // Récupération de la distance entre travail si il possède une adresse travail et école selon l'hypothèse qu'ils
            // prennent tous les transiliens et RER pour l'instant
            if(work_coordinates !== null ) {
                await axios.get(`https://api.external.citymapper.com/api/1/directions/transit?start=${work_coordinates[1]},${work_coordinates[0]}&end=${school_coordinates[1]},${school_coordinates[0]}`, {
                    headers: {
                        'Citymapper-Partner-Key': 'lhort6chJbLPF4jrdPxs5pHsDI22tmw6'
                    }
                })
                    .then((res) => {
                        work_distance = (40*res.data.routes[0].duration_seconds) / 3600;
                        console.log('distance du trajet travail', work_distance);
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
            }

            // Api ADEME afin de récupérer la consommation de CO2 en fonction de la distance
            await axios.get(`https://api.monimpacttransport.fr/beta/getEmissionsPerDistance?km=${adresse_distance}`)
                .then((res) => {
                    adress_co2 = res.data.find((el) => el.name === 'RER ou Transilien').emissions.gco2e
                    console.log('conso CO2 domicile: ', res.data.find((el) => el.name === 'RER ou Transilien').emissions.gco2e)
                })
                .catch((err) => {
                    console.log(err);
                })

            // Api ADEME afin de récupérer la consommation de CO2 en fonction de la distance si il possède une adresse travail
            // (j'aurais pu mettre toutes ses requête dans la même condition mais je l'ai pas fait. Dans l'optique d'écrire un
            // code plus lisible je le ferai)
            if(work_distance !== null) {
                await axios.get(`https://api.monimpacttransport.fr/beta/getEmissionsPerDistance?km=${work_distance}`)
                    .then((res) => {
                        work_co2 = res.data.find((el) => el.name === 'RER ou Transilien').emissions.gco2e;
                        console.log('conso CO2 travail: ', res.data.find((el) => el.name === 'RER ou Transilien').emissions.gco2e)
                    })
                    .catch((err) => {
                        console.error(err)
                    })
            }

            // Initialisation de l'objec temporaire
            let temp = {
                ...student,
                adresse_distance: adresse_distance,
                work_distance: work_distance,
                work_co2: work_co2 || adress_co2,
                adress_co2: adress_co2 || work_co2
            }

            // Modification de l'utilisateur dans Firebase
            setDoc(doc(db, "users", id.toString()), temp)
                .then((res)=> {
                    setSuccess(true)
                })
                .catch((err) => {
                    console.log(err)
                });

    }

    const handleRGPD = () => {
        setRgpd((prev)=>!prev)
    }

    const handleData = (e, name) => {
        setStudent((prev) => ({
            ...prev,
            [e.target.id || name]: e.target.value
        }))
    }

    return (
        <ThemeProvider theme={outerTheme}>
            {success ? (
                <Paper className={classes.background}>
                    <Grid container spacing={3} alignItems={"center"}>
                        <Grid item xs={12}>
                            <h2>Vous avez bien été ajouté</h2>
                        </Grid>
                    </Grid>
                </Paper>
            ) : (
            <Paper className={classes.background}>
                <Grid className={classes.gridContainer} container spacing={3} justifyContent={"center"} alignItems={"center"}>
                    <Grid item xs={12}>
                        <TextField fullWidth onChange={handleData} className={classes.textfield} id="lastname" label="Nom" placeholder="Nom" required variant="outlined" color="secondary"/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth onChange={handleData} className={classes.textfield} id="firstname" label="Prénom" placeholder="Prénom" required variant="outlined" color="secondary"/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth onChange={handleData} className={classes.textfield} id="address" label="Adresse de domicile" placeholder="Adresse de domicile" required variant="outlined" color="secondary"/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth onChange={handleData} className={classes.textfield} id="city" label="Ville" placeholder="Ville" required variant="outlined" color="secondary"/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth onChange={handleData} className={classes.textfield} id="postCode" label="Code Postale" placeholder="Code Postale" required variant="outlined" color="secondary"/>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined" color={"secondary"} className={classes.textfield}>
                            <InputLabel id="demo-simple-select-outlined-label">Classe</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                value={student.id_class}
                                id="id_class"
                                onChange={(e)=>handleData(e, "id_class")}
                                label="Classe"
                            >
                                <MenuItem value={"000087I677567"}>B1</MenuItem>
                                <MenuItem value={"0006363463635"}>B2</MenuItem>
                                <MenuItem value={"8679563467565"}>B3</MenuItem>
                                <MenuItem value={"5464767567567"}>M1</MenuItem>
                                <MenuItem value={"4645647676575"}>M2</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControlLabel
                            control={<Checkbox checked={student.cursus === 'interns'} onChange={handleData} id="cursus" value={"interns"}/>}
                            label="Alternant"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControlLabel
                            control={<Checkbox checked={student.cursus === 'student'} onChange={handleData} id="cursus" value={"student"}/>}
                            label="Formations Initiale"
                        />
                    </Grid>
                    <Collapse className={classes.collapse} in={student.cursus === "interns"}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField onChange={handleData} fullWidth className={classes.textfield} id="work_address" label="Adresse de travail" placeholder="Adresse de travail" required variant="outlined" color="secondary"/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField onChange={handleData} fullWidth className={classes.textfield} id="work_city" label="Ville de travail" placeholder="Ville de travail" required variant="outlined" color="secondary"/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField onChange={handleData} fullWidth className={classes.textfield} id="work_podtCode" label="Code postale de travail" placeholder="Code postale de travail" required variant="outlined" color="secondary"/>
                            </Grid>
                        </Grid>
                    </Collapse>
                    <FormControlLabel
                        control={<Checkbox checked={rgpd} onChange={()=>handleRGPD('interns')} name="jason" />}
                        label="Je confirme avoir pris connaissance de la politique de confidentialité et de la gestion de mes données"
                    />
                    <Grid item xs={12}>
                        {loading ? (
                            <Button onClick={handleSuccess} disabled={!rgpd} variant={"contained"} color={"secondary"}><CircularProgress  color={"primary"}/></Button>
                        ) : (
                            <Button onClick={handleSuccess} disabled={!rgpd} variant={"contained"} color={"secondary"}>Enregistrer</Button>
                        )}
                    </Grid>
                </Grid>
            </Paper>)}
        </ThemeProvider>
    );
}