"use client";

import { authClient } from "@/server/better-auth/client";

export default function OrganizationsDemo() {
  const { data: organizations } = authClient.useListOrganizations();
  const { data: activeOrg } = authClient.useActiveOrganization();

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Organizations Demo</h1>

      <div className="mb-8">
        <h2 className="mb-2 text-xl">Your Organizations</h2>
        {!organizations?.length && (
          <p className="text-gray-600">
            No organizations yet. Create one to get started!
          </p>
        )}
        {organizations?.map((org) => (
          <div key={org.id} className="mb-2 rounded border p-4">
            <div className="font-semibold">{org.name}</div>
            <div className="text-sm text-gray-600">{org.slug}</div>
            {activeOrg?.id === org.id && (
              <span className="text-xs text-green-600">Active</span>
            )}
            <button
              onClick={() =>
                authClient.organization.setActive({ organizationId: org.id })
              }
              className="mt-2 rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
            >
              Set Active
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
