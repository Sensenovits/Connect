export function MessagingPreview() {
  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <div className="bg-white rounded-md border p-3 mb-3">
        <div className="flex justify-between items-center mb-2">
          <p className="font-medium">Event Reminder</p>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">Email</span>
        </div>
        <p className="text-sm text-gray-600 mb-2">Hello [Name],</p>
        <p className="text-sm text-gray-600">This is a reminder that your event is coming up in 24 hours...</p>
        <div className="mt-2 text-xs text-gray-500">Sent to: 248 recipients</div>
      </div>
      <div className="bg-white rounded-md border p-3 mb-3">
        <div className="flex justify-between items-center mb-2">
          <p className="font-medium">Check-in Confirmation</p>
          <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">SMS</span>
        </div>
        <p className="text-sm text-gray-600">Thanks for checking in! Your QR code for the event is attached.</p>
        <div className="mt-2 text-xs text-gray-500">Automated message</div>
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-xs text-gray-500">Delivery rate: 98.5%</span>
        <span className="text-xs text-gray-500">Open rate: 76.2%</span>
      </div>
    </div>
  )
}

