"use client";

import SignUpPage from "../../../components/sign-up/sign-up";
import { ProfileForm } from "@/components/dashboard/settings/profile/profile";

import { Separator } from "@/components/ui/separator"

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  )
}