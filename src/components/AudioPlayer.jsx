// import {getClientAudioFiles} from "../API/axiosClient";
import useFetch from "../hooks/useFetch";
import {useMemo} from "react";
import LoadingSpinner from "./LoadingSpinner";
import {getClient} from "../API/axiosClient";

const AudioPlayer = ({fileName}) => {
    const { data: audioFile, error, isLoading} = useFetch(`/streaming/${fileName}`,getClient(), true, {responseType: 'blob'})

    const memoizedAudioFile = useMemo(() => audioFile, [audioFile]);

    if(isLoading)
        return <LoadingSpinner text='Fetching your book...'/>

    if(error)
        return null;

    return (
        <div>
            <div>
                <audio controls>
                    <source src={URL.createObjectURL(memoizedAudioFile)} type="audio/mp3" />
                    Your browser does not support the audio element.
                </audio>
            </div>
        </div>
    );
};

export default AudioPlayer;