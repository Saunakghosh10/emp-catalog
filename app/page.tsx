"use client"

import { useState, useMemo } from "react"
import { AppCard } from "@/components/app-card"
import { FilterBar } from "@/components/filter-bar"

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
    popularity: 2500,
  },
  {
    id: "2",
    name: "Data Analytics Suite",
    description: "Powerful analytics platform for business intelligence, data visualization, and automated reporting.",
    category: "Analytics",
    rating: 4.8,
    reviews: 256,
    status: "approved" as const,
    tags: ["analytics", "reporting", "dashboard"],
    icon: "/placeholder.svg",
    popularity: 3200,
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
    popularity: 1800,
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
    popularity: 2100,
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
    popularity: 1900,
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
    popularity: 1600,
  },
  {
    id: "7",
    name: "Team Communication Platform",
    description: "Unified messaging and collaboration tool for teams with video calls, file sharing, and task management.",
    category: "Communication",
    rating: 4.7,
    reviews: 345,
    status: "approved" as const,
    tags: ["communication", "messaging", "video"],
    icon: "/placeholder.svg",
    popularity: 4100,
  },
  {
    id: "8",
    name: "Security Monitoring Suite",
    description: "Comprehensive security monitoring with threat detection, incident response, and compliance reporting.",
    category: "Security",
    rating: 4.3,
    reviews: 178,
    status: "pending" as const,
    tags: ["security", "monitoring", "threats"],
    icon: "/placeholder.svg",
    popularity: 950,
  },
  {
    id: "9",
    name: "Marketing Campaign Manager",
    description: "All-in-one marketing platform for campaign planning, social media management, and analytics.",
    category: "Marketing",
    rating: 4.1,
    reviews: 132,
    status: "approved" as const,
    tags: ["marketing", "campaigns", "social"],
    icon: "/placeholder.svg",
    popularity: 2300,
  },
  {
    id: "10",
    name: "Learning Management System",
    description: "Online learning platform with course creation, progress tracking, and certification management.",
    category: "Education",
    rating: 4.5,
    reviews: 212,
    status: "requested" as const,
    tags: ["learning", "courses", "certification"],
    icon: "/placeholder.svg",
    popularity: 1700,
  },
  {
    id: "11",
    name: "Sales Performance Dashboard",
    description: "Advanced sales analytics with pipeline tracking, forecasting, and team performance metrics.",
    category: "Sales",
    rating: 4.6,
    reviews: 189,
    status: "approved" as const,
    tags: ["sales", "analytics", "pipeline"],
    icon: "/placeholder.svg",
    popularity: 2800,
  },
  {
    id: "12",
    name: "Compliance Management Tool",
    description: "Regulatory compliance platform with automated audits, risk assessment, and reporting capabilities.",
    category: "Compliance",
    rating: 4.2,
    reviews: 98,
    status: "pending" as const,
    tags: ["compliance", "audits", "regulatory"],
    icon: "/placeholder.svg",
    popularity: 1200,
  },
]

export default function Page() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [status, setStatus] = useState("all")
  const [sortBy, setSortBy] = useState("name")

  const categories = useMemo(() => [...new Set(mockApps.map(app => app.category))], [])

  const filteredAndSortedApps = useMemo(() => {
    let filtered = mockApps.filter(app => {
      const matchesSearch = search === "" ||
        app.name.toLowerCase().includes(search.toLowerCase()) ||
        app.description.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category === "all" || app.category === category
      const matchesStatus = status === "all" || app.status === status
      return matchesSearch && matchesCategory && matchesStatus
    })

    filtered.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name)
      } else if (sortBy === "rating") {
        return b.rating - a.rating
      } else if (sortBy === "popularity") {
        return b.popularity - a.popularity
      }
      return 0
    })

    return filtered
  }, [search, category, status, sortBy])

  const handleClearFilters = () => {
    setSearch("")
    setCategory("all")
    setStatus("all")
    setSortBy("name")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">App Catalog</h1>
      <FilterBar
        search={search}
        category={category}
        status={status}
        sortBy={sortBy}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        onStatusChange={setStatus}
        onSortChange={setSortBy}
        onClearFilters={handleClearFilters}
        categories={categories}
      />
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedApps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </div>
  )
}
