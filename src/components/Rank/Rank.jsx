import React from 'react';

const Rank = (props) => {
    console.log(props);
    return (
        <div>
            <div className='white f3'>
                {`Hello ${props.name}, the number of images you have submitted is...`}
            </div>
            <div className='white f1'>
                {props.entries}
            </div>
        </div>
    )
}

export default Rank;