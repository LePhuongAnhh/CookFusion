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
const CookingStep = ({ stepNumber, file, onRemoveFile, onFileChange }) => {
    return (
        <div>
            <textarea
                type="text"
                rows={5}
                placeholder={`Input step ${stepNumber} ...`}
            />
            <div className="image-uploader">
                <div className="choose-image">
                    <input type="file" onChange={(e) => onFileChange(e, stepNumber)} />
                    <div className="choose-image-step">
                        <p className="bi bi-plus-circle"> Choose image or video</p>
                    </div>
                </div>
                {file && (
                    <div className="selected-file">
                        {file.type.startsWith('image/') ? (
                            <img src={URL.createObjectURL(file)} alt="Selected File" />
                        ) : file.type.startsWith('video/') ? (
                            <video width="320" height="240" controls>
                                <source src={URL.createObjectURL(file)} type={file.type} />
                            </video>
                        ) : null}
                        <button className="remove-file" onClick={() => onRemoveFile(stepNumber)}>
                            Remove
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
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
    const [preparationsFile, setPreparationsFile] = useState(null);
    const [cookFile, setCookFile] = useState(null);
    const [resultFile, setResultFile] = useState(null);
    const maxSize = 10485760; // Dung lượng tối đa là 10 MB

    const onDropPreparations = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file.type.startsWith('video/') && file.size > maxSize) {
            alert('Video quá lớn. Vui lòng chọn video có dung lượng nhỏ hơn 10MB.');
            return;
        }
        setPreparationsFile(file);
    };

    const onDropCook = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file.type.startsWith('video/') && file.size > maxSize) {
            alert('Video quá lớn. Vui lòng chọn video có dung lượng nhỏ hơn 10MB.');
            return;
        }
        setCookFile(file);
    };

    const onDropResult = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file.type.startsWith('video/') && file.size > maxSize) {
            alert('Video quá lớn. Vui lòng chọn video có dung lượng nhỏ hơn 10MB.');
            return;
        }
        setResultFile(file);
    };

    const { getRootProps: preparationsGetRootProps, getInputProps: preparationsGetInputProps } = useDropzone({
        onDrop: onDropPreparations,
        accept: 'image/*,video/*',
    });

    const { getRootProps: cookGetRootProps, getInputProps: cookGetInputProps } = useDropzone({
        onDrop: onDropCook,
        accept: 'image/*,video/*',
    });

    const { getRootProps: resultGetRootProps, getInputProps: resultGetInputProps } = useDropzone({
        onDrop: onDropResult,
        accept: 'image/*,video/*',
    });

    const handleRemovePreparations = () => {
        setPreparationsFile(null);
    };

    const handleRemoveCook = () => {
        setCookFile(null);
    };

    const handleRemoveResult = () => {
        setResultFile(null);
    };

    //nhập các step cho khâu nấu
    const [steps, setSteps] = useState([]);
    const handleStepChange = (index, value) => {
        // Cập nhật giá trị của bước tại chỉ số index
        const newSteps = [...steps];
        newSteps[index] = value;
        setSteps(newSteps);
    };
    const handleAddStep = (e) => {
        e.preventDefault();
        setSteps([...steps, '']);
    };
    const handleRemoveStep = (index) => {
        const newSteps = [...steps];
        newSteps.splice(index, 1);
        setSteps(newSteps);
    };



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
                                            <div className={cx("image-uploader")}>
                                                <div {...preparationsGetRootProps()} className="choose-image">
                                                    <input {...preparationsGetInputProps()} />
                                                    <div className={cx("choose-image-step")}>
                                                        <p className="bi bi-plus-circle"> Choose image or video</p>
                                                    </div>
                                                </div>
                                                {preparationsFile && (
                                                    <div className={cx("selected-file")}>
                                                        {preparationsFile.type.startsWith('image/') ? (
                                                            <img src={URL.createObjectURL(preparationsFile)} alt="Selected File" />
                                                        ) : preparationsFile.type.startsWith('video/') ? (
                                                            <video width="320" height="240" controls>
                                                                <source src={URL.createObjectURL(preparationsFile)} type={preparationsFile.type} />
                                                            </video>
                                                        ) : null}
                                                        <button className={cx("remove-file")} onClick={handleRemovePreparations}>
                                                            Remove
                                                        </button>
                                                    </div>
                                                )}
                                            </div>

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
                                                            rows={5}
                                                            placeholder="Input step..."
                                                            value={step}
                                                            onChange={(e) => handleStepChange(index, e.target.value)}
                                                        />
                                                        <button className={cx('add-step')} onClick={() => handleRemoveStep(index)}>Remove Step</button>
                                                    </div>
                                                ))}
                                                <button className={cx('add-step')} onClick={(e) => handleAddStep(e)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brush" viewBox="0 0 16 16">
                                                        <path d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.067 6.067 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.118 8.118 0 0 1-3.078.132 3.659 3.659 0 0 1-.562-.135 1.382 1.382 0 0 1-.466-.247.714.714 0 0 1-.204-.288.622.622 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896.126.007.243.025.348.048.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04zM4.705 11.912a1.23 1.23 0 0 0-.419-.1c-.246-.013-.573.05-.879.479-.197.275-.355.532-.5.777l-.105.177c-.106.181-.213.362-.32.528a3.39 3.39 0 0 1-.76.861c.69.112 1.736.111 2.657-.12.559-.139.843-.569.993-1.06a3.122 3.122 0 0 0 .126-.75l-.793-.792zm1.44.026c.12-.04.277-.1.458-.183a5.068 5.068 0 0 0 1.535-1.1c1.9-1.996 4.412-5.57 6.052-8.631-2.59 1.927-5.566 4.66-7.302 6.792-.442.543-.795 1.243-1.042 1.826-.121.288-.214.54-.275.72v.001l.575.575zm-4.973 3.04.007-.005a.031.031 0 0 1-.007.004zm3.582-3.043.002.001h-.002z" />
                                                    </svg>
                                                    &nbsp; Add Step
                                                </button>
                                            </div>
                                            <div className={cx("image-uploader")}>
                                                <div {...cookGetRootProps()} className="choose-image">
                                                    <input {...cookGetInputProps()} />
                                                    <div className="choose-image-step">
                                                        <p className="bi bi-plus-circle"> Choose image or video</p>
                                                    </div>
                                                </div>
                                                {cookFile && (
                                                    <div className={cx("selected-file")}>
                                                        {cookFile.type.startsWith('image/') ? (
                                                            <img src={URL.createObjectURL(cookFile)} alt="Selected File" />
                                                        ) : cookFile.type.startsWith('video/') ? (
                                                            <video width="320" height="240" controls>
                                                                <source src={URL.createObjectURL(cookFile)} type={cookFile.type} />
                                                            </video>
                                                        ) : null}
                                                        <button className={cx("remove-file")} onClick={handleRemoveCook}>
                                                            Remove
                                                        </button>
                                                    </div>
                                                )}
                                            </div>

                                            {/* THÀNH QUẢ  */}
                                            <b>3. Product
                                            </b>
                                            <textarea
                                                type="text"
                                                rows={5}
                                                placeholder="Result  "
                                            />
                                            <div className={cx("image-uploader")}>
                                                <div {...resultGetRootProps()} className="choose-image">
                                                    <input {...resultGetInputProps()} />
                                                    <div className="choose-image-step">
                                                        <p className="bi bi-plus-circle"> Choose image or video</p>
                                                    </div>
                                                </div>
                                                {resultFile && (
                                                    <div className={cx("selected-file")}>
                                                        {resultFile.type.startsWith('image/') ? (
                                                            <img src={URL.createObjectURL(resultFile)} alt="Selected File" />
                                                        ) : resultFile.type.startsWith('video/') ? (
                                                            <video width="320" height="240" controls>
                                                                <source src={URL.createObjectURL(resultFile)} type={resultFile.type} />
                                                            </video>
                                                        ) : null}
                                                        <button className={cx("remove-file")} onClick={handleRemoveResult}>
                                                            Remove
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default CreateRecipe