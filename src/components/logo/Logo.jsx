import React from 'react';
import Tilt from 'react-parallax-tilt';
import './logo.css';
import logo from './logo.png';

const Logo = () => {
    return (

        <div className='ma4 mt0'>
            <Tilt className='Tilt ma4 br2 shadow-2'
                tiltMaxAngleX={25}
                tiltMaxAngleY={25}
                scale={1.15}
                style={{ height: '150px', width: '150px' }}>

                <img style={{ paddingTop: '7px' }} src={logo} alt="AI Brain Logo" />

            </Tilt>
        </div>

    )
}

export default Logo;