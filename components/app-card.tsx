import Link from "next/link"
import { StarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface AppCardProps {
  app: {
    id: string
    name: string
    description: string
    category: string
    rating: number
    reviews: number
    status: "approved" | "pending" | "requested"
    tags: string[]
    icon: string
  }
}

export function AppCard({ app }: AppCardProps) {
  const statusColors = {
    approved: "bg-corporate-green/10 text-corporate-green",
    pending: "bg-corporate-orange/10 text-corporate-orange",
    requested: "bg-corporate-blue/10 text-corporate-blue",
  }

  return (
    <Link href={`/catalog/${app.id}`} className="block">
      <div className="group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
        <div className="p-4">
          <div className="flex items-center space-x-4">
            <img
              src={app.icon || "/placeholder.svg"}
              alt={`${app.name} icon`}
              className="h-12 w-12 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-pretty">{app.name}</h3>
              <p className="text-sm text-muted-foreground">{app.category}</p>
            </div>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{app.description}</p>
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                <p>{app.description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{app.rating.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground">({app.reviews} reviews)</span>
              <span className="sr-only">
                {app.rating.toFixed(1)} out of 5 stars with {app.reviews} reviews
              </span>
            </div>
            <Badge className={cn("text-xs font-medium", statusColors[app.status])}>
              {app.status === "approved" && "Approved"}
              {app.status === "pending" && "Pending"}
              {app.status === "requested" && "Requested"}
            </Badge>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {app.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-muted text-muted-foreground text-xs font-medium">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
