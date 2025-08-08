export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Forms AI MVP
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Create beautiful forms with AI in minutes
          </p>

          <div className="space-y-4">
            <a
              href="/create"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
            >
              Create Form with AI ✨
            </a>

            <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
              <h2 className="text-lg font-semibold mb-4">✅ System Status</h2>
              <div className="text-left space-y-2 text-sm">
                <p>🗄️ Database: Connected</p>
                <p>🤖 AI: Ollama Ready</p>
                <p>🎨 UI: Form Builder Active</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
