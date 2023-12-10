import React, { useEffect, useRef, useState } from 'react';
import styles from "./ManualPlan.module.scss";
import classNames from 'classnames/bind';
import { useDebounce } from '~/hooks';
import { apiUrl, ACCESS_TOKEN } from '~/constants/constants';
import axios from 'axios';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ErrorModal from '~/components/Modal/ErrorModal';

const cx = classNames.bind(styles);

// DraggableRecipe component
const DraggableRecipe = ({ recipe, onRecipeDragStart }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'RECIPE',
        item: { recipe },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
                marginBottom: '10px', // Adjust the spacing between recipes
            }}
        >
            {recipe.name}
        </div>
    );
};

const ManualPlan = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const searchContainerRef = useRef(null);
    const [recipeAllData, setAllRecipeData] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [searchKeyWord, setSearchKeyWord] = useState('');
    const [hasInput, setHasInput] = useState(false);
    const [displayedRecipes, setDisplayedRecipes] = useState([]); // Define displayedRecipes state
    const [error, setError] = useState(null);
    const [selectedMeal, setSelectedMeal] = useState('');
    const [currentDate, setCurrentDate] = useState(new Date());
    // Function to create an empty meal plan
    const [createPlan, setCreatePlan] = useState({
        nPerson: ''
    });

    //choose day
    const [selectedDay, setSelectedDay] = useState('Monday');
    const handleDayChange = (e) => {
        const selectedDayValue = e.target.value;
        handleInputChange('day', selectedDayValue);
    };

    const handleRecipeDragStart = (recipe) => {
        console.log('Recipe is being dragged:', recipe);
    };

    const handleRecipeClick = (recipe) => {
        // Update the list of displayed recipes
        setDisplayedRecipes((prevRecipes) => [...prevRecipes, recipe]);
        // Save displayed recipes to local storage
        localStorage.setItem('displayedRecipes', JSON.stringify([...displayedRecipes, recipe]));
        // Clear the search results and input
        setFilteredRecipes([]);
        setSearchKeyWord('');
        // Hide the search results
        setShowResult(false);
    };

    const handleMealInputFocus = (meal) => {
        setSelectedMeal(meal);
        // Show the search results
        setShowResult(true);
    };
    //lay ngya thang hien tai
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
    });


    const [inputValues, setInputValues] = useState({
        nPerson: '',
        breakfast: '',
        lunch: '',
        dinner: '',
        snack1: '',
        snack2: '',
        day: ''
    });

    const handleRecipeClickForMeal = (recipe, meal) => {
        const updatedInputValues = {
            ...inputValues,
            [meal]: recipe.name,
        };
        setInputValues(updatedInputValues);
        setFilteredRecipes([]);
        setShowResult(false);
    };


    const handleInputChange = (meal, value) => {
        setInputValues((prevInputValues) => ({
            ...prevInputValues,
            [meal]: value,
        }));
    };
    console.log('thong tin nhap vao:', inputValues)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/recipe/getall`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                console.log('recipe', response.data)
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
        setShowResult(true);
    };

    const handleEnterKey = async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (hasInput) {
                try {
                    const response = await axios.get(`${apiUrl}/recipe/getall`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                        params: {
                            keyword: searchKeyWord,
                        },
                    });

                    if (response.data && 'data' in response.data) {
                        const recipes = Array.isArray(response.data.data) ? response.data.data : [];
                        const filtered = recipes.slice(0, 5);
                        setFilteredRecipes(filtered);
                        setShowResult(true);
                    } else {
                        console.error('Invalid response format.');
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        }
    };


    //tao bua an
    useEffect(() => {
        if (Array.isArray(recipeAllData)) {
            if (hasInput) {
                const filtered = recipeAllData
                    .filter((recipe) => recipe.name.toLowerCase().includes(searchKeyWord.toLowerCase()))
                    .slice(0, 5);

                setFilteredRecipes(filtered);
            } else {
                setFilteredRecipes([]);
            }
        } else {
            console.error('recipeAllData is not an array:', recipeAllData);
        }
    }, [recipeAllData, searchKeyWord, hasInput]);

    const handleCreatePlanMeal = async (e) => {
        e.preventDefault();
        try {
            console.log('goij apt e: ', inputValues)
            const response = await axios.post(`${apiUrl}/mealplan/createMealPlan`, inputValues, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log("log ne:", createPlan)

            console.log(response.data)
        } catch (error) {
            setError(error.response.data.message)
        }
    };

    return (
        // <DndProvider backend={HTML5Backend}>
        <form onSubmit={handleCreatePlanMeal} className="vh-100">
            <div className={cx('contain-plan')}>
                <div className="card" id="list1" style={{ borderRadius: '.75rem', backgroundColor: '#f2f2f9' }}>
                    <div className="card-body py-4 px-4 px-md-5">
                        <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
                            <i className="fas fa-check-square me-1"></i>
                            <u style={{ fontSize: '24px' }}>Create my plan meal</u>
                        </p>
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
                                                    <li className={cx('show-item')} key={recipe.id} onClick={() => handleRecipeClick(recipe)}>
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
                                    {/* <p>Hiển thị các công thức món ăn</p> */}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('body-box')}>
                <div className={cx('body-gird')}>
                    <div className={cx('card-item')}>
                        <div className={cx('item')}>
                            <div className={cx('body-header')}>
                                <div className={cx('choose-day-meal')}>
                                    <select style={{ border: 'none' }} id="daySelect" value={inputValues.day} onChange={(e) => handleInputChange('day', e.target.value)}>
                                        <option value="Sunday">Sunday</option>
                                        <option value="Monday">Monday</option>
                                        <option value="Tuesday">Tuesday</option>
                                        <option value="Wednesday">Wednesday</option>
                                        <option value="Thursday">Thursday</option>
                                        <option value="Friday">Friday</option>
                                        <option value="Saturday">Saturday</option>
                                    </select>
                                </div>
                                <input
                                    className={cx('input-serving')}
                                    type='number'
                                    placeholder='Serving'
                                    defaultValue={1}
                                    onChange={(e) => handleInputChange('nPerson', e.target.value)}
                                />
                            </div>
                            <div className={cx('body-item')}>
                                <div className={cx('show-day')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M176 32c44.2 0 80 35.8 80 80v16c0 8.8-7.2 16-16 16c-44.2 0-80-35.8-80-80V48c0-8.8 7.2-16 16-16zM56 64h48c13.3 0 24 10.7 24 24s-10.7 24-24 24H56c-13.3 0-24-10.7-24-24s10.7-24 24-24zM24 136H136c13.3 0 24 10.7 24 24s-10.7 24-24 24H24c-13.3 0-24-10.7-24-24s10.7-24 24-24zm8 96c0-13.3 10.7-24 24-24h48c13.3 0 24 10.7 24 24s-10.7 24-24 24H56c-13.3 0-24-10.7-24-24zM272 48c0-8.8 7.2-16 16-16c44.2 0 80 35.8 80 80v16c0 8.8-7.2 16-16 16c-44.2 0-80-35.8-80-80V48zM400 32c44.2 0 80 35.8 80 80v16c0 8.8-7.2 16-16 16c-44.2 0-80-35.8-80-80V48c0-8.8 7.2-16 16-16zm80 160v16c0 44.2-35.8 80-80 80c-8.8 0-16-7.2-16-16V256c0-44.2 35.8-80 80-80c8.8 0 16 7.2 16 16zM352 176c8.8 0 16 7.2 16 16v16c0 44.2-35.8 80-80 80c-8.8 0-16-7.2-16-16V256c0-44.2 35.8-80 80-80zm-96 16v16c0 44.2-35.8 80-80 80c-8.8 0-16-7.2-16-16V256c0-44.2 35.8-80 80-80c8.8 0 16 7.2 16 16zM3.5 347.6C1.6 332.9 13 320 27.8 320H484.2c14.8 0 26.2 12.9 24.4 27.6C502.3 397.8 464.2 437 416 446v2c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32v-2c-48.2-9-86.3-48.2-92.5-98.4z" /></svg>
                                    <p> {selectedDay}</p>
                                </div>
                                <div>
                                    <div>
                                        {['breakfast', 'lunch', 'dinner', 'snack1', 'snack2'].map((meal) => (
                                            <div key={meal} className={cx('show-breakfast')}>
                                                <div className={cx('meals')}>{meal}:</div>
                                                <div className={cx('recipes')}>
                                                    <input
                                                        className={cx('input-recipe')}
                                                        type='text'
                                                        placeholder={`recipe for ${meal} ...`}
                                                        onFocus={() => handleMealInputFocus(meal)}
                                                        value={inputValues[meal] || ''}
                                                        onChange={(e) => handleInputChange(meal, e.target.value)}
                                                    />
                                                    {showResult &&
                                                        Array.isArray(filteredRecipes) &&
                                                        filteredRecipes.length > 0 && (
                                                            <div className={cx('search-result')}>
                                                                <PopperWrapper>
                                                                    <ul className={cx('show-search')}>
                                                                        {filteredRecipes.map((recipe) => (
                                                                            <li
                                                                                className={cx('show-item')}
                                                                                key={recipe.id}
                                                                                onClick={() => handleRecipeClickForMeal(recipe, meal)}
                                                                            >
                                                                                <div className={cx('show-recipe')}>
                                                                                    &nbsp;{recipe.name}
                                                                                </div>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </PopperWrapper>
                                                            </div>
                                                        )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* <div className={cx('show-nutrion')}>
                                        <div className={cx('nutrion')}>calories: </div>
                                        <div className={cx('nutrion')}>protein: </div>
                                        <div className={cx('nutrion')}>carbs: </div>
                                        <div className={cx('nutrion')}>Fiber: </div>
                                        <div className={cx('nutrion')}>Sugars: </div>
                                        <div className={cx('nutrion')}>Fat: </div>
                                    </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button type='submit'>Create</button>
            {error && <ErrorModal message={error} onClose={() => setError(null)} />}
        </form>

        // </DndProvider>
    );
};

export default ManualPlan;