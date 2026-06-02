"use client";

import { useAuth } from "@/store/useAuth";
import { useEffect } from "react";

export default function AuthInitializer() {
  const fetchUser = useAuth((state) => state.fetchUser);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return null;
}
