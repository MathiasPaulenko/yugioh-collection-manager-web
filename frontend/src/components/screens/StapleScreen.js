import React, { useEffect, useState } from 'react'
import { YGO_API } from '../../helpers/constants';
import queryString from 'query-string'
import { useCard } from '../../hooks/useCard';
import { Loading } from '../common/Loading';
import { ReturnButton } from '../common/ReturnButton'
import { Title } from '../common/Title'
import { CardStapleOnList } from '../common/card/CardStapleOnList';
import { SearchCard } from '../common/search/SearchCard';
import { useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';

export const StapleScreen = () => {
  const location = useLocation();

  const { q = '' } = queryString.parse(location.search);

  const [formValues, handleInputChange] = useForm({
    searchText: q,
  });

  const [url, setUrl] = useState(`${YGO_API}?staple=yes`)
  const { loading, data } = useCard(url);


  useEffect(() => {
    if (!formValues.searchText) {
      setUrl(`${YGO_API}?staple=yes`)
    } else {
      setUrl(`${YGO_API}?staple=yes&fname=${formValues.searchText}`)
    }
  }, [handleInputChange]);

  const cardData = !!data && data.data;

  return (
    <>
      <div className='row mt-3 align-items-center mb-3'>
        <div className='col-sm-8'>
          <Title value='Staple Cards' />
        </div>
        <div className="col-sm-4">
          <ReturnButton value="Return" />
        </div>
      </div>
      <hr />

      <SearchCard
        value={formValues}
        handle={handleInputChange}
        resetValue='/staples'
        placeholder="Card Name"
      />

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
                              <CardStapleOnList
                                key={card.id}
                                name={card.id}
                                image={card.id}
                                card_name={card.name}

                              />
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
