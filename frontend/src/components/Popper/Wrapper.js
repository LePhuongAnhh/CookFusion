// import { children } from "react";
// import styles from "./popper.module.scss"
import classNames from "classnames/bind"

// const cx = classNames.bind(styles);
function Wrapper({ children }) {
    return (
        <div>{children}</div>
    );
}
export default Wrapper;