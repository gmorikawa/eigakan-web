import { usePageMetadata } from "@layout/page";

import { useVideoListController } from "@features/video/hooks/video-list-controller";
import { VideoTable } from "@features/video/components/video-table";

import { Button } from "@components/input/button";
import { Container } from "@/components/container/container";

export function VideoListPage() {
    usePageMetadata({ title: "Video List" });
    const videos = useVideoListController();

    return (
        <Container>
            <Button onClick={videos.handleCreate}>
                Create New Video
            </Button>

            <VideoTable
                videos={videos.data}
                onPlay={videos.handlePlay}
                onUpdate={videos.handleUpdate}
                onRemove={videos.handleRemove}
            />
        </Container>
    );
}

export default VideoListPage;