import { useRef, useState } from 'react'
import style from './RoleModal.module.css'
import { Link } from 'react-router-dom';


const RoleModal = () => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleRoleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    // const [selectedOption, setSelectedOption] = useState('');

    return (
        <>
            <div className={style.modalChooseRole}>
                <form className={style.modalBodyRole}>
                    {/* <div className={style.modalBodyRole}> */}
                    <div>
                        <div className={style.roleHeader}>
                            <h1 className={style.role}>Choose the role</h1>
                        </div>
                        <div className={style.cancel}>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <hr></hr>

                    <div className={style.inform}>
                        <p>You choose the role to complete the account login process</p>
                    </div>

                    <div className={style.roleContent}>
                        <div className={style.container}>
                            <div className={style.choose}>
                                <label className={style.user_normal}>
                                    <input className={style.user} type="radio" name="User" value="user" checked={selectedOption === 'user'} onChange={handleRoleChange} />
                                    User
                                </label>
                            </div>
                            <div className={style.choose}>
                                <label className={style.user_normal}>
                                    <input className={style.user} type="radio" name="User" value="user" checked={selectedOption === 'user'} onChange={handleRoleChange} />
                                    User
                                </label>

                            </div>
                        </div>
                    </div>
                    <div className={style.box}>
                        <Link className={style.accept_role}>
                            <svg> <rect></rect></svg>
                            <p className={style.accept} >Accept</p>
                        </Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default RoleModal