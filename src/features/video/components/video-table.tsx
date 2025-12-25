import { PlayIcon, RemoveIcon, UpdateIcon } from "@/shared/icons";
import { formatDate } from "@shared/utils/date";

import type { Video } from "@features/video/types/entity";

import { IconButton } from "@components/input/icon-button";
import { Stack } from "@components/container/stack";
import { Table } from "@components/data/table";

export interface VideoTableProps {
    videos: Video[];

    onPlay?: (video: Video) => void;
    onUpdate?: (video: Video) => void;
    onRemove?: (video: Video) => void;
}

export function VideoTable({ videos, onPlay, onUpdate, onRemove }: VideoTableProps) {

    const play = (video: Video) => {
        onPlay?.(video);
    };

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
                                <IconButton onClick={() => play(video)}><PlayIcon /></IconButton>
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