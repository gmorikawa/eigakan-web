import { useSession } from "@features/auth/hooks/session";
import type { UserRole } from "@features/user/types/enums";

export interface RestrictedContentProps extends React.PropsWithChildren {
    allowedRoles: UserRole[];
}

export function RestrictedContent({ allowedRoles, children }: RestrictedContentProps) {
    const session = useSession();

    return (!session.loggedUser || !allowedRoles.includes(session.loggedUser.role))
        ? null
        : children;
}

export default RestrictedContent;