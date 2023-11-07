// Create a Modal component
import React from "react";
import styles from './ErrorModal.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)
const ErrorModal = ({ message, onClose }) => {
    return (
        <div className={cx("modal-dialog")}>
            <div className={cx("modal-content")}>
                <div className={cx("modal-header")}>
                    <div className={cx("modal-title text-md")} style={{ fontSize: "18px", fontWeight: "600" }}>Information</div>
                    {/* <button onClick={onClose} className="close" data-dismiss="modal">&times;</button> */}
                </div>
                <div className="modal-body">
                    <div className="p-4 text-center">
                        <p>{message}</p>
                    </div>
                </div>
                <div className="modal-footer" style={{ marginTop: "-18px" }}>
                    <button onClick={onClose} type="button" className={cx("btn")} data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>

    );
};

export default ErrorModal;
