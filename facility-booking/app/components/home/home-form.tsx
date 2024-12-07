'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar } from 'lucide-react'

type HomeFormProps = {
  dictionary: {
    date: string
    sport: string
    userType: string
    area: string
    search: string
    sports: Record<string, string>
    userTypes: Record<string, string>
    areas: Record<string, string>
  }
  locale: string
}

export function HomeForm({ dictionary, locale }: HomeFormProps) {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  )
  const [selectedSport, setSelectedSport] = useState('')
  const [selectedUserType, setSelectedUserType] = useState('')
  const [selectedArea, setSelectedArea] = useState('')

  const handleSearch = () => {
    const searchParams = new URLSearchParams({
      date: selectedDate,
      sport: selectedSport,
      userType: selectedUserType,
      area: selectedArea,
    })
    router.push(`/${locale}/search?${searchParams.toString()}`)
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 space-y-6">
      {/* Date Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {dictionary.date}
        </label>
        <div className="relative">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            min={new Date().toISOString().split('T')[0]}
          />
          <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Sport Type Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {dictionary.sport}
        </label>
        <select
          value={selectedSport}
          onChange={(e) => setSelectedSport(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">---</option>
          {Object.entries(dictionary.sports).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </div>

      {/* User Type Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {dictionary.userType}
        </label>
        <select
          value={selectedUserType}
          onChange={(e) => setSelectedUserType(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">---</option>
          {Object.entries(dictionary.userTypes).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </div>

      {/* Area Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {dictionary.area}
        </label>
        <select
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">---</option>
          {Object.entries(dictionary.areas).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
      >
        {dictionary.search}
      </button>
    </div>
  )
}