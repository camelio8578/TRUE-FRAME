import { trpc } from "@/providers/trpc";
import { useCallback, useMemo } from "react";

export interface UnifiedUser {
  id: number;
  name: string;
  email?: string | null;
  avatar?: string | null;
  role: string;
}

export function useAuth() {
  const utils = trpc.useUtils();

  const {
    data: oauthUser,
    isLoading: oauthLoading,
  } = trpc.auth.me.useQuery(undefined, {
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  const {
    data: localUser,
    isLoading: localLoading,
  } = trpc.localAuth.me.useQuery(undefined, {
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: async () => {
      await utils.invalidate();
    },
  });

  const user: UnifiedUser | null = useMemo(() => {
    if (oauthUser) {
      return {
        id: oauthUser.id,
        name: oauthUser.name || "User",
        email: oauthUser.email,
        avatar: oauthUser.avatar,
        role: oauthUser.role,
      };
    }
    if (localUser) {
      return {
        id: localUser.id,
        name: localUser.name || localUser.username || "User",
        email: null,
        avatar: null,
        role: localUser.role,
      };
    }
    return null;
  }, [oauthUser, localUser]);

  const logout = useCallback(() => {
    // Always clear local auth token
    localStorage.removeItem("local_auth_token");
    // Always call OAuth logout (clears cookie)
    logoutMutation.mutate(undefined, {
      onSettled: () => {
        window.location.reload();
      },
    });
  }, [logoutMutation]);

  const isLoading = oauthLoading || localLoading;

  return useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      isAdmin: user?.role === "admin",
      logout,
    }),
    [user, isLoading, logout],
  );
}
