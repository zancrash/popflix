import React from 'react';
import {Link} from 'react-router-dom';

const NotFound = () => (
    <div>
        <h3>We did not find what you were looking for :/</h3>
        <Link to="/">Return to browsing movies?</Link>
    </div>
)

export default NotFound;