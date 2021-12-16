import React, {Fragment} from 'react';

export default function AddStudent() {
    const [firstname, setFirstName] = React.useState("");
    const [lastname, setLastName] = React.useState("");
    const [adressPersonnal, setAdressPersonnal] = React.useState("");
    const [postcodePersonnal, setPostcodePersonnal] = React.useState("");
    const [transportationPersonnal, setTransportationPersonnal] = React.useState("");
    const [adressProfessionnal, setAdressProfessionnal] = React.useState("");
    const [postcodeProfessionnal, setPostcodeProfessionnal] = React.useState("");
    const [transportationProfessionnal, setTransportationProfessionnal] = React.useState("");
    const [alternant, setAlternant] = React.useState(false);
    const [acceptedTerms, setAcceptedTerms] = React.useState(false);

    const handleSubmit = (event) => {
        console.log(`
            FirstName: ${firstname}
            LastName: ${firstname}
            Adress (personnal): ${adressPersonnal}
            CP (personnal): ${postcodePersonnal}
            Transportation Personnal : ${transportationPersonnal}
            Adress (professionnal): ${adressProfessionnal}
            CP (professionnal): ${postcodeProfessionnal}
            Transportation Professionnal : ${transportationProfessionnal}
            Alternant : ${alternant}
            Accepted Terms: ${acceptedTerms}
        `);
        event.preventDefault();
    }

    return (
        <div class="form">
            <form onSubmit={handleSubmit}>
                <h1>Ajouter un élève</h1>
                
                <label>
                Prénom:
                    <input
                    name="firstname"
                    type="text"
                    value={firstname}
                    onChange={e => setFirstName(e.target.value)}
                    required />
                </label>
                
                <label>
                Nom:
                    <input
                    name="lastname"
                    type="text"
                    value={lastname}
                    onChange={e => setLastName(e.target.value)}
                    required />
                </label>

                <label>
                Adresse personnelle:
                    <input
                    name="adressPersonnal"
                    type="text"
                    value={adressPersonnal}
                    onChange={e => setAdressPersonnal(e.target.value)}
                    required />
                </label>

                <label>
                Code Postal:
                    <input
                    name="postcodePersonnal"
                    type="text"
                    value={postcodePersonnal}
                    onChange={e => setPostcodePersonnal(e.target.value)}
                    required />
                </label>

                <label>
                    Moyen de transport pour aller à l'école:
                    <select
                        name="transportationPersonnal"
                        value={transportationPersonnal}
                        onChange={e => setTransportationPersonnal(e.target.value)}
                        required>
                        <option key=""></option>
                        <option key="foot">Piéton</option>
                        <option key="car">Voiture</option>
                        <option key="transport">Transports</option>
                    </select>
                </label>

                <label>
                    Alternant ? :
                    <input
                    name="type"
                    type="checkbox"
                    onChange={e => setAlternant(e.target.value)}
                    required />
                </label>

                <label>
                Adresse entreprise :
                    <input
                    name="adressProfessionnal"
                    type="text"
                    value={adressProfessionnal}
                    onChange={e => setAdressProfessionnal(e.target.value)}
                    required />
                </label>

                <label>
                Code Postal:
                    <input
                    name="postcodeProfessionnal"
                    type="text"
                    value={postcodeProfessionnal}
                    onChange={e => setPostcodeProfessionnal(e.target.value)}
                    required />
                </label>

                <label>
                    Moyen de transport pour aller au travail:
                    <select
                        name="transportationProfessionnal"
                        value={transportationProfessionnal}
                        onChange={e => setTransportationProfessionnal(e.target.value)}
                        required>
                        <option key=""></option>
                        <option key="foot">Piéton</option>
                        <option key="car">Voiture</option>
                        <option key="transport">Transports</option>
                    </select>
                </label>
        
                <label>
                    <input
                        name="acceptedTerms"
                        type="checkbox"
                        onChange={e => setAcceptedTerms(e.target.value)}
                        required />
                    I accept the terms of service        
                </label>
    
                <button>Submit</button>
            </form>
        </div> 
    );
}