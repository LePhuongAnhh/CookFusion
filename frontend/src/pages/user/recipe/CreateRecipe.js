import styles from "./CreateRecipe.module.scss"
import classNames from 'classnames/bind'
import {
    apiUrl,
    ACCESS_TOKEN
} from "~/constants/constants";
import images from '~/assets/images'

//ngoài 
import { useDropzone } from 'react-dropzone';
import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet"

import axios from "axios";
const cx = classNames.bind(styles)
const CreateRecipe = ({ setShowCreateRecipeModal }) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const options = ["Cate 1", "Cate 2", "Cate 3"];
    const [selectedOption, setSelectedOption] = useState("");

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    // chon anh cho bìa
    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageClick = () => {
        const fileInput = document.getElementById('fileInput');
        fileInput.click();
    };
    const handleImageUpload = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setSelectedImage(URL.createObjectURL(selectedFile));
        }
    };

    //search nguyên liệu
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]); // Danh sách kết quả tìm kiếm

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
    };

    //chon ảnh hoặc videl cho các bước
    const [steps, setSteps] = useState([]);
    const [actionIndex, setActionIndex] = useState(null); // Track the index of the step being added or removed
    const maxSize = 10485760; // Dung lượng tối đa là 10 MB

    const onDropCook = (acceptedFiles, index) => {
        const file = acceptedFiles[0];
        if (file.type.startsWith('video/') && file.size > maxSize) {
            alert('Video quá lớn. Vui lòng chọn video có dung lượng nhỏ hơn 10MB.');
            return;
        }

        const updatedSteps = [...steps];
        updatedSteps[index] = { ...updatedSteps[index], cookFile: file };
        setSteps(updatedSteps);
        setActionIndex(index);
    };

    const handleRemoveCook = (index) => {
        const updatedSteps = [...steps];
        updatedSteps[index] = { ...updatedSteps[index], cookFile: null };
        setSteps(updatedSteps);
        setActionIndex(index);
    };

    const removeStep = (index) => {
        const updatedSteps = [...steps];
        updatedSteps.splice(index, 1);
        setSteps(updatedSteps);
        setActionIndex(index);
    };

    const addStep = (e) => {
        e.preventDefault();
        setSteps([...steps, { cookFile: null }]);
        setActionIndex(steps.length);
    };

    const { getRootProps: cookGetRootProps, getInputProps: cookGetInputProps } = useDropzone({
        onDrop: (acceptedFiles) => onDropCook(acceptedFiles, steps.length - 1),
        accept: 'image/*,video/*',
    });

    return (
        <div className={cx('modalDeleteIdea')}>
            <form className={cx('modalContentDeleteIdea')}>
                <div>
                    <div className={cx('createIdeaHeader')}>
                        <input
                            className={cx('modal_title')}
                            placeholder="Name recipe ... "
                        />
                        <button>Create</button>
                        <div className={cx('exit_cmt_modal')} onClick={() => setShowCreateRecipeModal(false)} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </div>
                    </div>
                    <div className={cx('body_modal')}>
                        <div className={cx('recipe_container')}>
                            <div className={cx('top_section')}>
                                <div className={cx('choose-image')}>
                                    {/* //hiẻn thị anh  */}
                                    {selectedImage ? (
                                        <img src={selectedImage} alt="Selected Image" />
                                    ) : (
                                        <div>
                                            <p className={cx('bi bi-plus-circle')}>No image selected</p>
                                        </div>
                                    )}
                                </div>
                                <div className={cx('recipe_info_wrapper')}>
                                    <div className={cx('recipe_time')}>
                                        <div className={cx('time_to_cook')}>
                                            <div className={cx('pre_content')}>
                                                <span className={cx('value_time')}>Category</span>
                                            </div>
                                            <select
                                                value={selectedOption}
                                                onChange={handleSelectChange}
                                            >
                                                <option value="">Select an option</option>
                                                {options.map((option, index) => (
                                                    <option key={index} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className={cx('meal_nutri_wrapper')}>
                                            <div className={cx('row_nutri')}>
                                                <textarea
                                                    className={cx('description')}
                                                    row={4}
                                                    placeholder="Description"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('function_wrapper')}>
                                        {/* //input ảnh */}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            id="fileInput"
                                            style={{ display: 'none' }}
                                            onChange={handleImageUpload}
                                        />
                                        <div
                                            id="imageContainer"
                                            className={cx('buttons')}
                                            onClick={handleImageClick}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16">
                                                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                                <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                                            </svg>
                                            <span className={cx('button_text')}>Image</span>
                                        </div>
                                        <div className={cx('buttons')}>
                                            <input
                                                min="1"
                                                type="number"
                                                placeholder="Serving"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('bottom_section')}>
                                <div className={cx('bottom_card')}>
                                    <h3 className={cx('column_title')}>Ingredients</h3>
                                    <div className={cx('left_column')}>
                                        <div className={cx('scale_tool')}>
                                            <div className="input-group rounded">
                                                <input
                                                    type="search"
                                                    className="form-control rounded"
                                                    style={{ fontSize: '14px' }}
                                                    placeholder="Search"
                                                    aria-label="Search"
                                                    aria-describedby="search-addon"
                                                    value={searchQuery}
                                                    onChange={handleSearchChange}
                                                />
                                                <span className="input-group-text border-0" id="search-addon">
                                                    <i className="bi bi-search-heart"></i>
                                                </span>
                                            </div>
                                        </div>
                                        {/* Hiển thị kết quả tìm kiếm */}
                                        {searchResults.length > 0 && (
                                            <div className="search-results">
                                                <ul>
                                                    {searchResults.map((result, index) => (
                                                        <li key={index}>{result}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className={cx('bottom_card')}>
                                    <h3 className={cx('column_title')}>Instructions</h3>
                                    <div className={cx('right_column')}>
                                        <div>
                                            {/* BƯỚC CHUẨN BỊ  */}
                                            <b> 1. Preparations
                                                <input
                                                    min="1"
                                                    type="number"
                                                    placeholder="Input time"
                                                />
                                                <br />
                                            </b>
                                            <textarea
                                                type="text"
                                                rows={5}
                                                placeholder="Input preparations .... "
                                            />

                                            {/* NẤU  */}
                                            <b>2. Cook
                                                <input
                                                    min="1"
                                                    type="number"
                                                    placeholder="Input time"
                                                />
                                                <br />
                                            </b>
                                            <div>
                                                {steps.map((step, index) => (
                                                    <div key={index}>
                                                        <textarea
                                                            type="text"
                                                            rows={4}
                                                            placeholder={`Input preparations for step ${index + 1} .... `}
                                                        />

                                                        <div className={cx("image-uploader")}>
                                                            <div {...cookGetRootProps()} className={cx("choose-image")}>
                                                                <input {...cookGetInputProps()} />
                                                                <div className={cx("choose-image-step")}>
                                                                    <p className="bi bi-plus-circle"> Choose image or video</p>
                                                                </div>
                                                            </div>
                                                            {step.cookFile && (
                                                                <div className={cx("selected-file")}>
                                                                    {step.cookFile.type.startsWith('image/') ? (
                                                                        <img src={URL.createObjectURL(step.cookFile)} alt="Selected File" />
                                                                    ) : step.cookFile.type.startsWith('video/') ? (
                                                                        <video width="320" height="240" controls>
                                                                            <source src={URL.createObjectURL(step.cookFile)} type={step.cookFile.type} />
                                                                        </video>
                                                                    ) : null}
                                                                    <button className={cx("remove-step")} onClick={() => handleRemoveCook(index)}>
                                                                        Remove Step {index + 1}
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                        {index > 0 && steps.length > 1 && (
                                                            <button onClick={() => removeStep(index)}>Remove Step {index + 1}</button>
                                                        )}
                                                    </div>
                                                ))}

                                                <div>
                                                    <button className={cx('add-step')} onClick={addStep}>
                                                        Add Step {steps.length + 1}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form >
        </div >
    )
}
export default CreateRecipe