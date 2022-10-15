import React from 'react';
import './imagelinkform.css';

const ImageLinkForm = ({ onInputChange, onClick }) => {
    
    return (

        <div className='ma4 mt0'>
            <p className='f3 white'>
                {'Enter an image url to get started.'}
            </p>
            <div className='center'>
                <div className='center form pa4 br3 shadow-5'>
                    <input className="f4 pa2 w-75 center"
                        type="text"
                        placeholder="Enter an image url"
                        onChange={onInputChange} />
                    <button
                        onClick={onClick}
                        className="w-25 grow f4 link ph3 pv2 dib black">Detect</button>
                </div>

            </div>
        </div>

    )
}

export default ImageLinkForm;