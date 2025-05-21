import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

// Modern refined variants of Card components
const RefinedCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Card
    ref={ref}
    className={cn(
      "border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 rounded-none flex flex-col h-full",
      className
    )}
    {...props}
  />
))
RefinedCard.displayName = "RefinedCard"

const RefinedCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <CardHeader
    ref={ref}
    className={cn("m-0 p-0 bg-slate-900", className)}
    {...props}
  />
))
RefinedCardHeader.displayName = "RefinedCardHeader"

const RefinedCardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <CardTitle
    ref={ref}
    className={cn("m-0 p-0 text-2xl font-bold text-amber-400", className)}
    {...props}
  />
))
RefinedCardTitle.displayName = "RefinedCardTitle"

const RefinedCardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <CardDescription
    ref={ref}
    className={cn("text-amber-400", className)}
    {...props}
  />
))
RefinedCardDescription.displayName = "RefinedCardDescription"

const RefinedCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <CardContent ref={ref} className={cn("m-0 p-0 flex-grow", className)} {...props} />
))
RefinedCardContent.displayName = "RefinedCardContent"

const RefinedCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <CardFooter
    ref={ref}
    className={cn("flex justify-end items-centerpt-0 mt-auto", className)}
    {...props}
  />
))
RefinedCardFooter.displayName = "RefinedCardFooter"

export {
  RefinedCard,
  RefinedCardHeader,
  RefinedCardFooter,
  RefinedCardTitle,
  RefinedCardDescription,
  RefinedCardContent
}
