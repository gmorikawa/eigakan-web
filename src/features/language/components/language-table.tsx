import { RemoveIcon, UpdateIcon } from "@/shared/icons";

import Stack from "@components/container/stack";
import Table from "@components/data/table";
import IconButton from "@components/input/icon-button";

import type { Language } from "@features/language/types/entity";

export interface LanguageTableProps {
    languages: Language[];

    onUpdate?: (language: Language) => void;
    onRemove?: (language: Language) => void;
}

export function LanguageTable({ languages, onUpdate, onRemove }: LanguageTableProps) {

    const update = (language: Language) => {
        onUpdate?.(language);
    };

    const remove = (language: Language) => {
        onRemove?.(language);
    };

    return (
        <Table>
            <thead>
                <tr>
                    <th>
                        Actions
                    </th>
                    <th style={{ width: "40%" }}>Language</th>
                    <th style={{ width: "50%" }}>ISO Code</th>
                </tr>
            </thead>

            <tbody>
                {languages.map((language) => (
                    <tr key={language.id}>
                        <td>
                            <Stack direction="row">
                                <IconButton onClick={() => update(language)}><UpdateIcon /></IconButton>
                                <IconButton onClick={() => remove(language)} palette="danger"><RemoveIcon /></IconButton>
                            </Stack>
                        </td>
                        <td>{language.name}</td>
                        <td>{language.code}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default LanguageTable;