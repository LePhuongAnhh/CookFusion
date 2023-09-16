// import { children } from "react";
import style from "./Popper.module.css"
// import classNames from "classnames/bind"

function Wrapper({children }) {
    return (
        <div className={style.wrapper}>{children}

        </div>
    );
}
export default Wrapper;