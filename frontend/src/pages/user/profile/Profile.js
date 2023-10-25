//import từ thư viện bên ngoài
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

//import từ bên trong src
import { apiUrl, PROFILE_INFORMATION, ACCESS_TOKEN } from "~/constants/constants"
import classNames from 'classnames/bind'
import styles from './Profile.module.scss'
import images from '~/assets/images'
import { Link } from 'react-router-dom'
import EditProfile from "./EditProfile"

const cx = classNames.bind(styles)
function Profile() {
    const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false)
    // lấy dữ liệu thông tin người  dùng
    const userDataFromLocalStorage = JSON.parse(localStorage.getItem('userData'));

    if (userDataFromLocalStorage) {
        console.log('Thông tin người dùng đã lưu trong Local Storage:', userDataFromLocalStorage);
    } else {
        console.log('Chưa có thông tin người dùng trong Local Storage');
    }

    return (
        <>
            <div className={cx("w-full", "h-full", "container-profile")}>
                <div className="w-full h-auto shadow bg-white rounded-md">
                    <div className="max-w-6xl h-full mx-auto bg-white p-1">
                        <div
                            className="h-300 max-h-300 w-full rounded-lg relative"
                            style={{
                                backgroundImage: `url('https://random.imagecdn.app/1920/1080')`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderRadius: '5px',
                                height: '300px',
                            }}
                        >
                            <div
                                className="absolute  w-full flex items-center justify-center"
                                style={{ bottom: '-15px' }}
                            >
                                <div className="w-35 h-35 rounded-full bg-gray-300 border-4 border-white d-flex align-items-center justify-content-center">
                                    <img
                                        className="w-full h-full rounded-full  rounded-circle"
                                        src="https://random.imagecdn.app/250/250"
                                        alt="dp"
                                        style={{ marginTop: "12rem" }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="max-w-5xl h-full mx-auto">
                            <div className="flex flex-col space-y-2 mt-3 items-center justify-center pb-3 border-b-2">
                                <p
                                    onClick={() => setShowUpdateProfileModal(true)}
                                    className={cx("text-4xl", "font-bold", " d-flex", "align-items-center", "justify-content-center", 'edit-profile')}
                                >
                                    Edit Profile
                                </p>
                                <p className={cx("text-4xl", "font-bold", " d-flex", "align-items-center", "justify-content-center", 'name-account')}>Name Account</p>
                            </div>
                            <div className="mt-1 flex items-center justify-between">

                                <div className="flex items-center space-x-2">
                                    <div className={cx("left")}>
                                        <button className={cx("px-3", "py-1.5", " bg-gray-200", "rounded-md", "btn-average")} >
                                            <i className="bi bi-pencil-square" title="Edit Profile"></i> Average
                                        </button>
                                        <button className={cx("px-3", "py-1.5", " bg-gray-200", "rounded-md", "btn-recipe")} >
                                            <i className="bi bi-pencil-square" title="Edit Profile"></i> Like
                                        </button>
                                    </div>
                                    <div className={cx("right")}>
                                        <button className={cx("px-3", "py-1.5", " bg-gray-200", "rounded-md", "btn-blog")} >
                                            <i className="fas fa-plus-circle  mr-2"></i>comment
                                        </button>"
                                        <button className={cx("px-3", "py-1.5", " bg-gray-200", "rounded-md", "btn-plan")} >
                                            <i className="bi bi-pencil-square" title="Edit Profile"></i> share
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />

                    <div className="max-w-6xl h-full mx-auto bg-white p-1">
                        <div></div>
                        <div>
                            <ul className={cx("flex", "mb-2", "items-center", "space-x-2")}>
                                <li className="py-3 px-2 hover:bg-gray-100 rounded-md font-semibold focus:outline-none">
                                    <Link to="#"> Save recipe</Link>
                                </li>
                                <li className="py-3 px-2 hover:bg-gray-100 rounded-md font-semibold focus:outline-none">
                                    <Link to="#"> Blog</Link>
                                </li>
                                <li className="py-3 px-2 hover:bg-gray-100 rounded-md font-semibold focus:outline-none">
                                    <Link to="#"> Recipe</Link>
                                </li>
                                <li className="py-3 px-2 hover:bg-gray-100 rounded-md font-semibold focus:outline-none">
                                    <Link to="#"> Plan meal</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {showUpdateProfileModal && < EditProfile setShowUpdateProfileModal={setShowUpdateProfileModal} />}
        </>
    );
}
export default Profile;