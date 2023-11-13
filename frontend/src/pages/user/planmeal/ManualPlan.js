import React, { useEffect, useRef, useState } from 'react';
import styles from "./ManualPlan.module.scss";
import classNames from 'classnames/bind';
import { useDebounce } from '~/hooks';
import { apiUrl, ACCESS_TOKEN } from '~/constants/constants';
import axios from 'axios';
import { Wrapper as PopperWrapper } from '~/components/popper';
import BackButton from '~/components/button/BackButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ManualPlan() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const searchContainerRef = useRef(null);
    const [recipeAllData, setAllRecipeData] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [searchKeyWord, setSearchKeyWord] = useState('');
    const [hasInput, setHasInput] = useState(false);

    // chuyẻn từ ô serch ra 
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const handleRecipeClick = (recipe) => {
        setSelectedRecipe(recipe);
        setShowResult(true); // Show the search results again
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/recipe/getall`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (response.data && 'data' in response.data) {
                    const recipes = Array.isArray(response.data.data) ? response.data.data : [];
                    setAllRecipeData(recipes);
                    setFilteredRecipes(recipes);
                } else {
                    console.error('Invalid response format.');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [apiUrl, accessToken]);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setShowResult(true);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [searchContainerRef]);

    const onSearchKeyWordChange = (event) => {
        const keyword = event.target.value;
        setSearchKeyWord(keyword);
        setHasInput(!!keyword);
        setShowResult(true); // Show results when typing
    };

    const handleEnterKey = (event) => {
        if (event.key === 'Enter') {
            setShowResult(false);
            event.preventDefault();
           
        }
    };


    //sẻach
    useEffect(() => {
        if (Array.isArray(recipeAllData)) {
            if (hasInput) {
                // Limit the results to only the first 6 matching recipes
                const filtered = recipeAllData
                    .filter((recipe) => recipe.name.toLowerCase().includes(searchKeyWord.toLowerCase()))
                    .slice(0, 5);

                setFilteredRecipes(filtered);
            } else {
                setFilteredRecipes([]); // Clear results when there's no input
            }
        } else {
            console.error('recipeAllData is not an array:', recipeAllData);
        }
    }, [recipeAllData, searchKeyWord, hasInput]);

    return (
        <div>
            <section className="vh-100">
                <div className={cx('contain-plan')}>
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="tab-content">
                            <div className="col">
                                <div className="card" id="list1" style={{ borderRadius: '.75rem', backgroundColor: '#f2f2f9' }}>
                                    <div className="card-body py-4 px-4 px-md-5">
                                        <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
                                            <i className="fas fa-check-square me-1"></i>
                                            <u style={{ fontSize: '24px' }}>Create my plan meal</u>
                                        </p>
                                        {/* <div className={cx('header')}> */}
                                        <div className={cx("d-flex", 'header')}>
                                            <div className={cx("pb-2", "left")}>
                                                <div className="card">
                                                    <div className={cx("card-body")}>
                                                        <form onSubmit={(e) => e.preventDefault()}>
                                                            <div ref={searchContainerRef} className="d-flex flex-row align-items-center">
                                                                <input
                                                                    value={searchKeyWord}
                                                                    onChange={(event) => onSearchKeyWordChange(event)}
                                                                    onKeyDown={(e) => handleEnterKey(e)}
                                                                    type="search"
                                                                    className={cx("form-control-search")}
                                                                    placeholder="Search..."
                                                                />
                                                                <div>
                                                                    <button type="submit" className={cx("btn", "btn-primary", "btn-add")}>
                                                                        Add
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                                {showResult && Array.isArray(filteredRecipes) && filteredRecipes.length > 0 && (
                                                    <div className={cx('search-result')}>
                                                        <PopperWrapper>
                                                            <ul className={cx('show-search')}>
                                                                {filteredRecipes.map((recipe) => (
                                                                    <li className={cx('show-item')} key={recipe.id}>
                                                                        <div className={cx('show-recipe')}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                                                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                                                            </svg> &nbsp;
                                                                            {recipe.name}
                                                                        </div>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </PopperWrapper>
                                                    </div>
                                                )}
                                            </div>
                                            <div className={cx('right')}>
                                                <div className={cx('card-right')}>
                                                    <p>Hiển thị các công thức món ăn</p>
                                                    <div>
                                                        {/* Display the selected recipe name */}
                                                        {selectedRecipe && (
                                                            <div>
                                                                <p>{selectedRecipe.name}</p>
                                                                {/* Add more details or components for the selected recipe */}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* </div> */}

                                        <hr className="my-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ManualPlan;
