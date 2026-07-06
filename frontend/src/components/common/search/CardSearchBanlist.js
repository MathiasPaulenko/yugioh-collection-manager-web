import React from 'react'

export const CardSearchBanlist = ({ card }) => {
    return (
        <>
            <div>
                {
                    (card.hasOwnProperty('banlist_info'))
                        ?
                        <>
                            <div className='mt-5'>
                                <h5>Banlist Info</h5>
                                <table className='table table-fixed'>
                                    <thead className=''>
                                        <tr>
                                            <th scope='col'>TCG</th>
                                            <th scope='col'>OCG</th>
                                        </tr>
                                    </thead>
                                    <tbody className=''>
                                        <tr>
                                            {
                                                (card.banlist_info.hasOwnProperty('ban_tcg'))
                                                    ? <td>{`${card.banlist_info.ban_tcg}`}</td>
                                                    : <td> None </td>
                                            }
                                            {
                                                (card.banlist_info.hasOwnProperty('ban_ocg'))
                                                    ? <td>{`${card.banlist_info.ban_ocg}`}</td>
                                                    : <td> None </td>
                                            }
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </>
                        : <div></div>
                }
            </div>
        </>
    )
}
