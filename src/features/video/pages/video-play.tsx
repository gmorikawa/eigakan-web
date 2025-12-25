import { useEffect, useState } from "react";

import useParams from "@hooks/params";

import { usePageMetadata } from "@layout/page";

import { VideoPlayer } from "@features/video/components/video-player";
import { useVideoController } from "@features/video/hooks/video-controller";

import { Container } from "@/components/container/container";

export function VideoPlayPage() {
    usePageMetadata({ title: "Video Play" });

    const [url, setUrl] = useState<string | null>(null);

    const { id } = useParams();
    const controller = useVideoController();

    useEffect(() => {
        controller.download(id)
            .then((blob: Blob | null) => {
                if (blob) {
                    setUrl(URL.createObjectURL(blob));
                }
            })
            .catch((error) => {
                console.error("Error downloading video:", error);
            });

        return () => {
            console.info("Cleaning up video URL", id);
            URL.revokeObjectURL(url!);
        }
    }, []);
    return (
        <Container>
            {url && (<VideoPlayer src={url} />)}
        </Container>
    );
}

export default VideoPlayPage;