import React from 'react';
import { parsedDescription } from '../../../helpers/utils.js';

import "../../../statics/css/main.css"

export const CardNote = ({ note }) => {

    const descr_formated = parsedDescription(note);

    return (
        <>
            <div className="card shadow-sm border-0 mt-4 mb-4 animate__animated animate__fadeInRight" >
                <div className="card-body p-4">
                    <h5 className='mb-3'>Additional Note:</h5>
                    <hr />
                    <div className='card-text new-line'>
                        {
                            descr_formated.split('<br>').map((i, key) => {
                                return <span 
                                key={key}
                                className="text-justify"
                                > {i} <br /></span>;
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
};
