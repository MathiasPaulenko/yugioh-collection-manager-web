import React from 'react'

export const CardSearchSets = ({ card }) => {

    return (
        <>
            <div className='mt-5'>
                <h5>Card Sets</h5>

                {
                    card.card_sets.map(cardSets => (
                        <table key={Math.random()} className='table table-fixed'>
                            <thead className=''>
                                <tr>
                                    <th scope='col'>Code</th>
                                    <th scope='col'>Name</th>
                                    <th scope='col'>Rarity</th>
                                    <th scope='col'>Price</th>

                                </tr>
                            </thead>
                            <tbody className=''>
                                <tr>
                                    <td>{`${cardSets.set_code}`}</td>
                                    <td>{`${cardSets.set_name}`}</td>
                                    <td>{`${cardSets.set_rarity}`}</td>
                                    <td>{` $ ${cardSets.set_price}`}</td>
                                </tr>
                            </tbody>
                        </table>
                    ))
                }
            </div>
        </>
    )
}
