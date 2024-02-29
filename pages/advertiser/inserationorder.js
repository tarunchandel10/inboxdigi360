import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import FormCss from '../../styles/form.module.css';
import NewCss from '../../styles/newform.module.css';
import { useCreativeContext } from '@/component/CreativeProvider';
import { Baseurl } from '@/component/Baseurl';
import withAuth from '@/component/withAuth';
import { getNewToken } from '../api/bulkUpload';
function InserationOrder() {
  const [Creative, setCreative] = useState('');
  const [insertionList, setInsertionList] = useState([]);
  const { setSelectedCreative } = useCreativeContext();
  const [selectedInsertion, setSelectedInsertion] = useState('');
  const router = useRouter();
  const { campaign_id, campaign_insertion_id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token && campaign_id) {
          const response = await fetch(`${Baseurl}view-campaign?campaign_id=${campaign_id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
              // Other headers as needed
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const data = await response.json();
          getNewToken(data)
          const dataVal = data.data[0];
          setCreative(dataVal.creative_types)

        }
      } catch (error) {
        console.error('Error fetching campaign data:', error);
        // Handle errors if necessary
      }
    };

    fetchData();
  }, [campaign_id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token && campaign_id) {
          const response = await fetch(`${Baseurl}campaign-insertion-order-list?campaign_id=${campaign_id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            getNewToken(data)
            setInsertionList(data.data)

          } else {
            throw new Error('Failed to fetch data');
          }

        }
      } catch (error) {
        console.error('Error fetching campaign data:', error);
      }
    };

    fetchData();

  }, [campaign_id]);

  useEffect(() => {
    campaign_id && selectedInsertion && setSelectedInsertion(selectedInsertion);
  }, [selectedInsertion, campaign_id])

  function handleSelectInsertion(e) {
    setSelectedInsertion(e.target.value);
  }
  const handleRadioClick = (creativeType) => {
    setSelectedCreative(creativeType); router.push({
      pathname: '/advertiser/create-insertion-line-item', // Replace with your lineitemform page path
      query: {
        campaign_id: campaign_id,
        campaign_insertion_id: campaign_insertion_id,
      },
    });
  };

  const handleCancel = () => {
    router.push(`/advertiser/dashboard`);
  }

  return (
    <>

      <div className={`${FormCss.top_bar}`}>
        <div className={`${FormCss.container} container`}>
          <div className={`${FormCss.form_title}`}>
            <button type="button" onClick={handleCancel}><img src="../images/cancel.svg" alt="" /></button>
            <h4>Select an insertion order for the line item</h4>
          </div>
        </div>
      </div>

      <div className={`${FormCss.form_page}`}>
        <div className={`${FormCss.container} container`}>
          <div className={`${FormCss.form_box}`}>
            <form>
              <div className={`${NewCss.inseration_form_feilds}`}>

                <select
                  name=""
                  id=""
                  className={`${NewCss.select_line}`}
                  value={selectedInsertion}
                  onChange={handleSelectInsertion}
                >
                  {insertionList.map((insertion) => (
                    <option key={insertion.id} value={insertion.id}>
                      {insertion.name}
                    </option>
                  ))}
                </select>

              </div>

              <div className={`${NewCss.inseration_radio_box}`}>
                {Creative === "Display" ? <div className={`${NewCss.inseration_radio}`}>
                  <input type="radio" name="inseration_radio" id="display" onClick={() => handleRadioClick('Display')} />
                  <label htmlFor="display">
                    <img src="/images/display.jpg" alt="" />
                    <h4>Display</h4>
                    <p>Image, HTML5 (including rich media) and native ads (both display and video)</p>
                  </label>
                </div>
                  : Creative === "Video" ?
                    <div className={`${NewCss.inseration_radio}`}>
                      <input type="radio" name="inseration_radio" id="video" onClick={() => handleRadioClick('Video')} />
                      <label htmlFor="video">
                        <img src="/images/video.jpg" alt="" />
                        <h4>Video</h4>
                        <p>Video ads sold on a CPM basis foe a variety of environments</p>
                      </label>
                    </div>
                    : Creative === "Audio" ?
                      <div className={`${NewCss.inseration_radio}`}>
                        <input type="radio" name="inseration_radio" id="audio" onClick={() => handleRadioClick('Audio')} />
                        <label htmlFor="audio">
                          <img src="/images/audio.jpg" alt="" />
                          <h4>Audio</h4>
                          <p>Audio ads sold on a CPM basis foe a variety of environments</p>
                        </label>
                      </div>
                      : Creative === "YouTube" ?
                        <div className={`${NewCss.inseration_radio}`}>
                          <input type="radio" name="inseration_radio" id="ytvideo" onClick={() => handleRadioClick('Youtube')} />
                          <label htmlFor="ytvideo">
                            <img src="/images/ytvideo.jpg" alt="" />
                            <h4>YouTube & Partners Video</h4>
                            <p>Video ads on YouTube and partners</p>
                          </label>
                        </div>
                        : Creative === "Native" ?
                          <div className={`${NewCss.inseration_radio}`}>
                            <input type="radio" name="inseration_radio" id="ytaudio" onClick={() => handleRadioClick('Native')} />
                            <label htmlFor="ytaudio">
                              <img src="/images/ytaudio.jpg" alt="" />
                              <h4>YouTube & Partners Audio</h4>
                              <p>Audio ads on YouTube and partners</p>
                            </label>
                          </div> : ""}
              </div>
            </form>
          </div >
        </div >
      </div >

    </>
  )
}
export default withAuth(InserationOrder);