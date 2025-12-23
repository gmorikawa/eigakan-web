import { useTitle } from "@hooks/title";

import { useVideoListController } from "@features/video/hooks/video-list-controller";

import Container from "@/components/container/container";
import VideoTable from "@features/video/components/video-table";
import Button from "@components/input/button";

export function VideoListPage() {
    useTitle("Video List");
    const videos = useVideoListController();

    return (
        <Container>
            <Button onClick={videos.handleCreate}>
                Create New Video
            </Button>

            <VideoTable
                videos={videos.data}
                onUpdate={videos.handleUpdate}
                onRemove={videos.handleRemove}
            />
        </Container>
    );
}

export default VideoListPage;