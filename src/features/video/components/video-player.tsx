import { useRef, useState } from "react";

import Container from "@components/container/container";

export interface VideoPlayerProps {
    src: string;
    muted?: boolean;
    autoPlay?: boolean;
}

export function VideoPlayer({ src, muted, autoPlay }: VideoPlayerProps) {
    const [isPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handlePlayPauseClick = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
        }
    };

    return (
        <Container>
            <video
                autoPlay={autoPlay}
                muted={muted}
                src={src}
                onClick={handlePlayPauseClick}
                style={{
                    flexShrink: 1,
                    display: "block",
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: "10px"
                }}
                controls
            />
        </Container>
    );
}