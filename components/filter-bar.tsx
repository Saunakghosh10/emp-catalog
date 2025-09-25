import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp, Search, X } from "lucide-react"

interface FilterBarProps {
  search: string
  category: string
  status: string
  sortBy: string
  onSearchChange: (value: string) => void
  onCategoryChange: (value: string) => void
  onStatusChange: (value: string) => void
  onSortChange: (value: string) => void
  onClearFilters: () => void
  categories: string[]
}

export function FilterBar({
  search,
  category,
  status,
  sortBy,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  onSortChange,
  onClearFilters,
  categories,
}: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="space-y-4">
      {/* Search Bar - Always Visible */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search apps by name or description..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Mobile Filter Toggle */}
      <div className="md:hidden">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              Filters
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 mt-4">
            <FilterControls
              category={category}
              status={status}
              sortBy={sortBy}
              onCategoryChange={onCategoryChange}
              onStatusChange={onStatusChange}
              onSortChange={onSortChange}
              onClearFilters={onClearFilters}
              categories={categories}
            />
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Desktop Filters - Always Visible */}
      <div className="hidden md:block">
        <FilterControls
          category={category}
          status={status}
          sortBy={sortBy}
          onCategoryChange={onCategoryChange}
          onStatusChange={onStatusChange}
          onSortChange={onSortChange}
          onClearFilters={onClearFilters}
          categories={categories}
        />
      </div>
    </div>
  )
}

interface FilterControlsProps {
  category: string
  status: string
  sortBy: string
  onCategoryChange: (value: string) => void
  onStatusChange: (value: string) => void
  onSortChange: (value: string) => void
  onClearFilters: () => void
  categories: string[]
}

function FilterControls({
  category,
  status,
  sortBy,
  onCategoryChange,
  onStatusChange,
  onSortChange,
  onClearFilters,
  categories,
}: FilterControlsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div>
        <label className="text-sm font-medium mb-2 block">Category</label>
        <Select value={category} onValueChange={onCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Status</label>
        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger>
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="requested">Requested</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Sort By</label>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
            <SelectItem value="popularity">Popularity</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-end">
        <Button
          variant="outline"
          onClick={onClearFilters}
          className="w-full"
          size="default"
        >
          <X className="h-4 w-4 mr-2" />
          Clear Filters
        </Button>
      </div>
    </div>
  )
}