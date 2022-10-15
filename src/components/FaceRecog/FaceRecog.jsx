import React from 'react';
import './FaceRecog.css';

const FaceRecog = ({ imageUrl, boxes }) => {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img id="inputimage"
                    src={imageUrl}
                    width="500"
                    height="auto"
                    alt="test" />
                {boxes.map((box, index) => {
                    return (
                        <div
                            key={index}
                            className='bounding-box'
                            style={{
                                top: box.topRow,
                                right: box.rightCol,
                                bottom: box.bottomRow,
                                left: box.leftCol
                            }}>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}

export default FaceRecog;