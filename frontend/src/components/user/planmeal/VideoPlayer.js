import React from 'react';
import style from "./VideoPlayer.module.css"
import VideoAutomatic from "../../../image/Yellow How To Plan Dinner Meals Video.mp4"
function VideoPlayer() {
    return (
        <div >
            <video controls loop className={style.video_contain}>
                <source src={VideoAutomatic} type="video/mp4" />
            </video>
        </div>
    );
}

export default VideoPlayer;
