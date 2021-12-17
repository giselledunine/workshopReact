import React, {Fragment} from 'react';
import {Link} from "react-router-dom";

export default function Layout() {

    return (
        <Fragment>
            <h1>Layout</h1>

            <nav>
                <ul>
                    <li>
                        <Link to="/">Menu principale</Link>
                    </li>
                    <li>
                        <Link to="/add-student">Ajouter un élève</Link>
                    </li>
                    <li>
                        <Link to="/update-student">Modifier un élève</Link>
                    </li>
                </ul>
            </nav>
        </Fragment>
    );
}