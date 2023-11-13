import React, { useEffect, useState } from 'react';
import styles from "./ManualPlan.module.scss"
import classNames from 'classnames/bind'
import BackButton from '~/components/button/BackButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


const cx = classNames.bind(styles)
function ManualPlan() {
    //cập nhật nguyên liệu dị ứng
    const [allergies, setAllergies] = useState([]);
    const [currentAllergy, setCurrentAllergy] = useState('');
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && currentAllergy.trim() !== '') {
            setAllergies([...allergies, currentAllergy]);
            setCurrentAllergy('');
        }
    };
    const handleRemoveAllergy = (index) => {
        const newAllergies = [...allergies];
        newAllergies.splice(index, 1);
        setAllergies(newAllergies);
    };


    return (
        <div>
            <section className="vh-100">
                <form>
                    <div className={cx('contain-plan')}>
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col">
                                <div className="card" id="list1" style={{ borderRadius: '.75rem', backgroundColor: '#f2f2f9' }}>
                                    <div className="card-body py-4 px-4 px-md-5">
                                        <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
                                            <i className="fas fa-check-square me-1"></i>
                                            <u style={{ fontSize: '24px' }}>Create my plan meal</u>
                                        </p>
                                        {/* SEARCH NGUYEN LIEU  */}
                                        <div className="pb-2">
                                            <div className="card">
                                                <div className={cx("card-body")}>
                                                    <div className="d-flex flex-row align-items-center">
                                                        <input
                                                            type="search"
                                                            className={cx("form-control-search")}
                                                            placeholder="Search..."
                                                        />
                                                        <div>
                                                            <button type="button" className={cx("btn", "btn-primary", "btn-add")}>
                                                                Add
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr className="my-4" />
                                        {/* DI UNG  */}
                                        <div className="d-flex flex-column pt-2 pb-3">
                                            <div className={cx("d-flex", "align-items-center", "pt-2", "pb-3")}>
                                                <p className={cx("mb-0", "me-2", "text-muted", "font-text")}>Allergy</p>
                                                <input
                                                    type="text"
                                                    className={cx("input-allergy")}
                                                    placeholder="You are allergic to ..."
                                                    value={currentAllergy}
                                                    onChange={(e) => setCurrentAllergy(e.target.value)}
                                                    onKeyDown={handleKeyDown}
                                                />
                                            </div>
                                            <div style={{ marginTop: '10px' }}>
                                                {allergies.map((allergy, index) => (
                                                    <span key={index} className={cx("me-2", "show-allergy")}>
                                                        {allergy}
                                                        <FontAwesomeIcon
                                                            icon={faTimes}
                                                            className="ms-1"
                                                            style={{ cursor: 'pointer', margin: " 0 0 -1px 0" }}
                                                            onClick={() => handleRemoveAllergy(index)}
                                                        />
                                                    </span>
                                                ))}
                                            </div>
                                        </div>


                                        {/* HIEN THI ADD NGUYEN LIEU  */}
                                        <ul className="list-group list-group-horizontal rounded-0 bg-transparent">
                                            <li className="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
                                                <div className="form-check">
                                                    <input className="form-check-input me-0" type="checkbox" value="" id="flexCheckChecked1" aria-label="..." checked />
                                                </div>
                                            </li>
                                            <li className="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
                                                <p className={cx("lead", "fw-normal", "mb-0", "font-text")}>Buy groceries for next week</p>
                                            </li>
                                            {/* EDIT VA DELETE  */}
                                            <li className="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
                                                <div className="d-flex flex-row justify-content-end mb-1">
                                                    <div className="text-info" data-mdb-toggle="tooltip" style={{ margin: " 0 10px", cursor: "pointer" }}>
                                                        <i class="bi bi-pencil"></i>
                                                    </div>
                                                    <div className="text-danger" data-mdb-toggle="tooltip" style={{ cursor: 'pointer' }}>
                                                        <i class="bi bi-trash"></i>
                                                    </div>
                                                </div>
                                                <div className="text-end text-muted">
                                                    <a href="#!" className="text-muted" data-mdb-toggle="tooltip" title="Created date">
                                                        <p className="mb-0">
                                                            <i className="fas fa-info-circle me-2"></i>28th Jun 2020
                                                        </p>
                                                    </a>
                                                </div>
                                            </li>
                                        </ul>
                                        <div className={cx('buttons_wrapper', 'd-flex')}>
                                            <div>
                                                < BackButton />
                                            </div>
                                            <div>
                                                <button type="submit" className={cx('next_btn')}>
                                                    Create
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default ManualPlan;