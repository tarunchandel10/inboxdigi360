import { useState, useEffect } from 'react';
import FormCss from '../styles/form.module.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { CheckCircle, SlashCircle, XCircle } from 'react-bootstrap-icons';
import { Plus } from 'react-bootstrap-icons';
import { Baseurl } from './Baseurl';
import { getNewToken } from '@/pages/api/bulkUpload';

export default function CategoriesPopup({ onApply, dataSelected, isEdit, isAdded }) {
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [includedCategories, setIncludedCategories] = useState([]);
    const [excludedCategories, setExcludedCategories] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

   useEffect(()=>{
    if(dataSelected){
        const { included_assign_category_list, excluded_assign_category_list } = dataSelected;
        setIncludedCategories(included_assign_category_list)
        setExcludedCategories(excluded_assign_category_list)
    }
   },[dataSelected])


    useEffect(() => {
        const fetchSearchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token not found');
                }

                const response = await fetch(`${Baseurl}search-category-list?keyword=${searchQuery}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    getNewToken(data)
                    setCategories(data.data);
                } else {
                    throw new Error('Failed to fetch category data');
                }
            } catch (error) {
                console.error('Error fetching category data:', error);
                setCategories([]);
            }
        };

        fetchSearchData();
    }, [searchQuery]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token not found');
                }

                const response = await fetch(`${Baseurl}all-category-list`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
             
                if (response.ok) {
                    const data = await response.json();
                    getNewToken(data)
                    setCategories(data.data);
                } else {
                    throw new Error('Failed to fetch category data');
                }
            } catch (error) {
                console.error('Error fetching category data:', error);
                setCategories([]); // Set an empty array or handle the error state accordingly
            }
        };
        fetchData();
    }, [])

    const handleInclude = (item) => {
        const isAlreadyIncluded = includedCategories.some((i) => i.id === item.id);

        if (isAlreadyIncluded) {
            // Item is already included, so remove it
            const updatedIncluded = includedCategories.filter((i) => i.id !== item.id);
            setIncludedCategories(updatedIncluded);
        } else {
            // Item is not included, so add it
            setIncludedCategories([...includedCategories, item]);
        }

        // Remove it from excludedCategories
        const updatedExcluded = excludedCategories.filter((i) => i.id !== item.id);
        setExcludedCategories(updatedExcluded);
    };

    const handleExclude = (item) => {
        const isAlreadyExcluded = excludedCategories.some((i) => i.id === item.id);

        if (isAlreadyExcluded) {
            // Item is already excluded, so remove it
            const updatedExcluded = excludedCategories.filter((i) => i.id !== item.id);
            setExcludedCategories(updatedExcluded);
        } else {
            // Item is not excluded, so add it
            setExcludedCategories([...excludedCategories, item]);
        }

        // Remove it from includedCategories
        const updatedIncluded = includedCategories.filter((i) => i.id !== item.id);
        setIncludedCategories(updatedIncluded);
    };

    const handleRemoveIncluded = (item) => {
        const updatedIncluded = includedCategories.filter((i) => i.id !== item.id);
        setIncludedCategories(updatedIncluded);
    };

    // Function to handle removal from excludedCategories
    const handleRemoveExcluded = (item) => {
        const updatedExcluded = excludedCategories.filter((i) => i.id !== item.id);
        setExcludedCategories(updatedExcluded);
    };

    const handleApply = () => {
        // Extracting only the ids from includedCategories and excludedCategories

        const includedIds = includedCategories.map(item => ({ id: item.id, name: item.name }));
        const excludedIds = excludedCategories.map(item => ({ id: item.id, name: item.name }));

        // Creating the data object to be sent to the parent component
        const dataToSend = {
            included_assign_category_list: includedIds,
            excluded_assign_category_list: excludedIds,
        };
        onApply(dataToSend);
        handleClose();
    };
    return (
        <>



            {isAdded ? <button className="addedButton">Added</button> :
                isEdit ? <Button onClick={handleShow} className={`${FormCss.edit_tag}`} ><img src="/images/edit.svg" alt="" /></Button> : <span onClick={handleShow} className={`${FormCss.edit_tags}`} ><Plus /></span>}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className={`${FormCss.brandsafety_popup}`}
            >
                <Modal.Header className={`${FormCss.modal_header}`}>
                    <Modal.Title className={`${FormCss.modal_title}`}>Categories</Modal.Title>
                    <button type="button" className={`${FormCss.cross_btn}`} onClick={handleClose}>✕</button>
                </Modal.Header>
                <Modal.Body className={`${FormCss.modal_body}`} alwaysopen>
                    <div className={`${FormCss.cat_popup}`} >
                        <div className="row">
                            <div className="col-md-8">
                                <div className={`${FormCss.language_innerbox}`}>
                                    <div className={`${FormCss.language_search}`}>
                                        <input type="search" name="search" id="search" className="pac-target-input" placeholder="Search for categories to include or exclude" value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)} />
                                    </div>
                                    <div className={`${FormCss.languages_box}`}>
                                        {categories.map((item, index) => (
                                            <div className={`${FormCss.languages_feild}`} key={index}>
                                                {item.name}
                                                <div className={`${FormCss.languages_btns}`}>
                                                    <Button onClick={() => handleInclude(item)}
                                                        className={`include_btn  ${includedCategories.some(lang => lang.id === item.id) ? 'clicked-btn' : ''} `}>
                                                        <CheckCircle />
                                                    </Button>
                                                    <Button onClick={() => handleExclude(item, index)}
                                                        className={`exclude_btn ${excludedCategories.some(lang => lang.id === item.id) ? 'clicked-btn' : ''} `}>
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
                                        <p>{includedCategories.length + excludedCategories.length} Selected</p>
                                        {/* <Button onClick={handleClearAll}>Clear All</Button> */}
                                    </div>
                                    <div className={`${FormCss.selection_header}`}>
                                        <p>All Categories are currently included</p>
                                    </div>

                                    <div className={`${FormCss.selection_lang}`}>
                                        {includedCategories.map((item, index) => (
                                            <div className={`${FormCss.selected_language}`} key={index}>
                                                <p>{item.name}</p>
                                                <Button onClick={() => handleRemoveIncluded(item)}>
                                                    <XCircle />
                                                </Button>
                                            </div>
                                        ))
                                        }
                                    </div>

                                    <div className={`${FormCss.selection_header}`}>
                                        <p>All Categories are currently excluded</p>
                                    </div>
                                    <div className={`${FormCss.selection_lang}`}>
                                        {excludedCategories.map((item, index) => (
                                            <div className={`${FormCss.selected_language}`} key={index}>
                                                <p>{item.name}</p>
                                                <Button onClick={() => handleRemoveExcluded(item)}>
                                                    <XCircle />
                                                </Button>
                                            </div>
                                        ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer className={`${FormCss.modal_footer}`}>
                    <div className={`${FormCss.feilds_btns}`}>
                        <Button type="submit" className={`${FormCss.create_btn}`} onClick={handleApply}>Apply</Button>
                        <Button className={`${FormCss.cancel_btn}`} onClick={handleClose}>Cancel</Button>
                    </div>
                </Modal.Footer>
            </Modal>


        </>
    )
}