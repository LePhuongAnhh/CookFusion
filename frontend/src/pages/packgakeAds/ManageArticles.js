function ManageArticles() {
    const [showBuyPackageModal, setShowBuyPackageModal] = useState(false)
    return (

        <>
            <div className={cx('manageArticles')}>
                <div className={cx('manageArticles-container')}>
                    <div>
                        active post
                    </div>

                </div>
            </div>
            {showBuyPackageModal && < UpdateInfoSponsor setShowBuyPackageModal={setShowBuyPackageModal} />}
        </>
    );
}

export default ManageArticles;