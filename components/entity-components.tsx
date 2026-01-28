import { PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

type EntityHeaderProps = {
  title: string,
  description?: string,
  newButtonLabel?: string,
  disabled?: boolean,
  isCreating?: boolean
} & (
  | { onNew: () => void; newButtonHref?: never }
  | { newButtonHref: string; onNew?: never }
  | { onNew?: never; newButtonHref?: never }
)

export const EntityHeader = ({
  title,
  description,
  newButtonLabel,
  disabled,
  isCreating,
  onNew,
  newButtonHref
}: EntityHeaderProps) => {
  return (
    <div className="flex items-center justify-between gap-x-4">
      <div className="flex flex-col">
        <h1 className="text-lg md:text-xl font-semibold">{title}</h1>
        {description && <p className="text-xs md:text-sm text-muted-foreground">{description}</p>}
      </div>
      {onNew && !newButtonHref && (
        <Button onClick={onNew} disabled={isCreating || disabled} size="sm">
          <PlusIcon className="size-4"/>
          {newButtonLabel}
        </Button>
      )}
      {newButtonHref && !onNew && (
        <Button asChild disabled={isCreating || disabled} size="sm">
          <Link href={newButtonHref}>
            <PlusIcon className="size-4"/>
            {newButtonLabel}
          </Link>
        </Button>
      )}
    </div>
  )
}

type EntityContainerrProps = {
  children: React.ReactNode,
  header?: React.ReactNode,
  search?: React.ReactNode,
  pagination?: React.ReactNode
}

export const EntityContainer = ({
  children,
  header,
  search,
  pagination
}: EntityContainerrProps) => {
  return (
    <div className="p-4 md:px-10 md:py-6 h-full">
      <div className="h-full w-full mx-auto max-w-7xl flex flex-col gap-y-8">
        {header}
        <div className="flex flex-col gap-y-4 h-full">
          {search}
          {children}
        </div>
        {pagination}
      </div>
    </div>
  )
}