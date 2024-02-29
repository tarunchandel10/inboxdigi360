import { useState,useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import FormCss from '../styles/form.module.css';
import Button from 'react-bootstrap/Button';
import { CheckCircle, SlashCircle, XCircle } from 'react-bootstrap-icons';
import { Baseurl } from './Baseurl';
import { Plus } from 'react-bootstrap-icons';
import { getNewToken } from '@/pages/api/bulkUpload';
export default function BrowserPopup({ onApply,isEdit,dataSelected,isAdded }) {
    const [languages, setLanguages] = useState([]);
      const [selectIncludeLang, setSelectIncludeLang] = useState([]);
      const [selectExcludeLang, setSelectExcludeLang] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const findLanguageByName = (name) => {
            return languages.find(language => language.name === name);
        };
    
        if (dataSelected && Array.isArray(dataSelected) && dataSelected.length > 0 && languages.length > 0) {
            const includeLanguages = dataSelected.filter(item => item.type === 'include').map(item => findLanguageByName(item.name));
            const excludeLanguages = dataSelected.filter(item => item.type === 'exclude').map(item => findLanguageByName(item.name));
            
            setSelectIncludeLang(includeLanguages);
            setSelectExcludeLang(excludeLanguages);
        }
    }, [dataSelected, languages]);

    const fetchLanguageData = async () => {
    
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token not found');
            }
    
            const response = await fetch(`${Baseurl}all-browser-list`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.ok) {
                const data = await response.json();
                getNewToken(data)
                setLanguages(data.data);
            } else {
                throw new Error('Failed to fetch all language data');
            }
        } catch (error) {
            console.error('Error fetching all language data:', error);
            setLanguages([]); // Set an empty array or handle the error state accordingly
        }
    };
    
    // Function to fetch language based on search keyword
    const searchLanguage = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token not found');
            }
    
            const response = await fetch(`${Baseurl}search-browser-list?keyword=${searchKeyword}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.ok) {
                const data = await response.json();
                getNewToken(data)
                setLanguages(data.data);
            } else {
                throw new Error('Failed to fetch language data based on search');
            }
        } catch (error) {
            console.error('Error fetching language data based on search:', error);
            setLanguages([]); // Set an empty array or handle the error state accordingly
        }
    };
    
    useEffect(() => {
        // Fetch all language initially
        fetchLanguageData();
    }, []);
    
    useEffect(() => {
        // Fetch language based on search keyword when it changes
        if (searchKeyword.trim() !== '') {
            searchLanguage();
        } else {
            // If search keyword is empty, fetch all language
            fetchLanguageData();
        }
    }, [searchKeyword]);

    const handleInclude = (language, index) => {
        const updatedSelected = [...selectIncludeLang];
        const languageId = language.id;
        const languageIndex = updatedSelected.findIndex(lang => lang.id === languageId);
    
        if (languageIndex !== -1) {
            // If already selected, remove it
            updatedSelected.splice(languageIndex, 1);
        } else {
            // If not selected, add it
            updatedSelected.push(language);
        }
    
        setSelectIncludeLang(updatedSelected);
    };
    
    const handleExclude = (language, index) => {
        const updatedSelected = [...selectExcludeLang];
        const languageId = language.id;
        const languageIndex = updatedSelected.findIndex(lang => lang.id === languageId);
    
        if (languageIndex !== -1) {
            // If already selected, remove it
            updatedSelected.splice(languageIndex, 1);
        } else {
            // If not selected, add it
            updatedSelected.push(language);
        }
    
        setSelectExcludeLang(updatedSelected);
    };

    
    const handleApplyClick = () => {
        let selectedData = [];
    
        if (selectIncludeLang.length > 0) {
            selectedData = selectIncludeLang.map(item => ({
                id:item.id,
                name: item.name,
                type: 'include'
            }));
        } else if (selectExcludeLang.length > 0) {
            selectedData = selectExcludeLang.map(item => ({
                id:item.id,
                name: item.name,
                type: 'exclude'
            }));
        }

        // Send the selected data back to the parent component
        onApply(selectedData);
        handleClose(); // Close the modal or perform other actions as needed
    };

    const handleClearAll = () => {
        setSelectIncludeLang([]);
        setSelectExcludeLang([]);
    };
   
    return (
        <>
{isAdded ?<button className="addedButton">Added</button>:
            isEdit ?<Button onClick={handleShow} className={`${FormCss.edit_tag}`} ><img src="/images/edit.svg" alt="" /></Button>:<span onClick={handleShow} className={`${FormCss.edit_tags}`} ><Plus/></span>}
          
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className={`${FormCss.language_popup} langPopup`}
            >
                <Modal.Header className={`${FormCss.modal_header}`}>
                    <Modal.Title className={`${FormCss.modal_title}`}>Browser</Modal.Title>
                    <button type="button" className={`${FormCss.cross_btn}`} onClick={handleClose}>✕</button>
                </Modal.Header>

                <Modal.Body className={`${FormCss.modal_body}`}>
                    <div className="row">
                        <div className="col-md-8">
                            <div className={`${FormCss.language_innerbox}`}>
                                <div className={`${FormCss.language_search}`}>
                                    <input type="search" name="search" id="search" className="pac-target-input" placeholder="Search for carrier  to include or exclude"  onChange={(e)=>setSearchKeyword(e.target.value)} />
                                </div>
                                <div className={`${FormCss.languages_box}`}>
                                {languages.map((item, index) => (
                    <div className={`${FormCss.languages_feild}`} key={index}>
                        {item.name}
                        <div className={`${FormCss.languages_btns}`}>
                            <Button
                                onClick={() => handleInclude(item, index)}
                                className={`include_btn  ${selectIncludeLang.some(lang => lang.id === item.id) ? 'clicked-btn' : ''} ${ selectIncludeLang.length>0 ? "active-btn" : ""}
                                ${selectExcludeLang.length>0 ? "disable-btn":""}
                                `}
                                
                            >
                                <CheckCircle />
                            </Button>
                            <Button
                                onClick={() => handleExclude(item, index)}
                                className={`exclude_btn ${selectIncludeLang.length>0 ? "disable-btn":""}
                                ${selectExcludeLang.some(lang => lang.id === item.id)  ? 'clicked-btn' : ""} ${ selectExcludeLang.length>0 ? "active-btn" : ""}
                                `}
                               
                            >
                                <SlashCircle />
                            </Button>
                        </div>
                    </div>
                ))}
                                  
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className={`${FormCss.language_innerbox}`}>
                                <div className={`${FormCss.selected_lang_header}`}>
                                    <p>{selectIncludeLang.length + selectExcludeLang.length} Selected</p>
                                    <Button onClick={handleClearAll}>Clear All</Button>
                                </div>
                                <div className={`${FormCss.selection_header}`}>
                                    <p>All languages are currently {selectExcludeLang.length > 0? "excluded": "included"}</p>
                                </div>
                                <div className={`${FormCss.selection_lang}`}>
                                {selectIncludeLang.length > 0 ? selectIncludeLang.map((item,index) => (
                                    <div className={`${FormCss.selected_language}`} key={index}>
                                        <p>{item.name}</p>
                                        <Button onClick={() => handleInclude(item,index)}>
                                            <XCircle />
                                        </Button>
                                    </div>
                                    
                                    
                                )):
                                selectExcludeLang.map((item,index) => (
                                    <div className={`${FormCss.selected_language}`} key={index}>
                                        <p>{item.name}</p>
                                        <Button onClick={() => handleExclude(item,index)}>
                                            <XCircle />
                                        </Button>
                                    </div>
                                    
                                    
                                ))

                            }
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer className={`${FormCss.modal_footer}`}>
                    <div className={`${FormCss.inner_titles}`}>
                        <p><img src="/images/setting.svg" alt="" /> These settings don’t impact serving.</p>
                    </div>
                    <div className={`${FormCss.feilds_btns}`}>
                        <Button type="submit" className={`${FormCss.create_btn}`} onClick={handleApplyClick}>Apply</Button>
                        <Button className={`${FormCss.cancel_btn}`} onClick={handleClose}>Cancel</Button>
                    </div>
                </Modal.Footer>
            </Modal>


        </>
    )
}