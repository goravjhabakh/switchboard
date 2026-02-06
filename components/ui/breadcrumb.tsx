import * as React from "react"
import { ChevronRight, MoreHorizontal } from "lucide-react"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * Breadcrumb navigation container used to wrap breadcrumb items.
 *
 * @returns A <nav> element with `aria-label="breadcrumb"` and `data-slot="breadcrumb"`.
 */
function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />
}

/**
 * Renders an ordered list element styled and annotated to serve as a breadcrumb list.
 *
 * @param className - Additional CSS classes to merge with the component's default breadcrumb list styles
 * @returns The rendered `<ol>` element configured for use as a breadcrumb list
 */
function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a breadcrumb list item with default inline layout and spacing.
 *
 * @returns A `<li>` element configured as a breadcrumb item
 */
function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  )
}

/**
 * Render a breadcrumb link element that conditionally delegates rendering to a child component.
 *
 * When `asChild` is true the component uses the provided child element instead of a native anchor;
 * otherwise it renders a standard `<a>` element. The rendered element receives a `data-slot="breadcrumb-link"`
 * attribute, default hover/transition styles, and any additional props passed to the component.
 *
 * @param asChild - If `true`, render the provided child component in place of a native `<a>` element.
 * @param className - Additional CSS class names merged with the component's default hover and transition styles.
 * @returns A React element representing the breadcrumb link; renders an `<a>` by default or the delegated child when `asChild` is `true`.
 */
function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot.Root : "a"

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn("hover:text-foreground transition-colors", className)}
      {...props}
    />
  )
}

/**
 * Render the current breadcrumb page as a non-interactive span.
 *
 * Renders a <span> used for the active breadcrumb item and adds accessibility attributes (`role="link"`, `aria-current="page"`, `aria-disabled="true"`) and `data-slot="breadcrumb-page"`. Merges `className` with default typography classes.
 *
 * @param className - Additional CSS class names to apply to the span
 * @returns A span element representing the current breadcrumb page
 */
function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-foreground font-normal", className)}
      {...props}
    />
  )
}

/**
 * Renders a breadcrumb separator list item.
 *
 * @param children - Optional content to display as the separator; when omitted a `ChevronRight` icon is rendered.
 * @param className - Additional class names applied to the list item.
 * @returns The `<li>` element used as the breadcrumb separator.
 */
function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  )
}

/**
 * Renders an ellipsis separator used when breadcrumb items are collapsed.
 *
 * @returns A <span> element containing a visual ellipsis icon and a screen-reader-only "More" label
 */
function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}