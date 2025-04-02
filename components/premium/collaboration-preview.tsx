export function CollaborationPreview() {
  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <div className="flex items-center mb-3">
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold mr-2">
          JD
        </div>
        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-bold mr-2">
          JS
        </div>
        <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-bold mr-2">
          RJ
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-xs font-bold">
          +2
        </div>
      </div>
      <div className="bg-white rounded-md border p-3 mb-3">
        <div className="flex justify-between items-center mb-1">
          <p className="font-medium text-sm">Recent Activity</p>
          <span className="text-xs text-gray-500">Today</span>
        </div>
        <p className="text-xs text-gray-600">John updated the event details for "Annual Conference"</p>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-2">
        <div className="bg-white rounded-md border p-2">
          <p className="text-xs font-medium">Admin</p>
          <p className="text-xs text-gray-500">1 member</p>
        </div>
        <div className="bg-white rounded-md border p-2">
          <p className="text-xs font-medium">Event Manager</p>
          <p className="text-xs text-gray-500">2 members</p>
        </div>
      </div>
      <div className="text-xs text-center text-gray-500">Team collaboration enabled</div>
    </div>
  )
}

