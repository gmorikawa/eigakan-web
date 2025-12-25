import useParams from "@hooks/params";

import { usePageMetadata } from "@layout/page";

import { VideoPlayer } from "@features/video/components/video-player";
import { useVideoController } from "@features/video/hooks/video-controller";

import { Container } from "@/components/container/container";

export function VideoPlayPage() {
    usePageMetadata({ title: "Video Play" });

    const { id } = useParams();
    const controller = useVideoController();

    return (
        <Container>
            <VideoPlayer src={controller.downloadUrl(id)} />
        </Container>
    );
}

export default VideoPlayPage;