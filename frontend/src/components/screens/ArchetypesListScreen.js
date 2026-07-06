import React from 'react'
import { YGO_BASE } from '../../helpers/constants';
import { useCard } from '../../hooks/useCard';
import { Loading } from '../common/Loading';
import { ReturnButton } from '../common/ReturnButton'
import { Title } from '../common/Title'

export const ArchetypesListScreen = () => {

  const { loading, data } = useCard(`${YGO_BASE}archetypes.php`);
  const cardData = !!data && data;

  if (cardData) {
    cardData.forEach(function (element) {
      console.log(element.archetype_name);

      fetch(`${YGO_BASE}cardinfo.php?archetype=${element.archetype_name}`)
        .then(response => response.json())
        .then(data => console.log(data.data[0].id));
    });
  }


  return (
    <>
      <div className='row mt-3 align-items-center mb-3'>
        <div className='col-sm-10'>
          <Title value='Archetypes List' />
        </div>
        <div className="col-sm-2">
          <ReturnButton value="Return" />
        </div>
      </div>
      <hr />

      {
        loading
          ?
          (
            <Loading />
          )
          :
          (
            <>
              {
                (() => {
                  if (!cardData) {
                    return <div className="alert alert-danger mt-3">Data no found: Backend is off. </div>

                  } else if (cardData) {
                    return (
                      <>
                        <div className="row mt-4 animate__animated animate__fadeIn">
                          {
                            cardData.map(card => (
                              <div key={card.archetype_name} className='col-sm-2 mt-2 mb-2 rounded align-items-center'>
                                <p className='text-center'>{card.archetype_name}</p>

                              </div>

                            ))
                          }
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
