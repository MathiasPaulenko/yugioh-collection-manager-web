import React from 'react'
import { useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import queryString from 'query-string'
import { ReturnButton } from '../common/ReturnButton';
import { SearchCard } from '../common/search/SearchCard';
import { Title } from '../common/Title';
import { Loading } from '../common/Loading';
import { useCardSearch } from '../../hooks/useCardSearch';
import { YGO_API } from '../../helpers/constants';
import { CardSearchSets } from '../common/search/CardSearchSets';
import { CardSearchImgDesc } from '../common/search/CardSearchImgDesc';
import { CardSearchBanlist } from '../common/search/CardSearchBanlist';
import { CardSearchInfo } from '../common/search/CardSearchInfo';

export const SearchCardScreen = () => {
  const location = useLocation();
  const { q = '' } = queryString.parse(location.search);

  const [formValues, handleInputChange] = useForm({
    searchText: q,
  });

  const { loading, data } = useCardSearch(YGO_API, `?id=${q}`);
  const cardData = !!data && data.data;

  return (
    <>
      <div className='row mt-3 align-items-center mb-3'>
        <div className='col-sm-8'>
          <Title value='Search Card' />
          <span>Look up the information of a letter from the online database by ID.</span>
        </div>

        <div className="col-sm-4">
          <ReturnButton value="Return" />
        </div>
      </div>
      <hr />

      <SearchCard
        value={formValues}
        handle={handleInputChange}
        resetValue='/search_card'
        placeholder="Card ID"

      />


      {
        loading
          ?
          (
            <>
              <Loading />
            </>
          )
          :
          (
            <>
              {
                (() => {
                  if (!cardData) {
                    return (
                      <>
                        <div className="mt-3 alert alert-secondary">
                          <span>The search is performed by the <strong>exact</strong> ID of the card.</span>
                        </div>
                      </>
                    )

                  } else {
                    return (
                      <>
                        <div className="row mt-5 animate__animated animate__fadeIn">
                          <div className="col-sm-12">

                            {
                              cardData.map(card => (
                                <div key={card.id}>
                                  {
                                    (() => {
                                      if (card.type.toLowerCase() === 'skill card') {
                                        return (

                                          <>
                                            <h5>Information</h5>
                                            <table className='table text-center'>
                                              <thead className=''>
                                                <tr>
                                                  <th scope='col'>ID</th>
                                                  <th scope='col'>Name</th>
                                                  <th scope='col'>Race</th>
                                                  <th scope='col'>type</th>
                                                  <th scope='col'>Archetype</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                <tr>
                                                  <td>{`${card.id}`}</td>
                                                  <td>{`${card.name}`}</td>
                                                  <td>{`${card.race}`}</td>
                                                  <td>{`${card.type}`}</td>
                                                  {
                                                    (card.hasOwnProperty('archetype'))
                                                      ? <td>{`${card.archetype}`}</td>
                                                      : <td> None </td>
                                                  }
                                                </tr>
                                              </tbody>
                                            </table>
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
                                            <div className='mt-5'>
                                              <div className='row'>
                                                <div className='col-sm-6 text-center'>
                                                  <h5>Image</h5>
                                                  <a data-name={card.id} href="/">
                                                    <img
                                                      alt={card.id}
                                                      src={card.card_images[0].image_url}
                                                      style={{
                                                        width: "20%"
                                                      }}
                                                    />
                                                  </a>
                                                </div>
                                                <div className='col-sm-6'>
                                                  <h5 className='text-center'>Description</h5>
                                                  <span className='text-justify'>{card.desc}</span>
                                                </div>
                                              </div>
                                            </div>

                                            <div className='mt-5'>
                                              <h5>Card Sets</h5>
                                              {
                                                card.card_sets.map(cardSets => (
                                                  <table key={Math.random()} className='table'>
                                                    <thead className=''>
                                                      <tr>
                                                        <th scope='col'>Code</th>
                                                        <th scope='col'>Name</th>
                                                        <th scope='col'>Rarity</th>
                                                        <th scope='col'>Price</th>

                                                      </tr>
                                                    </thead>
                                                    <tbody>
                                                      <tr>
                                                        <td>{`${cardSets.set_code}`}</td>
                                                        <td>{`${cardSets.set_name}`}</td>
                                                        <td>{`${cardSets.set_rarity}`}</td>
                                                        <td>{`${cardSets.set_price}`}</td>

                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                ))
                                              }
                                            </div>
                                          </>

                                        )

                                      } else if (card.type.toLowerCase() === 'spell card' || card.type.toLowerCase() === 'trap card') {
                                        return (

                                          <>
                                            <CardSearchInfo card={card} />

                                            <CardSearchBanlist card={card} />

                                            <CardSearchImgDesc card={card} />

                                            <CardSearchSets card={card} />
                                          </>

                                        )

                                      } else if (card.type.toLowerCase().includes("pendulum")) {
                                        return (
                                          <>
                                            <CardSearchInfo card={card} />

                                            <table className='table'>
                                              <thead className='text-center'>
                                                <tr>
                                                  <th scope='col'>Atack</th>
                                                  <th scope='col'>Defence</th>
                                                  <th scope='col'>Level</th>
                                                  <th scope='col'>Attribute</th>
                                                  <th scope='col'>Scale</th>
                                                </tr>
                                              </thead>
                                              <tbody className='text-center'>
                                                <tr>
                                                  <td>{`${card.atk}`}</td>
                                                  <td>{`${card.def}`}</td>
                                                  <td>{`${card.level}`}</td>
                                                  <td>{`${card.attribute}`}</td>
                                                  <td>{`${card.scale}`}</td>
                                                </tr>
                                              </tbody>
                                            </table>

                                            <CardSearchBanlist card={card} />

                                            <CardSearchImgDesc card={card} />

                                            <CardSearchSets card={card} />

                                          </>
                                        )
                                      } else if (card.type.toLowerCase().includes("link")) {
                                        return (
                                          <>
                                            <CardSearchInfo card={card} />

                                            <table className='table'>
                                              <thead className='text-center'>
                                                <tr>
                                                  <th scope='col'>Atack</th>
                                                  <th scope='col'>Attribute</th>
                                                  <th scope='col'>Link Value</th>
                                                  <th scope='col'>Markers</th>
                                                </tr>
                                              </thead>
                                              <tbody className='text-center'>
                                                <tr>
                                                  <td>{`${card.atk}`}</td>
                                                  <td>{`${card.attribute}`}</td>
                                                  <td>{`${card.linkval}`}</td>
                                                  <td>{`${card.linkmarkers.join(", ")}`}</td>

                                                </tr>
                                              </tbody>
                                            </table>

                                            <CardSearchBanlist card={card} />

                                            <CardSearchImgDesc card={card} />

                                            <CardSearchSets card={card} />

                                          </>
                                        )

                                      } else {
                                        return (
                                          <>
                                            <CardSearchInfo card={card} />


                                            <table className='table'>
                                              <thead className='text-center'>
                                                <tr>
                                                  <th scope='col'>Atack</th>
                                                  <th scope='col'>Defence</th>
                                                  <th scope='col'>Level</th>
                                                  <th scope='col'>Attribute</th>
                                                </tr>
                                              </thead>
                                              <tbody className='text-center'>
                                                <tr>
                                                  <td>{`${card.atk}`}</td>
                                                  <td>{`${card.def}`}</td>
                                                  <td>{`${card.level}`}</td>
                                                  <td>{`${card.attribute}`}</td>
                                                </tr>
                                              </tbody>
                                            </table>

                                            <CardSearchBanlist card={card} />

                                            <CardSearchImgDesc card={card} />

                                            <CardSearchSets card={card} />

                                          </>
                                        )
                                      }

                                    })()
                                  }

                                </div>
                              ))
                            }
                          </div>
                        </div>
                      </>
                    )
                  }
                })()
              }
            </>
          )
      }
    </>
  )
}
