"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/account/login");
    }
  }, [user, router]);

  // Optional: show loading while checking
  if (!user) {
    return <div className="p-10">Checking authentication...</div>;
  }

  return <>{children}</>;
}
