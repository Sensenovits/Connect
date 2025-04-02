export function AnalyticsPreview() {
  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <div className="flex justify-between items-center mb-3">
        <p className="font-medium text-sm">Event Performance</p>
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">Last 30 days</span>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-white rounded-md border p-2">
          <p className="text-xs text-gray-500">Total Attendees</p>
          <p className="font-bold">1,248</p>
          <p className="text-xs text-green-600">+12.5%</p>
        </div>
        <div className="bg-white rounded-md border p-2">
          <p className="text-xs text-gray-500">Conversion Rate</p>
          <p className="font-bold">68.4%</p>
          <p className="text-xs text-green-600">+5.2%</p>
        </div>
      </div>
      <div className="bg-white rounded-md border p-2 mb-3">
        <div className="h-16 flex items-end">
          <div className="w-1/7 h-6 bg-blue-500 rounded-sm mx-0.5"></div>
          <div className="w-1/7 h-8 bg-blue-500 rounded-sm mx-0.5"></div>
          <div className="w-1/7 h-10 bg-blue-500 rounded-sm mx-0.5"></div>
          <div className="w-1/7 h-12 bg-blue-500 rounded-sm mx-0.5"></div>
          <div className="w-1/7 h-8 bg-blue-500 rounded-sm mx-0.5"></div>
          <div className="w-1/7 h-14 bg-blue-500 rounded-sm mx-0.5"></div>
          <div className="w-1/7 h-16 bg-blue-500 rounded-sm mx-0.5"></div>
        </div>
      </div>
      <div className="text-xs text-center text-gray-500">Interactive analytics dashboard</div>
    </div>
  )
}

