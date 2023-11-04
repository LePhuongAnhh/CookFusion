import React, { useState, useEffect } from 'react';
import Inputmask from 'react-input-mask';
import styles from './PackageAds.module.scss'
import classNames from 'classnames/bind'
import UpdateInfoSponsor from '~/components/Modal/UpdateInfoSponsor';
const cx = classNames.bind(styles)

function PackageAds() {
    const [showBuyPackageModal, setShowBuyPackageModal] = useState(false)
    return (
        <div className={cx('packageAds')}>
            <div className={cx('packageAds-container')}>
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