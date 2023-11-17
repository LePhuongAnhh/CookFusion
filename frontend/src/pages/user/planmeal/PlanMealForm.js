import images from '~/assets/images'
import React, { useState, useEffect } from "react"
import styles from './PlanMealForm.module.scss'
import classNames from 'classnames/bind'
import { format } from 'date-fns';
import { Link } from 'react-router-dom'
import { PROFILE_INFORMATION, apiUrl, ACCESS_TOKEN, ACCOUNT_ID } from '~/constants/constants'
import axios from 'axios'
import Loading from '~/components/Layout/Loading';
const cx = classNames.bind(styles)
function PlanmealForm() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const profileInformation = JSON.parse(localStorage.getItem(PROFILE_INFORMATION));
    const Account_id = profileInformation._id;
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
    console.log('lay dữ liệu:', resultPlanData)
    return (
        <>
            <div className={cx('result-save-planmeal')}>
                <div className={cx('result-header')}>
                    ...
                </div>
                <div className={cx("container", "main")}>
                    <div className={cx("row")}>
                        <div className={cx("col-sm-3", "photo")} >
                            <img className={cx('img-avatar', "sm")} src={profileInformation.avatar} />
                            <div className={cx('header-name-text')}>{profileInformation.name}</div>
                        </div>
                        <div className={cx("col-sm-8", "detail")} >
                            <p>List of your plans</p>
                            <h1 className={cx("shawn")}><b>Shawn Mendes</b></h1>
                            <p>View artist page</p>

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
                        </div>
                    </div>
                    <div className={cx('table-card', "tab-content")}>
                        <div id="auto" className={`tab-pane fade ${activeTab === 'auto' ? 'show active pt-3' : ''}`}>
                            <table className="table table-responsive">
                                <thead>
                                    <tr>
                                        <td>#</td>
                                        <td>Title</td>
                                        <td>Calories</td>
                                        <td>
                                            Serving
                                        </td>
                                        <td>
                                            Create day
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredPlans.map((plan, index) => (
                                        <tr key={plan._id}>
                                            <td>
                                                {index + 1}
                                            </td>
                                            <td>
                                                <Link to={`/detailPlan/${plan._id}`}> {plan.name} </Link>
                                            </td>
                                            <td>{Math.ceil(plan.caloriesEachDay)}</td>
                                            <td>{plan.nPerson}</td>
                                            <td>{format(new Date(plan.createAt), 'MM/dd/yyyy')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div id="manual" className={`tab-pane fade ${activeTab === 'manual' ? 'show active pt-3' : ''}`}>
                            <table className="table table-responsive">
                                <thead>
                                    <tr>
                                        <td>#</td>
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
                                            <td>{plan.name}</td>
                                            <td>{Math.ceil(plan.caloriesEachDay)}</td>
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
        </>
    )
}

export default PlanmealForm;