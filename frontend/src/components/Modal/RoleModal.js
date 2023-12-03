// import { useRef, useState, useEffect } from 'react'
// import styles from './RoleModal.module.scss'
// import classNames from 'classnames/bind'
// import { Link } from 'react-router-dom';
// import images from '~/assets/images'
// import { ACCESS_TOKEN } from '~/constants/constants';
// import { useNavigate } from 'react-router-dom';

// const cx = classNames.bind(styles)
// const RoleModal = ({ onClose, onRoleSelect, onOK }) => {
//     const [selectedRole, setSelectedRole] = useState('User'); // Thiết lập User là lựa chọn mặc định

//     const handleRoleSelection = (role) => {
//         setSelectedRole(role); // Cập nhật vai trò được chọn  
//     };

//     const handleOK = () => {
//         onRoleSelect(selectedRole); // Truyền dữ liệu đc chọn khi bấm "Next"
//         onOK(); // Gọi hàm xử lý khi bấm Next
//     };

//     useEffect(() => {
//         console.log("You choose:", selectedRole);
//     }, [selectedRole]);

//     return (
//         <>
//             <div className={cx("modal-dialog")}>
//                 <div className={cx("modal-content")}>
//                     {/* <!-- Modal body --> */}
//                     <div className={cx("modal-body", "mb-0", "pb-0", "mt-0")}>
//                         <div className={cx("container ")}>
//                             <div className={cx("row", "mb-1")}>
//                                 <div className={cx("col")}>
//                                     <h2 className={cx("header")}>Choose Role</h2>
//                                 </div>
//                             </div>
//                             <form action="#" className={cx("customRadio", "customCheckbox", "m-0", "p-0")}>
//                                 <div className={cx("row", "mb-0")}>
//                                     <div className={cx("row", "justify-content-start")}>
//                                         <div className={cx("col-12")}>
//                                             <div className={cx("row")}>
//                                                 <input
//                                                     type="radio"
//                                                     name="textEditor"
//                                                     id="sublime"
//                                                     checked={selectedRole === 'User'} // Thiết lập User là mặc định
//                                                     onChange={() => handleRoleSelection('User')}
//                                                 />
//                                                 <label htmlFor="sublime">User</label>
//                                             </div>
//                                             <div className={cx("row")}>
//                                                 <input
//                                                     type="radio"
//                                                     name="textEditor"
//                                                     id="dreamweaver"
//                                                     checked={selectedRole === 'Sponsor'} // Chọn sang Sponsor
//                                                     onChange={() => handleRoleSelection('Sponsor')}
//                                                 />
//                                                 <label htmlFor="dreamweaver">Sponsor</label>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </form>

//                         </div>
//                     </div>
//                     <div className={cx("modal-footer")}>
//                         <div className={cx("modal-footer-gird")}>
//                             <button
//                                 type="button"
//                                 className={cx("modal_footer", "ok")}
//                                 onClick={onClose}
//                             >
//                                 Cancel
//                             </button>
//                         </div>
//                         <div className="justify-content-start m-0 p-0">
//                             <button
//                                 type="button"
//                                 className={cx("modal_footer", "cancel")}
//                                 onClick={handleOK}
//                             >
//                                 Ok
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default RoleModal


import { useRef, useState } from 'react'
import styles from './RoleModal.module.scss'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom';
import images from '~/assets/images'
import { ACCESS_TOKEN } from '~/constants/constants';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles)
const RoleModal = ({ onClose, onRoleSelect, onOK }) => {
    const [selectedRole, setSelectedRole] = useState('User'); // Thiết lập User là lựa chọn mặc định

    const handleRoleSelection = (role) => {
        setSelectedRole(role); // Cập nhật vai trò được chọn
        console.log(selectedRole)
    };

    const handleOK = () => {
        onRoleSelect(selectedRole); // Truyền dữ liệu đc chọn khi bấm "Next"

        onOK(); // Gọi hàm xử lý khi bấm Next
    };
    return (
        <>
            <div className={cx("modal-dialog")}>
                <div className={cx("modal-content")}>
                    {/* <!-- Modal body --> */}
                    <div className={cx("modal-body", "mb-0", "pb-0", "mt-0")}>
                        <div className={cx("container ")}>
                            <div className={cx("row", "mb-1")}>
                                <div className={cx("col")}>
                                    <h2 className={cx("header")}>Choose Role</h2>
                                </div>
                            </div>
                            <form action="#" className={cx("customRadio", "customCheckbox", "m-0", "p-0")}>
                                <div className={cx("row", "mb-0")}>
                                    <div className={cx("row", "justify-content-start")}>
                                        <div className={cx("col-12")}>
                                            <div className={cx("row")}>
                                                <input
                                                    type="radio"
                                                    name="textEditor"
                                                    id="sublime"
                                                    checked={selectedRole === 'User'} // Thiết lập User là mặc định
                                                    onChange={() => handleRoleSelection('User')}
                                                />
                                                <label htmlFor="sublime">User</label>
                                            </div>
                                            <div className={cx("row")}>
                                                <input
                                                    type="radio"
                                                    name="textEditor"
                                                    id="dreamweaver"
                                                    checked={selectedRole === 'Sponsor'} // Chọn sang Sponsor
                                                    onChange={() => handleRoleSelection('Sponsor')}
                                                />
                                                <label htmlFor="dreamweaver">Sponsor</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                    <div className={cx("modal-footer")}>
                        <div className={cx("modal-footer-gird")}>
                            <button
                                type="button"
                                className={cx("modal_footer", "ok")}
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                        </div>
                        <div className="justify-content-start m-0 p-0">
                            <button
                                type="button"
                                className={cx("modal_footer", "cancel")}
                                onClick={handleOK}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RoleModal