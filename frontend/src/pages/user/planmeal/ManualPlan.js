// ManualPlan.jsx
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


// ManualPlan component
// ... (previous imports)

// ManualPlan component
const ManualPlan = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const searchContainerRef = useRef(null);
    const [recipeAllData, setAllRecipeData] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [searchKeyWord, setSearchKeyWord] = useState('');
    const [hasInput, setHasInput] = useState(false);
    const [mealPlan, setMealPlan] = useState(createEmptyMealPlan());
    const [displayedRecipes, setDisplayedRecipes] = useState([]); // Define displayedRecipes state

    // Function to create an empty meal plan
    function createEmptyMealPlan() {
        const rows = 6; // Number of rows (including headers)
        const cols = 7; // Number of columns (days of the week)
        const emptyPlan = Array.from({ length: rows }, () => Array(cols).fill(null));
        return emptyPlan;
    }

    const handleRecipeDragStart = (recipe) => {
        console.log('Recipe is being dragged:', recipe);
    };

    const handleDrop = (row, col, droppedRecipe) => {
        const updatedPlan = [...mealPlan];
        updatedPlan[row][col] = droppedRecipe;
        setMealPlan(updatedPlan);
    };

    const renderTableCell = (row, col) => {
        const droppedRecipe = mealPlan[row][col];

        return (
            <div
                className={cx('table-cell')}
                onDrop={(e) => handleDrop(row, col, e.draggedItem.recipe)}
                onDragOver={(e) => e.preventDefault()}
            >
                {droppedRecipe && (
                    <DraggableRecipe
                        key={droppedRecipe._id}
                        recipe={droppedRecipe}
                        onRecipeDragStart={handleRecipeDragStart}
                    />
                )}
            </div>
        );
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

    return (
        <DndProvider backend={HTML5Backend}>
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
                                                    <p>Hiển thị các công thức món ăn</p>
                                                    <div className={cx('displayed-recipes-container')}>
                                                        {displayedRecipes.map((recipe) => (
                                                            <DraggableRecipe
                                                                key={recipe._id}
                                                                recipe={recipe}
                                                                onRecipeDragStart={handleRecipeDragStart}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr className="my-4" />
                                        <div>
                                            <table className="table mb-4">
                                                <thead>
                                                    <tr>
                                                        <th scope="col"></th>
                                                        <th scope="col">Monday</th>
                                                        <th scope="col">Tuesday</th>
                                                        <th scope="col">Wed</th>
                                                        <th scope="col">Thu</th>
                                                        <th scope="col">Fri</th>
                                                        <th scope="col">Sat</th>
                                                        <th scope="col">Sun</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th>Breakfast</th>
                                                        {renderTableCell(0, 0)}
                                                        {renderTableCell(0, 1)}
                                                        {renderTableCell(0, 2)}
                                                        {renderTableCell(0, 3)}
                                                        {renderTableCell(0, 4)}
                                                        {renderTableCell(0, 5)}
                                                        {renderTableCell(0, 6)}
                                                    </tr>
                                                    <tr>
                                                        <th>Lunch</th>
                                                        {renderTableCell(1, 0)}
                                                        {renderTableCell(1, 1)}
                                                        {renderTableCell(1, 2)}
                                                        {renderTableCell(1, 3)}
                                                        {renderTableCell(1, 4)}
                                                        {renderTableCell(1, 5)}
                                                        {renderTableCell(1, 6)}
                                                    </tr>
                                                    <tr>
                                                        <th>Side</th>
                                                        {renderTableCell(2, 0)}
                                                        {renderTableCell(2, 1)}
                                                        {renderTableCell(2, 2)}
                                                        {renderTableCell(2, 3)}
                                                        {renderTableCell(2, 4)}
                                                        {renderTableCell(2, 5)}
                                                        {renderTableCell(2, 6)}
                                                    </tr>
                                                    <tr>
                                                        <th>Dinner</th>
                                                        {renderTableCell(3, 0)}
                                                        {renderTableCell(3, 1)}
                                                        {renderTableCell(3, 2)}
                                                        {renderTableCell(3, 3)}
                                                        {renderTableCell(3, 4)}
                                                        {renderTableCell(3, 5)}
                                                        {renderTableCell(3, 6)}
                                                    </tr>
                                                    <tr>
                                                        <th>Side</th>
                                                        {renderTableCell(4, 0)}
                                                        {renderTableCell(4, 1)}
                                                        {renderTableCell(4, 2)}
                                                        {renderTableCell(4, 3)}
                                                        {renderTableCell(4, 4)}
                                                        {renderTableCell(4, 5)}
                                                        {renderTableCell(4, 6)}
                                                    </tr>
                                                    <tr>
                                                        <th>Calories</th>
                                                        {renderTableCell(5, 0)}
                                                        {renderTableCell(5, 1)}
                                                        {renderTableCell(5, 2)}
                                                        {renderTableCell(5, 3)}
                                                        {renderTableCell(5, 4)}
                                                        {renderTableCell(5, 5)}
                                                        {renderTableCell(5, 6)}
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </DndProvider>
    );
};

export default ManualPlan;
