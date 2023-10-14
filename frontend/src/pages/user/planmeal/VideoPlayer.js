import React from 'react';
import styles from "./VideoPlayer.module.scss"
import classNames from 'classnames/bind'
import VideoAutomatic from "../../../image/Yellow How To Plan Dinner Meals Video.mp4"
const cx = classNames.bind(styles)
function VideoPlayer() {
    return (
        <div >
            <video controls loop className={cx('video_contain')}>
                <source src={VideoAutomatic} type="video/mp4" />
            </video>
        </div>
    );
}

export default VideoPlayer;
