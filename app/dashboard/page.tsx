"use client"

import Link from "next/link"
import { DashboardAppCard } from "@/components/dashboard-app-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Mock data from catalog - simulate user has access to some apps and pending requests
const mockApps = [
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
  },
]

// Mock user data - approved apps and pending requests
const myApprovedApps = [mockApps[0], mockApps[1], mockApps[3], mockApps[5]] // 1,2,4,6
const myPendingRequests = [mockApps[2], mockApps[4]] // 3,5

// Stats calculations
const approvedCount = myApprovedApps.length
const pendingCount = myPendingRequests.length
const totalRequests = approvedCount + pendingCount

export default function DashboardPage() {
  const handleCancelRequest = (appId: string) => {
    console.log(`Cancel request for app ${appId}`)
    // In a real app, this would call an API to cancel the request
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>

      {/* Stats Overview */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Stats Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Approved Apps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvedCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRequests}</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* My Apps */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">My Apps</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myApprovedApps.map((app) => (
            <DashboardAppCard key={app.id} app={app} />
          ))}
        </div>
      </section>

      {/* Pending Requests */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Pending Requests</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myPendingRequests.map((app) => (
            <DashboardAppCard
              key={app.id}
              app={app}
              onCancelRequest={handleCancelRequest}
            />
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <Link href="/catalog">
          <Button size="lg" className="px-8">
            Request New Apps
          </Button>
        </Link>
      </section>
    </div>
  )
}