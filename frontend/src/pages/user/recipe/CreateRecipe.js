import styles from "./CreateRecipe.module.scss"
import classNames from 'classnames/bind'
import {
    apiUrl,
    ACCESS_TOKEN,
    PROFILE_INFORMATION
} from "~/constants/constants";
import images from '~/assets/images'

//ngoài 
import { useDropzone } from 'react-dropzone';
import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from "react-helmet"
import { io } from 'socket.io-client'
import axios from "axios";

const socket = io('http://localhost:9996/', { transports: ['websocket'] })
const cx = classNames.bind(styles)
const CreateRecipe = ({ setShowCreateRecipeModal }) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const profileInformation = JSON.parse(localStorage.getItem(PROFILE_INFORMATION));
    const User_id = profileInformation._id

    //CATEGORY
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    //CATEGORY CUA INGR, TÌM KIẾM 
    //xoá nguyên liệu sau khi lấy nó ra từ
    const searchInputRef = useRef(null);
    const [categoriesData, setCategoriesData] = useState([]);
    const [searchResults, setSearchResults] = useState([]);


    const [searchTerm, setSearchTerm] = useState('');

    const [selectedCategoryIngr, setSelectedCategoryIngr] = useState(null);
    const [categorySelected, setCategorySelected] = useState(false);
    const [selectedIngredient, setSelectedIngredient] = useState(null);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [inputQuantitative, setInputQuantitative] = useState(1);


    //hiện placeholder
    const [inputPlaceholder, setInputPlaceholder] = useState("Search category of ingredient");
    useEffect(() => {
        if (categorySelected) {
            setInputPlaceholder(`Search ingredients of ${selectedCategoryIngr}...`);
        } else {
            setInputPlaceholder("Search category of ingredient");
        }
    }, [categorySelected, selectedCategoryIngr]);


    const handleSearchChange = (event) => {
        const term = event.target.value;
        console.log(term)
        setSearchTerm(term);
        if (selectedCategoryIngr && categorySelected) {
            socket.emit('searchfood', { _id: User_id, keyword: term, category: selectedCategoryIngr })
        }
    };

    const handleCategorySelect = (category) => {
        setSelectedCategoryIngr(category);
        setCategorySelected(true);
        setSearchTerm('');
        setSearchResults([]);
        // Focus vào ô search khi chọn category
        searchInputRef.current.focus();
    };

    const handleIngredientSelect = (ingredient) => {
        console.log('Selected Ingredient:', ingredient);
        // const inputQuantitative = document.getElementById(`quantity-${ingredient.name}`).value;
        console.log('Input Quantitative:', inputQuantitative);

        let ingre = { name: ingredient.name, quantitative: inputQuantitative, quantitativeUnit: 'grams' };
        setSelectedIngredient(ingre);
        setSelectedIngredients([...selectedIngredients, ingre]);
        setSearchTerm('');
        setSearchResults([]);

        // Reset state để kết thúc quá trình tìm kiếm và bắt đầu một tìm kiếm mới
        setSearchTerm('');
        setSearchResults([]);
        setSelectedCategoryIngr(null);
        setCategorySelected(false);
    };




    const performIngredientSearch = (term, ingredients) => {
        return ingredients.filter(ingredient =>
            ingredient.name.toLowerCase().includes(term.toLowerCase())
        );
    };

    // hiện kết ủa search cate
    const limitedCategoryResults = searchTerm
        ? categoriesData
            .filter(cat => cat.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .slice(0, 5)
        : [];

    const limitedIngredientResults = (searchResults.length > 5) ? searchResults.slice(0, 5) : searchResults;


    //xóa ingredient đc chọn
    const handleRemoveIngredient = (ingredientToRemove) => {
        const updatedIngredients = selectedIngredients.filter(
            (ingredient) => ingredient.id !== ingredientToRemove.id
        );
        setSelectedIngredients(updatedIngredients);
    };

    //hết



    // chon anh cho bìa
    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageClick = () => {
        const fileInput = document.getElementById('fileInput');
        fileInput.click();
    };
    const handleImageUpload = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const updateFile = files.map((file, i) => { return (i == 0) ? selectedFile : file })
            setFiles(updateFile)
            setSelectedImage(URL.createObjectURL(selectedFile));
        }
    };
    // các step
    const [result, setResult] = useState([])
    const handleSetDetailStep = (index, value) => {
        const ste = { no: index + 1, detail: value, resources: 0 }
        if (result.length == 0) {
            const newSteps = []
            newSteps.push(ste)
            setResult(newSteps)
        } else if (result.length < index + 1) {
            const newSteps = [...result, ste]
            setResult(newSteps)
        }
        else {
            const update = result.map((dataStep, i) => { return (dataStep.no == ste.no) ? ste : dataStep })
            setResult(update)
        }
    }

    //chon ảnh hoặc videl cho các bước
    const [steps, setSteps] = useState([]);
    const [actionIndex, setActionIndex] = useState(null);
    const maxSize = 104857600; // Dung lượng tối đa là 100 MB

    const onDropCook = (acceptedFiles, index) => {
        const file = acceptedFiles[0];
        if (file.type.startsWith('video/') && file.size > maxSize) {
            alert('Video is too large. Please choose a video smaller than 100MB.');
            return;
        }
        const updatedSteps = [...steps];
        updatedSteps[index] = { ...updatedSteps[index], cookFile: file };
        //add to array file
        let newfiles = []
        if (files.length <= index + 1) {// ch co anh
            newfiles = [...files]
            newfiles.push(file)
        } else {// change img of this step
            newfiles = files.map((fileSteps, i) => { return (i == 0) ? file : fileSteps })
        }
        console.log(newfiles.length)
        setFiles(newfiles)

        handleGetResource(index, 1)
        setSteps(updatedSteps);
        setActionIndex(index);
    };

    const handleRemoveCook = (index) => {
        const updatedSteps = [...steps];
        updatedSteps[index] = { ...updatedSteps[index], cookFile: null };
        setSteps(updatedSteps);
        setActionIndex(index);
    };

    const handleGetResource = (index, rs) => {
        console.log(rs, index)
        const update = result.map((step, i) => { return (i == index && rs > 0) ? { ...step, resources: rs } : step })
        setResult(update)
    }

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

    //
    const [files, setFiles] = useState([null]);


    //READ CATEGORY
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/category/getall`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (response.data.success) {
                    setCategories(response.data.listCategory);
                }
                console.log(response)
                socket.emit('getcategories', { _id: User_id })
            } catch (error) {
                console.log(error);
            }
        };
        new Promise(() => fetchData());
        socket.on('categories', (data) => {
            if (data.success && data._id == User_id) {
                let categories = data.data
                categories = categories.map((category, index) => {
                    return { id: index + 1, name: category }
                })
                setCategoriesData(categories)
            }
        })
        socket.on('searchfood', (data) => {
            if (data.success && data._id == User_id) {
                console.log(data.data)
                setSearchResults(data.data)
            }
        })
        return () => {
            socket.off('categories')
        }
    }, []);


    //ADDRecipe
    const [recipeData, setRecipeData] = useState({
        User_id: User_id,
        name: '',
        description: '',
        timeCook: '',
        timePrepare: '',
        nPerson: '',
        Category: '',
        nutrion: {},
        ingredients: [],
        steps: [],
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRecipeData({
            ...recipeData,
            [name]: value,
        });
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const nPerson = parseInt(recipeData.nPerson, 10);
        const timePrepare = parseInt(recipeData.timePrepare, 10);
        const timeCook = parseInt(recipeData.timeCook, 10);
        // const updatedRecipeData = {
        //     ...recipeData,
        //     nPerson,
        //     timePrepare,
        //     timeCook,
        // };
        // Trích xuất số lượng từ mỗi nguyên liệu
        const updatedIngredients = selectedIngredients.map((ingredient) => {
            const inputQuantity = document.getElementById(`quantity-${ingredient.name}`);
            const quantity = inputQuantity ? parseInt(inputQuantity.value, 10) : 1;
            return { ...ingredient, quantitative: quantity };
        });

        const updatedRecipeData = {
            ...recipeData,
            ingredients: updatedIngredients,
            nPerson,
            timePrepare,
            timeCook,
        };
        const formData = new FormData();
        formData.append('name', updatedRecipeData.name);
        formData.append('timeCook', updatedRecipeData.timeCook);
        formData.append('timePrepare', updatedRecipeData.timePrepare);
        formData.append('description', updatedRecipeData.description);
        formData.append('nPerson', updatedRecipeData.nPerson);
        formData.append('Category', selectedCategory);
        formData.append('ingredientsString', JSON.stringify(selectedIngredients))
        formData.append('stepsString', JSON.stringify(result))
        if (Array.isArray(files)) {
            files.forEach((file) => {
                formData.append('files', file);
            });
        } else {
            formData.append('files', files[0]);
        }
        try {
            const response = await axios.post(`${apiUrl}/recipe/addnew`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (response.data.success) window.location.href = `http://localhost:3000/detail/${response.data.recipe._id}`
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={cx('modalDeleteIdea')}>
            <form
                onSubmit={handleSubmit}
                className={cx('modalContentDeleteIdea')}>
                <div>
                    <div className={cx('createIdeaHeader')}>
                        <input
                            name='name'
                            className={cx('modal_title')}
                            placeholder="Name recipe ... "
                            value={recipeData.name}
                            onChange={handleInputChange}
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
                                                value={selectedCategory}
                                                onChange={(e) => setSelectedCategory(e.target.value)}
                                            >
                                                <option value="">Select a category</option>
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className={cx('meal_nutri_wrapper')}>
                                            <div className={cx('row_nutri')}>
                                                <textarea
                                                    name="description"
                                                    className={cx('description')}
                                                    row={4}
                                                    placeholder="Description"
                                                    onChange={handleInputChange}
                                                    value={recipeData.description}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('function_wrapper')}>
                                        {/* //input ảnh */}
                                        <input
                                            name="image"
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
                                                placeholder=" Input serving"
                                                name="nPerson"
                                                onChange={handleInputChange}
                                                value={recipeData.nPerson}
                                            />
                                        </div>
                                        <div className={cx('buttons')}>
                                            show calorie
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* //SEARC TIM NGUYEN LIEU  */}
                            <div className={cx('bottom_section')}>
                                <div className={cx('bottom_card')}>
                                    <h3 className={cx('column_title')}>Ingredients</h3>
                                    <div className={cx('left_column')}>
                                        <div className={cx('scale_tool')}>
                                            <div className="input-group rounded">
                                                <input
                                                    ref={searchInputRef} //// Thêm ref để có thể truy cập vào ô searc
                                                    type="search"
                                                    placeholder={inputPlaceholder}
                                                    className="form-control rounded"
                                                    style={{ fontSize: '15px', height: '40px' }}
                                                    aria-describedby="search-addon"
                                                    value={searchTerm}
                                                    onChange={handleSearchChange}
                                                />
                                                <span className="input-group-text border-0" id="search-addon">
                                                    <i className="bi bi-search-heart"></i>
                                                </span>
                                            </div>
                                        </div>

                                        {/* Hiển thị kết quả tìm kiếm Category */}
                                        {!categorySelected && (
                                            <div className={cx("search-results")}>
                                                <ul>
                                                    {limitedCategoryResults.map((category) => (
                                                        <li key={category.id} onClick={() => handleCategorySelect(category.name)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                                            </svg> &nbsp;
                                                            {category.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* hiện kết quae search ingredient của category đc chọn */}
                                        {categorySelected && searchTerm && limitedIngredientResults.length > 0 && (
                                            <div className={cx("search-results")}>
                                                <ul>
                                                    {limitedIngredientResults.map((result) => (
                                                        <li key={result.id} onClick={() => handleIngredientSelect(result)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                                            </svg> &nbsp;
                                                            {result.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Hiển thị các ingredient đã chọn */}
                                        {selectedIngredients.length > 0 && (
                                            <div className={cx('ingredient-selected')}>
                                                <h4>Selected Ingredients</h4>
                                                <ul>
                                                    {selectedIngredients.map((ingredient) => (
                                                        <li key={ingredient.id} className={cx('show_ingrs')}>
                                                            <div className={cx('type_add')}>
                                                                <i className="bi bi-plus-circle" style={{ marginTop: '2px' }}></i>
                                                            </div>
                                                            <li className={cx('ingredient_line')}>
                                                                <span className={cx('name_ingrs')}>{ingredient.name} : </span> &nbsp;
                                                                <input
                                                                    type='number'
                                                                    className={cx('input-quantity')}
                                                                    value={inputQuantitative}
                                                                    min={1}
                                                                    onChange={(e) => setInputQuantitative(parseInt(e.target.value, 10))}
                                                                />


                                                                <span className={cx('amount_ingrs')}>
                                                                    <button onClick={() => handleRemoveIngredient(ingredient)}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                                                        </svg>
                                                                    </button>
                                                                </span>
                                                            </li>
                                                        </li>
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
                                                    name="timePrepare"
                                                    onChange={handleInputChange}
                                                    value={recipeData.timePrepare}
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
                                                    name="timeCook"
                                                    min="1"
                                                    type="number"
                                                    placeholder="Input time"
                                                    onChange={handleInputChange}
                                                    value={recipeData.timeCook}
                                                />
                                                <br />
                                            </b>
                                            <div>
                                                {steps.map((step, index) => (
                                                    <div key={index}>
                                                        <textarea
                                                            type="text"
                                                            rows={4}
                                                            autoFocus
                                                            onFocus={() => handleSetDetailStep(index, "")}
                                                            onChange={(e) => handleSetDetailStep(index, e.target.value)}
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