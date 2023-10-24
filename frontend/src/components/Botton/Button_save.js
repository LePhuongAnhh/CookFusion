import styles from "./Button_save.module.scss"
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import images from '~/assets/images'

const cx = classNames.bind(styles)
const Button_save = () => {
    return (
        <div className={cx('floating_button')}>
            <div className={cx('tray_row')}>
                <div className={cx('save_button')}>
                    <button aria-label='Save-recipe' className={cx('button_save_recipe')}>
                        <span className={cx('icon_save')} title="Create Recipe">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Button_save