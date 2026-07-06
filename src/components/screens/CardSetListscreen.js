import React from 'react'
import { YGO_CARDSET, YGO_IMG_SET, YGO_PIC } from '../../helpers/constants';
import { useCard } from '../../hooks/useCard';
import { Loading } from '../common/Loading';
import { ReturnButton } from '../common/ReturnButton';
import { Title } from '../common/Title';

export const CardSetListscreen = () => {

  const { loading, data } = useCard(`${YGO_CARDSET}`);
  const cardSet = !!data && data;

  return (
    <>
      <div className='row mt-3 align-items-center mb-3'>
        <div className='col-sm-8'>
          <Title value='All Card Set Packages' />
        </div>
        <div className="col-sm-4">
          <ReturnButton value="Return" />
        </div>
      </div>
      
      {
        loading
          ?
          (
            <Loading />
          )
          :
          (
            <>
              <div className="row mt-3 animate__animated animate__fadeIn">

                {
                  cardSet.map(set => (
                    <div key={Math.random()} className="col-sm-4 mb-2 mt-2 align-items-center zoom-effect-1-01">
                      <div className='shadow rounded'>
                        <div className='p-3' >
                          <h6 className='text-center'>{set.set_name}</h6>
                          <hr />
                          <div className='row mt-3 mb-3 align-items-center' style={{ minHeight: "230px" }}>
                            <div className='col-sm-1'></div>
                            <div className='col-sm-4'>
                              <a className="" href={`/cardset?q=${set.set_name.replace(" ", "%20").replace("&", "%26")}`}>
                                <img
                                  src={`${YGO_IMG_SET}${(set.set_code).split("-")[0]}.jpg`}
                                  alt={set.set_name}
                                  style={{
                                    width: "100%"
                                  }}
                                  className="shadow rounded"
                                  onError={({ currentTarget }) => {
                                    currentTarget.onerror = null;
                                    currentTarget.src = `${YGO_PIC}back_high.jpg`;
                                  }}
                                />
                              </a>
                            </div>
                            <div className='col-sm-7 text-justify align-items-center'>
                              <span><strong>Code: </strong></span> <span>{set.set_code}</span><br />
                              <span><strong>TCG Date: </strong></span> <span>{set.tcg_date}</span><br />
                              <span><strong>Number of Cards: </strong></span> <span>{`${set.num_of_cards}`}</span><br />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  ))
                }

              </div>
            </>

          )
      }
    </>
  )
}
