import style from "./FooterForm.module.css"
import { Link } from 'react-router-dom'
// import logofooter from '../../../image/logofooter1.png'

const FooterForm = () => {
    return (
        <>
            <footer className={style.dk_footer}>
                <div className={style.footer_container}>
                    <div className={style.footer_left}>
                        <div className={style.dk_footer_box_info}>
                            <Link to="/homepage" className={style.footer_logo}>
                                {/* <img src={logofooter} alt="footer_logo" className={style.img_fluid} /> */}
                            </Link>
                            <p className={style.footer_info_text}>
                                Reference site about Lorem Ipsum,
                            </p>
                            <div className={style.footer_social_link}>
                                <h3>Follow us</h3>
                                <ul>
                                    <li>
                                        <Link to="#">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="56" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                                                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                                            </svg>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="56" fill="currentColor" class="bi bi-twitter" viewBox="0 0 16 16">
                                                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                                            </svg>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="56" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
                                                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                                            </svg>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="56" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                                                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                                            </svg>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className={style.footer_center}>
                        <div className={style.row}>
                            <div class="col-md-6">
                                <div className={style.contact_us}>
                                    <div className={style.contact_icon}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-telephone" viewBox="0 0 16 16">
                                            <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                        </svg>
                                    </div>

                                    <div className={style.contact_info}>
                                        <h3>95 711 9 5353</h3>
                                        <p>Give us Link call</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={style.row}>
                            <div class="col-md-12 col-lg-6">
                                <div className={style.footer_widget}>
                                    <div className={style.section_heading}>
                                        <h3>Useful Links</h3>
                                        <span className={style.animate_border}></span>
                                    </div>
                                    <ul>
                                        <li>
                                            <Link to="#">About us</Link>
                                        </li>
                                        <li>
                                            <Link to="#">Services</Link>
                                        </li>
                                        <li>
                                            <Link to="#">Projects</Link>
                                        </li>
                                        <li>
                                            <Link to="#">Our Team</Link>
                                        </li>
                                    </ul>

                                </div>
                            </div>
                        </div>
                    </div>


                    <div className={style.footer_right}>
                        <div className={style.row}>
                            <div class="col-md-6">
                                <div className={style.contact_us}>
                                    <div className={style.contact_icon}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-telephone" viewBox="0 0 16 16">
                                            <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                        </svg>
                                    </div>

                                    <div className={style.contact_info}>
                                        <h3>95 711 9 5353</h3>
                                        <p>Give us Link call</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={style.row}>
                            <div class="col-md-12 col-lg-6">
                                <div className={style.footer_widget}>
                                    <div className={style.section_heading}>
                                        <h3>Subscribe</h3>
                                        <span className={style.animate_border}></span>
                                    </div>
                                    <p>
                                        Reference site about Lorem Ipsum, giving information on its origins, as well.</p>
                                    <form action="#">
                                        <div className={style.form_row}>
                                            <div className={style.dk_footer_form}>
                                                <input type="email" className={style.form_control} placeholder="Email Address" />
                                                <button type="submit">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                                                        <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={style.copyright}>
                    <div className={style.container}>
                        <div className={style.row}>
                            <div className={style.row_left}>
                                <span>Copyright © 2019, All Right Reserved</span>
                            </div>
                            {/* <div className={style.row_right}>
                                <div className={style.copyright_menu}>
                                    <ul>
                                        <li>
                                            <Link to="#">Home</Link>
                                        </li>
                                        <li>
                                            <Link to="#">Terms</Link>
                                        </li>
                                        <li>
                                            <Link to="#">Privacy Policy</Link>
                                        </li>
                                        <li>
                                            <Link to="#">Contact</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default FooterForm