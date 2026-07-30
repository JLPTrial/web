import { useEffect, useRef, useState } from "react";
import { LeafButton } from './LeafButton.tsx';

interface AudioPlayerProps {
    src: string;
}

export default function AudioPlayer({ src }: AudioPlayerProps) {

    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [playing, setPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(
        () => {
            const audio = audioRef.current;
            if (!audio) { return; }

            const handleLoadedMetadata = () => { setDuration(audio.duration); };
            const handleTimeUpdate = () => { setCurrentTime(audio.currentTime); };
            const handlePlay = () => setPlaying(true);
            const handlePause = () => setPlaying(false);
            const handleEnded = () => setPlaying(false);

            audio.addEventListener("loadedmetadata", handleLoadedMetadata);
            audio.addEventListener("timeupdate", handleTimeUpdate);
            audio.addEventListener("play", handlePlay);
            audio.addEventListener("pause", handlePause);
            audio.addEventListener("ended", handleEnded);

            return () => {
                audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
                audio.removeEventListener("timeupdate", handleTimeUpdate);
                audio.removeEventListener("play", handlePlay);
                audio.removeEventListener("pause", handlePause);
                audio.removeEventListener("ended", handleEnded);
            };
        },
        []
    );


    const restartPlay = async () => {
        const audio = audioRef.current;
        if (!audio) { return; }

        audio.currentTime = 0;
    }

    
    const togglePlay = async () => {
        const audio = audioRef.current;
        if (!audio) { return; }

        if (audio.paused) { await audio.play(); }
        else { audio.pause(); }
    };


    const moveSlider = (element: React.ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        if (!audio) { return; }

        const time = Number(element.target.value);
        audio.currentTime = time;
        setCurrentTime(time);
    };


    const formatTime = (seconds: number) => {

        if (!Number.isFinite(seconds)) { return ("0:00"); }

        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);

        return (`${mins}:${secs.toString().padStart(2, "0")}`);
    };


    return (
        <div className="w-full rounded-md border-2 border-[rgb(230,230,230)] dark:border-gray-600 bg-white dark:bg-gray-800 p-4 shadow">

            <audio
                ref={audioRef}
                src={src}
                preload="metadata"
            />

            <div className="flex flex-col-reverse md:flex-row items-center gap-4">

                <div className="flex flex-row gap-1">
                    <LeafButton onClick={restartPlay} shape={"square"} text_size={"larger"} >
                        ⏮
                    </LeafButton>

                    <LeafButton onClick={togglePlay} shape={"square"} text_size={"larger"} >
                        {playing ? "❚❚" : "▶"}
                    </LeafButton>
                </div>

                <div className="flex-1 w-full px-2">
                    <input
                        type="range"
                        min={0}
                        max={duration || 0}
                        value={currentTime}
                        onChange={moveSlider}
                        className="w-full h-2 cursor-pointer bg-gray-200 accent-[rgb(255,0,0)] rounded-lg pointer-events: auto"
                    />

                    <div className="mt-1 flex justify-between text-xs text-slate-500">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>

                </div>
            </div>
        </div>
    );
}