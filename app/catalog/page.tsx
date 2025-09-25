import { AppCard } from "@/components/app-card"

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

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">App Catalog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockApps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </div>
  )
}