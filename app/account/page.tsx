import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function AccountPage() {
  return (
    <ProtectedRoute>
      <div className="p-10">
        <h1 className="text-2xl font-bold">My Account</h1>
      </div>
    </ProtectedRoute>
  );
}
