import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import queryString from 'query-string'
import { YGO_API } from '../../helpers/constants';
import { useCard } from '../../hooks/useCard';
import { useForm } from '../../hooks/useForm';
import { CardBannedOnList } from '../common/card/CardBannedOnList';
import { Loading } from '../common/Loading';
import { ReturnButton } from '../common/ReturnButton';
import { SearchCard } from '../common/search/SearchCard';
import { Title } from '../common/Title';

export const BanlistScreen = () => {
  const location = useLocation();

  const { q = '' } = queryString.parse(location.search);

  const [formValues, handleInputChange] = useForm({
    searchText: q,
  });

  const [banlistTitle, setBanlistTitle] = useState('TCG');
  const [checkInput, setCheckInput] = useState(true)

  const [url, setUrl] = useState(`${YGO_API}?banlist=TCG`)

  const { loading, data } = useCard(url);


  useEffect(() => {
    if (!checkInput) {
      if (!formValues.searchText) {
        setUrl(`${YGO_API}?banlist=OCG`);

      } else {
        setUrl(`${YGO_API}?banlist=OCG&fname=${formValues.searchText}`);
      }
      setBanlistTitle('OCG');
    } else {
      if (!formValues.searchText) {
        setUrl(`${YGO_API}?banlist=TCG`);

      } else {
        setUrl(`${YGO_API}?banlist=TCG&fname=${formValues.searchText}`);

      }
      setBanlistTitle('TCG');
    }
  }, [checkInput, formValues]);

  const cardData = !!data && data.data;

  const handleCheckboxChange = (e) => {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setCheckInput(value);

  }

  return (
    <>
      <div className='row mt-3 align-items-center mb-3'>
        <div className='col-sm-8'>
          <Title value={`Banlist ${banlistTitle}`} />
        </div>
        <div className='col-sm-2'>
          <div className='form-check form-switch'>
            <label
              className='form-check-label'
              htmlFor="distinct"
            >
              {banlistTitle}

            </label>

            <input
              type="checkbox"
              className='form-check-input'
              name='distinct'
              checked={checkInput}
              onChange={handleCheckboxChange}
              id="distinct"

            />
          </div>
        </div>
        <div className="col-sm-2">
          <ReturnButton value="Return" />
        </div>
      </div>
      <hr />

      <SearchCard
        value={formValues}
        handle={handleInputChange}
        resetValue='/banlist'
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
                              <CardBannedOnList
                                key={card.id}
                                name={card.id}
                                image={card.id}
                                card_name={card.name}
                                banlist_info={card.banlist_info}
                                list={banlistTitle}
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
