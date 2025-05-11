import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

// Brutalist variants of Card components
const BrutalistCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Card
    ref={ref}
    className={cn(
      "border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0)] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-200 rounded-none",
      className
    )}
    {...props}
  />
))
BrutalistCard.displayName = "BrutalistCard"

const BrutalistCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <CardHeader
    ref={ref}
    className={cn("p-6 border-b-4 border-black", className)}
    {...props}
  />
))
BrutalistCardHeader.displayName = "BrutalistCardHeader"

const BrutalistCardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <CardTitle
    ref={ref}
    className={cn("text-2xl uppercase font-extrabold", className)}
    {...props}
  />
))
BrutalistCardTitle.displayName = "BrutalistCardTitle"

const BrutalistCardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <CardDescription
    ref={ref}
    className={cn("text-black font-mono", className)}
    {...props}
  />
))
BrutalistCardDescription.displayName = "BrutalistCardDescription"

const BrutalistCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <CardContent ref={ref} className={cn("p-6 pt-6", className)} {...props} />
))
BrutalistCardContent.displayName = "BrutalistCardContent"

const BrutalistCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <CardFooter
    ref={ref}
    className={cn("flex items-center p-6 pt-0 mt-2 border-t-4 border-black", className)}
    {...props}
  />
))
BrutalistCardFooter.displayName = "BrutalistCardFooter"

export {
  BrutalistCard,
  BrutalistCardHeader,
  BrutalistCardFooter,
  BrutalistCardTitle,
  BrutalistCardDescription,
  BrutalistCardContent
}