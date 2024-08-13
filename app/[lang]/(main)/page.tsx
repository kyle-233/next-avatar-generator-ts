import React from 'react'
import { AvatarActionBar } from './_components/avatar-action-bar'
import { AvatarActionGroup } from './_components/avatar-action-group'
import { AvatarContent } from './_components/avatar-content'

export default async function Home({
  params: { lang },
}: {
  params: { lang: string }
}) {
  return (
    <div className="flex h-full flex-col justify-center items-center py-8">
      <AvatarContent />
      <div className="mt-20">
        <AvatarActionBar />
      </div>
      <AvatarActionGroup />
    </div>
  )
}
