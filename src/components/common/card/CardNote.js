import React from 'react';
import { parsedDescription } from '../../../helpers/utils.js';

import "../../../statics/css/main.css"

export const CardNote = ({ note }) => {

    const descr_formated = parsedDescription(note);

    return (
        <>
            <div className="row card-body mt-5 mb-5 animate__animated animate__fadeInRight shadow rounded" >
                <div className="col-sm-12 m-2">
                    <h5 className='mb-3'>Addictional Note:</h5>
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
