"use client"

import { notFound } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { StarIcon, CheckCircleIcon, ClockIcon, XCircleIcon, PlayCircleIcon, UsersIcon, ShieldIcon, ArrowLeftIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

// Extended mock data with detailed information
const extendedApps = [
  {
    id: "1",
    name: "Project Management Pro",
    description: "Streamline your team's workflow with advanced project tracking, resource allocation, and milestone management features.",
    category: "Productivity",
    rating: 4.5,
    reviews: 128,
    status: "approved" as const,
    tags: ["teamwork", "planning", "collaboration"],
    icon: "/placeholder.svg",
    features: [
      "Real-time project tracking with Gantt charts",
      "Resource allocation and workload management",
      "Automated milestone notifications",
      "Team collaboration tools with file sharing",
      "Integration with calendar systems",
      "Advanced reporting and analytics"
    ],
    accessRequirements: "Self-service installation available. Requires basic user permissions.",
    systemRequirements: [
      "Web browser: Chrome 90+, Firefox 88+, Safari 14+",
      "Operating System: Windows 10+, macOS 10.15+, Linux",
      "RAM: 4GB minimum, 8GB recommended",
      "Internet connection: Broadband recommended"
    ],
    screenshots: ["/placeholder.jpg", "/placeholder.jpg", "/placeholder.jpg"],
    developer: "TechCorp Solutions",
    supportContact: "support@techcorp.com",
    cost: "Free for basic plan, $15/user/month for premium",
    reviewsData: [
      {
        author: "Sarah Johnson",
        rating: 5,
        comment: "This app has revolutionized how our team manages projects. The interface is intuitive and the features are exactly what we needed.",
        date: "2024-01-15"
      },
      {
        author: "Mike Chen",
        rating: 4,
        comment: "Great tool overall, but could use better mobile support. Still, highly recommended for project management.",
        date: "2024-01-10"
      }
    ],
    relatedApps: ["2", "4", "6"]
  },
  {
    id: "2",
    name: "Data Analytics Suite",
    description: "Powerful analytics platform for business intelligence, data visualization, and automated reporting.",
    category: "Business Intelligence",
    rating: 4.8,
    reviews: 256,
    status: "approved" as const,
    tags: ["analytics", "reporting", "dashboard"],
    icon: "/placeholder.svg",
    features: [
      "Interactive dashboards and data visualizations",
      "Automated report generation",
      "Real-time data processing",
      "Advanced analytics with AI insights",
      "Custom query builder",
      "Multi-source data integration"
    ],
    accessRequirements: "Requires IT approval for data access permissions. Security training recommended.",
    systemRequirements: [
      "Web browser: Chrome 90+, Firefox 88+, Safari 14+",
      "Operating System: Windows 10+, macOS 10.15+",
      "RAM: 8GB minimum, 16GB recommended",
      "Storage: 100GB free space",
      "Internet connection: High-speed broadband required"
    ],
    screenshots: ["/placeholder.jpg", "/placeholder.jpg", "/placeholder.jpg"],
    developer: "DataViz Inc.",
    supportContact: "help@dataviz.com",
    cost: "$25/user/month",
    reviewsData: [
      {
        author: "Alex Rodriguez",
        rating: 5,
        comment: "Incredible insights and easy to use. Our team's productivity has increased significantly.",
        date: "2024-01-20"
      },
      {
        author: "Emma Davis",
        rating: 5,
        comment: "The AI insights are game-changing. No more manual reporting!",
        date: "2024-01-18"
      }
    ],
    relatedApps: ["1", "4", "5"]
  },
  {
    id: "3",
    name: "HR Management System",
    description: "Comprehensive HR solution for employee onboarding, performance tracking, and benefits administration.",
    category: "Human Resources",
    rating: 4.2,
    reviews: 89,
    status: "pending" as const,
    tags: ["hr", "employee", "management"],
    icon: "/placeholder.svg",
    features: [
      "Employee onboarding workflows",
      "Performance review management",
      "Benefits administration",
      "Time tracking and attendance",
      "Employee self-service portal",
      "Compliance reporting"
    ],
    accessRequirements: "Requires HR department approval. Access limited to authorized personnel only.",
    systemRequirements: [
      "Web browser: Chrome 90+, Firefox 88+, Safari 14+",
      "Operating System: Windows 10+, macOS 10.15+",
      "RAM: 4GB minimum, 8GB recommended",
      "Database: PostgreSQL 12+ or compatible"
    ],
    screenshots: ["/placeholder.jpg", "/placeholder.jpg", "/placeholder.jpg"],
    developer: "HR Solutions Ltd.",
    supportContact: "hrsupport@hrsolutions.com",
    cost: "$20/user/month",
    reviewsData: [
      {
        author: "Jennifer Wong",
        rating: 4,
        comment: "Good HR tool, but the interface could be more modern. Functionality is solid though.",
        date: "2024-01-12"
      },
      {
        author: "David Park",
        rating: 4,
        comment: "Makes HR processes much more efficient. Support team is responsive.",
        date: "2024-01-08"
      }
    ],
    relatedApps: ["5", "6"]
  },
  {
    id: "4",
    name: "Financial Planning Tool",
    description: "Advanced financial modeling and forecasting tool with scenario analysis and risk assessment.",
    category: "Finance",
    rating: 4.6,
    reviews: 167,
    status: "approved" as const,
    tags: ["finance", "planning", "forecasting"],
    icon: "/placeholder.svg",
    features: [
      "Advanced financial modeling",
      "Scenario analysis and stress testing",
      "Risk assessment tools",
      "Automated forecasting",
      "Integration with accounting systems",
      "Real-time financial reporting"
    ],
    accessRequirements: "Requires finance department approval. Training recommended for complex features.",
    systemRequirements: [
      "Web browser: Chrome 90+, Firefox 88+, Safari 14+",
      "Operating System: Windows 10+, macOS 10.15+",
      "RAM: 8GB minimum, 16GB recommended",
      "Microsoft Excel 2016+ for advanced features"
    ],
    screenshots: ["/placeholder.jpg", "/placeholder.jpg", "/placeholder.jpg"],
    developer: "FinanceTech Corp",
    supportContact: "finance@financetech.com",
    cost: "$30/user/month",
    reviewsData: [
      {
        author: "Robert Kim",
        rating: 5,
        comment: "Essential tool for our finance team. The forecasting accuracy is impressive.",
        date: "2024-01-22"
      },
      {
        author: "Lisa Thompson",
        rating: 4,
        comment: "Powerful features, but steep learning curve. Worth it for finance professionals.",
        date: "2024-01-19"
      }
    ],
    relatedApps: ["2", "6"]
  },
  {
    id: "5",
    name: "Customer Support Hub",
    description: "AI-powered customer support platform with ticketing, knowledge base, and live chat capabilities.",
    category: "Customer Service",
    rating: 4.4,
    reviews: 203,
    status: "requested" as const,
    tags: ["support", "ai", "chat"],
    icon: "/placeholder.svg",
    features: [
      "AI-powered ticket routing",
      "Live chat integration",
      "Knowledge base management",
      "Customer analytics",
      "Multi-channel support",
      "Automated responses"
    ],
    accessRequirements: "Self-service available. Requires customer service role assignment.",
    systemRequirements: [
      "Web browser: Chrome 90+, Firefox 88+, Safari 14+",
      "Operating System: Windows 10+, macOS 10.15+",
      "RAM: 4GB minimum, 8GB recommended",
      "Internet connection: Stable broadband"
    ],
    screenshots: ["/placeholder.jpg", "/placeholder.jpg", "/placeholder.jpg"],
    developer: "SupportAI Solutions",
    supportContact: "support@supportai.com",
    cost: "$18/user/month",
    reviewsData: [
      {
        author: "Maria Garcia",
        rating: 4,
        comment: "The AI features are helpful, but sometimes misroute tickets. Overall good.",
        date: "2024-01-14"
      },
      {
        author: "Tom Wilson",
        rating: 5,
        comment: "Reduced our response time by 50%. Customer satisfaction is up!",
        date: "2024-01-11"
      }
    ],
    relatedApps: ["2", "3"]
  },
  {
    id: "6",
    name: "Inventory Control System",
    description: "Real-time inventory tracking with automated reordering, stock alerts, and supplier management.",
    category: "Operations",
    rating: 4.3,
    reviews: 145,
    status: "approved" as const,
    tags: ["inventory", "tracking", "automation"],
    icon: "/placeholder.svg",
    features: [
      "Real-time inventory tracking",
      "Automated reordering alerts",
      "Supplier management",
      "Barcode scanning support",
      "Multi-location support",
      "Inventory analytics"
    ],
    accessRequirements: "Requires operations or warehouse role. IT approval for system integration.",
    systemRequirements: [
      "Web browser: Chrome 90+, Firefox 88+, Safari 14+",
      "Operating System: Windows 10+, macOS 10.15+, iOS 14+",
      "RAM: 4GB minimum, 8GB recommended",
      "Barcode scanner support (optional)"
    ],
    screenshots: ["/placeholder.jpg", "/placeholder.jpg", "/placeholder.jpg"],
    developer: "InventoryPro Systems",
    supportContact: "inventory@inventorypro.com",
    cost: "$12/user/month",
    reviewsData: [
      {
        author: "Kevin Brown",
        rating: 4,
        comment: "Helps keep our inventory accurate. Mobile app is a great addition.",
        date: "2024-01-16"
      },
      {
        author: "Rachel Lee",
        rating: 4,
        comment: "Automated alerts save us from stockouts. Reliable system.",
        date: "2024-01-13"
      }
    ],
    relatedApps: ["1", "4"]
  }
]

export default function AppDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  const { toast } = useToast()

  // Find the app by ID, fallback to mock data
  const app = extendedApps.find(app => app.id === id)

  if (!app) {
    notFound()
  }

  // State for dialog and form
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [appStatus, setAppStatus] = useState(app.status)
  const [reason, setReason] = useState("")
  const [urgency, setUrgency] = useState("")
  const [justification, setJustification] = useState("")

  // Get related apps
  const relatedApps = extendedApps.filter(relatedApp =>
    app.relatedApps.includes(relatedApp.id) && relatedApp.id !== app.id
  )

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => {
    const count = app.reviewsData.filter(review => review.rating === rating).length
    return { rating, count, percentage: (count / app.reviewsData.length) * 100 }
  })

  const handleSubmit = () => {
    if (!reason.trim() || !urgency || !justification.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      })
      return
    }
    setAppStatus("pending")
    setIsDialogOpen(false)
    toast({
      title: "Access request submitted",
      description: "Your request has been submitted and is now pending approval."
    })
    setReason("")
    setUrgency("")
    setJustification("")
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircleIcon className="h-5 w-5 text-green-600" />
      case "pending":
        return <ClockIcon className="h-5 w-5 text-orange-600" />
      case "requested":
        return <PlayCircleIcon className="h-5 w-5 text-blue-600" />
      default:
        return <XCircleIcon className="h-5 w-5 text-red-600" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "approved":
        return "You have access to this app"
      case "pending":
        return "Your request is pending approval"
      case "requested":
        return "Request access to use this app"
      default:
        return "This app is not available"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Back Navigation */}
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/catalog">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Catalog
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* App Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start space-x-4">
                <img
                  src={app.icon || "/placeholder.svg"}
                  alt={`${app.name} icon`}
                  className="h-16 w-16 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h1 className="text-2xl font-bold">{app.name}</h1>
                    <Badge variant="secondary" className="ml-4">
                      {app.category}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">{app.description}</p>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1">
                      <StarIcon className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{app.rating.toFixed(1)}</span>
                      <span className="text-muted-foreground">({app.reviews} reviews)</span>
                    </div>
                    <Badge variant="outline">{app.tags[0]}</Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Tabs for detailed content */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Screenshots */}
              <Card>
                <CardHeader>
                  <CardTitle>Screenshots</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {app.screenshots.map((screenshot, index) => (
                      <img
                        key={index}
                        src={screenshot}
                        alt={`${app.name} screenshot ${index + 1}`}
                        className="rounded-lg border aspect-video object-cover"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Developer Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Developer Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium">{app.developer}</p>
                    <p className="text-sm text-muted-foreground">Developer</p>
                  </div>
                  <div>
                    <p className="font-medium">{app.supportContact}</p>
                    <p className="text-sm text-muted-foreground">Support Contact</p>
                  </div>
                  <div>
                    <p className="font-medium">{app.cost}</p>
                    <p className="text-sm text-muted-foreground">Pricing</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Key Features</CardTitle>
                  <CardDescription>
                    Discover what makes {app.name} powerful for your workflow
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {app.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircleIcon className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="requirements" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Access Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start">
                    <ShieldIcon className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <p>{app.accessRequirements}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {app.systemRequirements.map((requirement, index) => (
                      <li key={index} className="text-sm">{requirement}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              {/* Rating Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Rating Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold">{app.rating.toFixed(1)}</div>
                      <div className="flex items-center justify-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarIcon
                            key={star}
                            className={`h-4 w-4 ${
                              star <= Math.round(app.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground">{app.reviews} reviews</div>
                    </div>
                    <div className="flex-1 space-y-2">
                      {ratingDistribution.map((dist) => (
                        <div key={dist.rating} className="flex items-center space-x-2">
                          <span className="text-sm w-3">{dist.rating}</span>
                          <StarIcon className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <Progress value={dist.percentage} className="flex-1" />
                          <span className="text-sm text-muted-foreground w-8">{dist.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Individual Reviews */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Recent Reviews</h3>
                {app.reviewsData.map((review, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-4">
                        <Avatar>
                          <AvatarImage src={`/placeholder-user.jpg`} />
                          <AvatarFallback>{review.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-medium">{review.author}</p>
                            <div className="flex items-center space-x-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <StarIcon
                                  key={star}
                                  className={`h-4 w-4 ${
                                    star <= review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{review.date}</p>
                          <p className="text-sm">{review.comment}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Access Status and Actions */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {getStatusIcon(appStatus)}
                  <span>Access Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">{getStatusText(appStatus)}</p>
                {appStatus === "approved" && (
                  <Button className="w-full">
                    <PlayCircleIcon className="h-4 w-4 mr-2" />
                    Launch App
                  </Button>
                )}
                {(appStatus === "pending" || appStatus === "requested") && (
                  <Button variant="outline" className="w-full" disabled>
                    <ClockIcon className="h-4 w-4 mr-2" />
                    {appStatus === "pending" ? "Pending Approval" : "Request Submitted"}
                  </Button>
                )}
                {appStatus !== "approved" && appStatus !== "pending" && (
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <UsersIcon className="h-4 w-4 mr-2" />
                      Request Access
                    </Button>
                  </DialogTrigger>
                )}
              </CardContent>
            </Card>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Request Access to {app.name}</DialogTitle>
                <DialogDescription>
                  Fill out the form below to request access to this application.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="reason">Reason for request</Label>
                  <Textarea
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Please describe why you need access to this app..."
                  />
                </div>
                <div>
                  <Label htmlFor="urgency">Urgency level</Label>
                  <Select value={urgency} onValueChange={setUrgency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="justification">Business justification</Label>
                  <Textarea
                    id="justification"
                    value={justification}
                    onChange={(e) => setJustification(e.target.value)}
                    placeholder="Explain how this app will benefit your work or the business..."
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={handleSubmit}>Submit Request</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {app.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Related Apps */}
          <Card>
            <CardHeader>
              <CardTitle>Related Apps</CardTitle>
              <CardDescription>Similar apps in {app.category}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {relatedApps.map((relatedApp) => (
                <div key={relatedApp.id} className="flex items-center space-x-3">
                  <img
                    src={relatedApp.icon || "/placeholder.svg"}
                    alt={`${relatedApp.name} icon`}
                    className="h-8 w-8 rounded object-cover"
                  />
                  <div className="flex-1">
                    <Link
                      href={`/catalog/${relatedApp.id}`}
                      className="font-medium hover:underline"
                    >
                      {relatedApp.name}
                    </Link>
                    <div className="flex items-center space-x-1">
                      <StarIcon className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-muted-foreground">
                        {relatedApp.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}