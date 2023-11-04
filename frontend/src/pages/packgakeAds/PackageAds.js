import React, { useState, useEffect } from 'react';
import Inputmask from 'react-input-mask';
import styles from './PackageAds.module.scss'
import classNames from 'classnames/bind'
import UpdateInfoSponsor from '~/components/Modal/UpdateInfoSponsor';
const cx = classNames.bind(styles)

function PackageAds() {
    const [showBuyPackageModal, setShowBuyPackageModal] = useState(false)
    const [activeTab, setActiveTab] = useState('credit-card');
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };
    return (
        <div className={cx('packageAds')}>
            <div className={cx('packageAds-container')}>
                {/* header package */}

                <div className={cx('header-ads')}>
                    <div className={cx('card-body')}>
                        <div class="container py-5">
                            <div class="row">
                                <div class="col-lg-6 mx-auto">
                                    <div class="card ">
                                        <div class="card-header">
                                            <div class="bg-white shadow-sm pt-4 pl-2 pr-2 pb-2">
                                                <ul role="tablist" className="nav bg-light nav-pills rounded nav-fill mb-3">
                                                    <li className="nav-item">
                                                        <a href="#credit-card" onClick={() => handleTabChange('credit-card')} className={`nav-link ${activeTab === 'credit-card' ? 'active' : ''}`}>
                                                            <i className="fas fa-credit-card mr-2"></i> Credit Card
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="#paypal" onClick={() => handleTabChange('paypal')} className={`nav-link ${activeTab === 'paypal' ? 'active' : ''}`}>
                                                            <i className="fab fa-paypal mr-2"></i> Paypal
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="#paypal" onClick={() => handleTabChange('paypal')} className={`nav-link ${activeTab === 'paypal' ? 'active' : ''}`}>
                                                            <i className="fab fa-paypal mr-2"></i> Paypal
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="#paypal" onClick={() => handleTabChange('paypal')} className={`nav-link ${activeTab === 'paypal' ? 'active' : ''}`}>
                                                            <i className="fab fa-paypal mr-2"></i> Paypal
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="#paypal" onClick={() => handleTabChange('paypal')} className={`nav-link ${activeTab === 'paypal' ? 'active' : ''}`}>
                                                            <i className="fab fa-paypal mr-2"></i> Paypal
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="tab-content">
                                                <div id="credit-card" className={`tab-pane fade ${activeTab === 'credit-card' ? 'show active' : ''}`}>


                                                </div>

                                                <div id="paypal" className={`tab-pane fade ${activeTab === 'paypal' ? 'show active' : ''}`}>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className={cx('type-package')}>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">package</th>
                                <th scope="col">tieu chi</th>
                                <th scope="col">Mo ta</th>
                                <th scope="col">Cost</th>
                                <th scope="col">Buy</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td onClick={() => setShowBuyPackageModal(true)} >Mua</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                <td>Mua</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td>@twitter</td>
                                <td>Mua</td>
                            </tr>
                        </tbody>
                    </table>
                </div>


            </div>
            {showBuyPackageModal && < UpdateInfoSponsor setShowBuyPackageModal={setShowBuyPackageModal} />}
        </div>

    );
}

export default PackageAds;