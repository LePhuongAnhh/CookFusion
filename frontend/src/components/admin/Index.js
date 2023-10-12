import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom'
import style from "./Index.module.css"
import HeaderAdmin from './HeaderAdmin';

import phanh from "../../image/phanh.jpg"

function Index() {
    return (
        <body>
            {/* Begin page  */}
            <div id="wrapper">
                <HeaderAdmin />
                <div className={style.content_page}>
                    {/* <!-- Start Content--> */}
                    <div className={style.container_fluid}>
                        {/* <!-- start page title --> */}
                        <div className={style.row}>
                            <div className={style.col_12}>
                                <div className={style.page_title_box}>
                                    {/* <div className={style.page_title_right}>
                                        <ol className={style.breadcrumb}>
                                            <li className={style.breadcrumb_item}><a href="javascript: void(0);">Abstack</a></li>
                                            <li className={style.breadcrumb_item_active}>Dashboard</li>
                                        </ol>
                                    </div> */}
                                    <h4 className={style.page_title}>Dashboard</h4>
                                </div>
                            </div>
                        </div>
                        {/* <!-- end page title -->  */}

                        <div className={style.row}>
                            {/* account  */}
                            <div className={style.layout_page}>
                                {/* header */}
                                <div className={style.header_info}>
                                    <div className={style.header_gird}>
                                        <div className={style.account_setting}>
                                            <button className={style.action_btn}>
                                                <div className={style.item_setting}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                                                    </svg>
                                                    <span className={style.title_account}> Account</span>
                                                </div>
                                            </button>
                                            <button className={style.action_btn}>
                                                <div className={style.item_setting}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-unlock" viewBox="0 0 16 16">
                                                        <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z" />
                                                    </svg>
                                                    <span className={style.title_account}> Security</span>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* body  */}
                                <div className={style.body_info}>
                                    <div className={style.body_info_card}>
                                        <form>
                                            <div className={style.body_container}>
                                                {/* update avatar  */}
                                                <div className={style.update_avt}>
                                                    <div className={style.update_gird}>
                                                        <img src={phanh} className={style.show_avt} />
                                                        <div className={style.update_right}>
                                                            <label className={style.update_photo}>
                                                                Update new photo
                                                            </label>
                                                            <span className={style.text_name}>Allowed PNG or JPEG. Max size of 800K.</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* update info  */}
                                                <div className={style.info_item}>
                                                    <div className={style.info_gird}>
                                                        <label className={style.form_control}>Username</label>
                                                        <div className={style.input_info}>
                                                            <input type='text' className={style.show_info}></input>
                                                            <fieldset className={style.outline}>
                                                                <legend className={style.css_lg}>
                                                                    <span>Username</span>
                                                                </legend>
                                                            </fieldset>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className={style.info_item}>
                                                    <div className={style.info_gird}>
                                                        <label className={style.form_control}>Username</label>
                                                        <div className={style.input_info}>
                                                            <input type='text' className={style.show_info}></input>
                                                            <fieldset className={style.outline}>
                                                                <legend className={style.css_lg}>
                                                                    <span>Username</span>
                                                                </legend>
                                                            </fieldset>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className={style.info_item}>
                                                    <div className={style.info_gird}>
                                                        <label className={style.form_control}>Username</label>
                                                        <div className={style.input_info}>
                                                            <input type='text' className={style.show_info}></input>
                                                            <fieldset className={style.outline}>
                                                                <legend className={style.css_lg}>
                                                                    <span>Username</span>
                                                                </legend>
                                                            </fieldset>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className={style.info_item}>
                                                    <div className={style.info_gird}>
                                                        <label className={style.form_control}>Username</label>
                                                        <div className={style.input_info}>
                                                            <input type='text' className={style.show_info}></input>
                                                            <fieldset className={style.outline}>
                                                                <legend className={style.css_lg}>
                                                                    <span>Username</span>
                                                                </legend>
                                                            </fieldset>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className={style.info_item}>
                                                    <div className={style.info_gird}>
                                                        <label className={style.form_control}>Username</label>
                                                        <div className={style.input_info}>
                                                            <input type='text' className={style.show_info}></input>
                                                            <fieldset className={style.outline}>
                                                                <legend className={style.css_lg}>
                                                                    <span>Username</span>
                                                                </legend>
                                                            </fieldset>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={style.info_item}>
                                                    <div className={style.info_gird}>
                                                        <label className={style.form_control}>Username</label>
                                                        <div className={style.input_info}>
                                                            <input type='text' className={style.show_info}></input>
                                                            <fieldset className={style.outline}>
                                                                <legend className={style.css_lg}>
                                                                    <span>Username</span>
                                                                </legend>
                                                            </fieldset>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={style.info_item}>
                                                    <div className={style.info_gird}>
                                                        <label className={style.form_control}>Username</label>
                                                        <div className={style.input_info}>
                                                            <input type='text' className={style.show_info}></input>
                                                            <fieldset className={style.outline}>
                                                                <legend className={style.css_lg}>
                                                                    <span>Username</span>
                                                                </legend>
                                                            </fieldset>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className={style.save_change}>
                                                    <button className={style.btn_save}>Save changes</button>
                                                    <button className={style.btn_reset}>Reset</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- end page title --> */}
                    </div>
                </div>
            </div>
        </body >
    )
}
export default Index