import React from 'react'

export const CardSearchInfo = ({ card }) => {

    // let imgSubtype = `/assets/img/type/${card.type}.jpg`;
    // let imgRace = "";

    // if (card.type.toLowerCase() === 'spell card' || card.type.toLowerCase() === 'trap card') {
    //     imgRace = `/assets/img/other_race/${card.race}.png`;

    // }

    // if (card.type.toLowerCase().includes("monster")) {
    //     imgRace = `/assets/img/monster_race/${card.race}.png`;
    // }

    return (
        <>
            <h5>Information</h5>
            <table className='table'>
                <thead className='text-center'>
                    <tr>
                        <th scope='col'>ID</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Race</th>
                        <th scope='col'>Type</th>
                        <th scope='col'>Archetype</th>
                    </tr>
                </thead>
                <tbody className='text-center align-middle'>
                    <tr>
                        <td>{`${card.id}`}</td>
                        <td>{`${card.name}`}</td>
                        <td><span>{`${card.race} `}</span></td>
                        <td><span>{`${card.type} `}</span></td>

                        {
                            (card.hasOwnProperty('archetype'))
                                ? <td>{`${card.archetype}`}</td>
                                : <td> None </td>
                        }
                        
                    </tr>
                </tbody>
            </table>
        </>
    )
}
