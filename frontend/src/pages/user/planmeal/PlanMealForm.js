import images from '~/assets/images'
import React, { useState, useEffect } from "react"
import styles from './PlanMealForm.module.scss'
import classNames from 'classnames/bind'
import { format } from 'date-fns';
import { Link } from 'react-router-dom'
import { PROFILE_INFORMATION, apiUrl, ACCESS_TOKEN, ACCOUNT_ID } from '~/constants/constants'
import axios from 'axios'
// import 'bootstrap/dist/css/bootstrap.min.css';

import Loading from '~/components/Layout/Loading';
const cx = classNames.bind(styles)
function PlanmealForm() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const profileInformation = JSON.parse(localStorage.getItem(PROFILE_INFORMATION));
    const [resultPlanData, setResultPlanData] = useState([]);

    //CHUYEN CAC TAB
    const [activeTab, setActiveTab] = useState('auto');
    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    };

    //call api gọi tất cả cacs plan bao gồn auto và manual
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/mealplan/getonebyuser`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setResultPlanData(response.data.data)
            } catch (error) {
                console.error("Error fetching Meal Plans:", error);
            }
        };
        fetchData();
    }, [accessToken]);

    //loc theo cate
    const filteredPlans = resultPlanData.filter((plan) => {
        if (activeTab === 'auto') {
            return plan.category.length === 0;
        } else if (activeTab === 'manual') {
            return plan.category.length > 0;
        }
        return true;
    })
    return (
        <>
            <div className={cx('result-save-planmeal')}>
                <div className={cx('result-header')}>
                    ...
                </div>

                <div className={cx('header-card', "header_wrapper")}>
                    <img className={cx('img-avatar')} src={images.header_planmeal} />
                </div>
                {/* <div className={cx('header-card')}>
                    <div className={cx('heder-gird')}>
                        <span>Plan Meal </span>
                        <span> / </span>
                        <span><Link to="/result">Result</Link> </span>
                        <span> / </span>
                        <span> Detail  </span>
                    </div>
                </div> */}
                <div className={cx("container", "main")}>
                    <div className={cx("container-card")}>
                        <div className={cx("row")}>
                            <div className={cx("detail")} >
                                <p>{profileInformation.name}'s list of meal plans</p>
                                <h1 className={cx("shawn")}><b>Shawn Mendes</b></h1>
                                <div>
                                    Congratulations, You have created<b> {resultPlanData.length}</b> meal plans &nbsp;
                                    <img width='20px' height='21px' style={{ marginTop: '-5px' }} src={images.congraduate} /> &nbsp;
                                    <img width='20px' height='21px' style={{ marginTop: '-5px' }} src={images.congraduate} /> &nbsp;
                                    <img width='20px' height='21px' style={{ marginTop: '-5px' }} src={images.congraduate} /> &nbsp;
                                </div>

                                <div className={cx('action-button')}>
                                    <button className={cx("btn", "play", { 'active': activeTab === 'auto' })} onClick={() => handleTabChange('auto')}>
                                        Auto
                                    </button>
                                    <span>
                                        <button className={cx("btn", "like")} id="like">
                                            <i className="fa fa-heart-o"></i>
                                        </button>
                                    </span>
                                    <button className={cx("btn", "play", { 'active': activeTab === 'manual' })} onClick={() => handleTabChange('manual')}>
                                        Manual
                                    </button>
                                    <span>
                                        <button className={cx("btn", "like")} id="like">
                                            <i className="fa fa-heart-o"></i>
                                        </button>
                                    </span>
                                    <button className={cx("btn", "play", "")} >
                                        <Link to="/planmeal">Create Plan</Link>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={cx('table-card', "tab-content")}>
                            <div id="auto" className={`tab-pane fade ${activeTab === 'auto' ? 'show active pt-3' : ''}`}>
                                <table className={cx("table", "table-responsive", "table-hover", "table-striped")}>
                                    <thead>
                                        <tr>
                                            <td>No.</td>
                                            <td>Name of plan meal</td>
                                            <td>Calories</td>
                                            <td>
                                                Serving
                                            </td>
                                            <td>
                                                Create day
                                            </td>
                                            <td>
                                                Collection
                                            </td>
                                            <td>

                                            </td>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredPlans.map((plan, index) => (
                                            <tr className={cx('row-table')} key={plan._id}>
                                                <td>
                                                    {index + 1}
                                                </td>
                                                <td>
                                                    <Link to={`/detailPlan/${plan._id}`}> {plan.name} </Link>
                                                </td>
                                                <td>
                                                    {Math.ceil(plan.caloriesEachDay)} <img className={cx('icon-img')} src={images.icon_calo} />
                                                </td>
                                                <td>
                                                    {plan.nPerson} <img className={cx('icon-img')} src={images.ic_serving} />
                                                </td>
                                                <td>{format(new Date(plan.createAt), 'MM/dd/yyyy')}</td>
                                                <td>
                                                    <div>
                                                        <div className={cx('meal_refresh')} title='Refresh this meal'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                                                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div><i className="bi bi-trash3"></i></div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div id="manual" className={`tab-pane fade ${activeTab === 'manual' ? 'show active pt-3' : ''}`}>
                                <table className={cx("table", "table-responsive", "table-hover", "table-striped")}>
                                    <thead>
                                        <tr>
                                            <td>No.</td>
                                            <td>Title</td>
                                            <td>Calories</td>
                                            <td>
                                                Category
                                            </td>
                                            <td>
                                                Create day
                                            </td>
                                            <td>
                                                Public
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredPlans.map((plan, index) => (
                                            <tr key={plan._id}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <Link to={`/detailPlan/${plan._id}`}>{plan.name}</Link>
                                                </td>
                                                <td>{Math.ceil(plan.caloriesEachDay)}  <img className={cx('icon-img')} src={images.icon_calo} /></td>
                                                <td>
                                                    {plan.category.map((category, catIndex) => (
                                                        <span key={catIndex}>{category}</span>
                                                    ))}
                                                </td>
                                                <td>{format(new Date(plan.createAt), 'MM/dd/yyyy')}</td>
                                                <td>
                                                    {plan.public ? (
                                                        <i className="bi bi-check2" style={{ color: 'green', fontSize: '22px' }}></i>
                                                    ) : (
                                                        <i className="bi bi-x" style={{ color: 'red', fontSize: '22px' }}></i>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default PlanmealForm;