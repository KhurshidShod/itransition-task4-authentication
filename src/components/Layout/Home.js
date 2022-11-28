import React from 'react'
import { Link } from 'react-router-dom';
import Nav from './Navbar.js';

function Home() {
  return (
    <div>
    <Nav />
    <section>
            <div>
                <h1>Itransition</h1>
                <p>Goal is exact, distance is short</p>
            </div>
    </section>
    </div>
  )
}

export default Home;