export function BrandingPreview() {
  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-blue-600 rounded-md mr-4 flex items-center justify-center text-white font-bold">
          EC
        </div>
        <div>
          <h3 className="font-bold text-lg">Event Company</h3>
          <p className="text-sm text-gray-600">Creating memorable experiences</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="h-16 bg-blue-600 rounded-md"></div>
        <div className="h-16 bg-purple-600 rounded-md"></div>
        <div className="h-16 bg-pink-600 rounded-md"></div>
      </div>
      <div className="mt-4 p-3 bg-white rounded-md border">
        <p className="text-sm text-center">Preview of your branded event page</p>
      </div>
    </div>
  )
}

