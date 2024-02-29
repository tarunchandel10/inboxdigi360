import { useState, useEffect } from 'react';
import FormCss from '../styles/form.module.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { CheckCircle, SlashCircle, XCircle } from 'react-bootstrap-icons';
import { Plus } from 'react-bootstrap-icons';

export default function AppsURLPopup({ onApply, isEdit, dataSelected, isAdded }) {
    const [selectIncludeApps, setSelectIncludeApps] = useState([]);
    const [selectExcludeApps, setSelectExcludeApps] = useState([]);
    const [inputText, setInputText] = useState('');
    const [show, setShow] = useState(false);
    const [error, setError] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (dataSelected && Array.isArray(dataSelected)) {
            const includeApps = dataSelected.filter(item => item.type === 'include').map(item => {
                const url = item.url_address.trim().replace(/^https?:\/\//, ''); // Remove 'https://' if present
                return url;
            });
            const excludeApps = dataSelected.filter(item => item.type === 'exclude').map(item => {
                const url = item.url_address.trim().replace(/^https?:\/\//, ''); // Remove 'https://' if present
                return url;
            });
            setSelectIncludeApps(includeApps);
            setSelectExcludeApps(excludeApps);
        }
    }, [dataSelected]);

    const handleInclude = () => {
        setError("")
        if (inputText.trim() !== '') {
            const urls = inputText.split(/\s*,\s*|\s*\n\s*/);
            urls.forEach(url => {
                const isValidURL = /^www\..+\.\w+$/.test(url.trim());
                if (isValidURL && !selectIncludeApps.includes(url)) {
                    setSelectIncludeApps(prevIncludeApps => [...prevIncludeApps, url]);
                } else {
                    setError(`URL '${url}' already exists in the Include list`);
                }
            });
            setInputText('');
        }
    };

    const handleExclude = () => {
        setError("")
        if (inputText.trim() !== '') {
            const urls = inputText.split(/\s*,\s*|\s*\n\s*/);
            urls.forEach(url => {
                const isValidURL = /^www\..+\.\w+$/.test(url.trim());
                if (isValidURL && !selectExcludeApps.includes(url)) {
                    setSelectExcludeApps(prevExcludeApps => [...prevExcludeApps, url]);
                } else {
                    setError(`URL '${url}' already exists in the Include list`);
                }
            });
            setInputText('');
        }
    };

    const handleApplyClick = () => {
        const selectedData = [];
        selectIncludeApps.forEach(url => {
            selectedData.push({
                url_address: `https://${url}`,
                type: 'include'
            });
        });
        selectExcludeApps.forEach(url => {
            selectedData.push({
                url_address: `https://${url}`,
                type: 'exclude'
            });
        });
        onApply(selectedData);
        handleClose();
    };

    const handleClearAll = () => {
        setSelectIncludeApps([]);
        setSelectExcludeApps([]);
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
                    <Modal.Title className={`${FormCss.modal_title}`}>Add multiple apps and URLs at once</Modal.Title>
                    <button type="button" className={`${FormCss.cross_btn}`} onClick={handleClose}>✕</button>
                </Modal.Header>
                <Modal.Body className={`${FormCss.modal_body}`} alwaysopen>
                    <div className={`${FormCss.apps_popup}`} >
                        <div className="row">
                            <div className="col-md-8">
                                <div className={`${FormCss.apps_popup_feilds}`}>
                                    <div className={`${FormCss.keyfeilds}`}>
                                        <textarea
                                            id="keywords"
                                            name="keywords"
                                            type="textarea"
                                            placeholder="Enter a list of keywords to exclude, either one item to a line or separated by commas."
                                            value={inputText}
                                            onChange={(e) => setInputText(e.target.value)}
                                        />
                                    </div>
                                    {error ? <p className="text-danger ">{error}</p> : ""}

                                    <div className={`${FormCss.languages_btns}`}>

                                        <Button onClick={handleInclude} className={`${FormCss.include_btn}`}>
                                            <CheckCircle />
                                            Include
                                        </Button>
                                        <Button onClick={handleExclude} className={`${FormCss.exclude_btn}`}>
                                            <SlashCircle />
                                            Exclude
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className={`${FormCss.language_innerbox}`}>
                                    <div className={`${FormCss.selected_lang_header}`}>
                                        <p>{selectIncludeApps.length + selectExcludeApps.length} Selected</p>
                                        <Button onClick={handleClearAll}>Clear All</Button>
                                    </div>
                                    <div className={`${FormCss.selection_header}`}>
                                        <p>All Apps and Urls are currently included</p>
                                    </div>
                                    <div className={`${FormCss.selection_lang}`}>
                                        {selectIncludeApps.map((item, index) => (
                                            <div className={`${FormCss.selected_language}`} key={index}>
                                                <p>{item}</p>
                                                <Button onClick={() => setSelectIncludeApps(prevIncludeApps => prevIncludeApps.filter((_, i) => i !== index))}>
                                                    <XCircle />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className={`${FormCss.selection_header}`}>
                                        <p>All Apps and Urls are currently excluded</p>
                                    </div>
                                    <div className={`${FormCss.selection_lang}`}>
                                        {selectExcludeApps.map((item, index) => (
                                            <div className={`${FormCss.selected_language}`} key={index}>
                                                <p>{item}</p>
                                                <Button onClick={() => setSelectExcludeApps(prevExcludeApps => prevExcludeApps.filter((_, i) => i !== index))}>
                                                    <XCircle />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className={`${FormCss.modal_footer}`}>

                    <div className={`${FormCss.feilds_btns}`}>
                        <Button type="submit" className={`${FormCss.create_btn}`} onClick={handleApplyClick}>Apply</Button>
                        <Button className={`${FormCss.cancel_btn}`} onClick={handleClose}>Cancel</Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}