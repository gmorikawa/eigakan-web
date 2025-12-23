import { RemoveIcon, UpdateIcon } from "@/shared/icons";

import Stack from "@components/container/stack";
import Table from "@components/data/table";
import IconButton from "@components/input/icon-button";

import type { Video } from "@features/video/types/entity";
import { formatDate } from "@shared/utils/date";

export interface VideoTableProps {
    videos: Video[];

    onUpdate?: (video: Video) => void;
    onRemove?: (video: Video) => void;
}

export function VideoTable({ videos, onUpdate, onRemove }: VideoTableProps) {

    const update = (video: Video) => {
        onUpdate?.(video);
    };

    const remove = (video: Video) => {
        onRemove?.(video);
    };

    return (
        <Table>
            <thead>
                <tr>
                    <th>
                        Actions
                    </th>
                    <th style={{ width: "40%" }}>Title</th>
                    <th style={{ width: "10%" }}>Released At</th>
                    <th style={{ width: "10%" }}>Language</th>
                    <th style={{ width: "30%" }}>Tags</th>
                </tr>
            </thead>

            <tbody>
                {videos.map((video) => (
                    <tr key={video.id}>
                        <td>
                            <Stack direction="row">
                                <IconButton onClick={() => update(video)}><UpdateIcon /></IconButton>
                                <IconButton onClick={() => remove(video)} palette="danger"><RemoveIcon /></IconButton>
                            </Stack>
                        </td>
                        <td>{video.title}</td>
                        <td>{video.releasedAt ? formatDate(video.releasedAt) : ""}</td>
                        <td>{video.language ? video.language.name : ""}</td>
                        <td>{video.tags.join(", ")}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default VideoTable;