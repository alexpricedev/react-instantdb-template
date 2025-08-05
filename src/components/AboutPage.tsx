export function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          About This Template
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          A modern React + InstantDB starter template for building real-time
          applications
        </p>
      </div>

      {/* Template Story Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-12 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Built for Modern Development
        </h2>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed mb-6">
            This template combines the best of modern web development: React for
            building user interfaces, InstantDB for real-time data, and
            TypeScript for type safety. It&apos;s designed to help you build
            collaborative, real-time applications quickly and efficiently.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            Whether you&apos;re building a social app, collaborative tool, or
            any application that needs real-time updates, this template provides
            the foundation you need. Authentication, data persistence, and UI
            components are all ready to customize.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Focus on building your unique features instead of setting up
            boilerplate. The template includes best practices for code
            organization, testing, and deployment.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-3xl mb-4">⚡</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Real-time Database
          </h2>
          <p className="text-gray-600">
            InstantDB provides real-time data synchronization with optimistic
            updates. Changes are instantly reflected across all connected
            clients.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-3xl mb-4">🔐</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Magic Link Authentication
          </h2>
          <p className="text-gray-600">
            Secure, passwordless authentication built-in. Users sign in with
            their email - no password management required.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-3xl mb-4">🎨</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Modern UI Components
          </h2>
          <p className="text-gray-600">
            Beautiful, responsive components built with Tailwind CSS. Clean
            design system ready to customize for your brand.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-3xl mb-4">🧪</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Testing Ready
          </h2>
          <p className="text-gray-600">
            Vitest and Mock Service Worker configured for unit and integration
            testing. Test your components and API interactions with confidence.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-3xl mb-4">📱</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Responsive Design
          </h2>
          <p className="text-gray-600">
            Mobile-first responsive design that works beautifully on all
            devices. From phones to desktops, your app will look great
            everywhere.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-3xl mb-4">⚙️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Developer Experience
          </h2>
          <p className="text-gray-600">
            TypeScript, ESLint, Prettier, and hot reload for the best
            development experience. Code with confidence and ship faster.
          </p>
        </div>
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-600 mb-6">
          Ready to start building your next great application?
        </p>
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Customize this template to match your needs. Add your own
            components, update the schema, and build something amazing.
          </p>
        </div>
      </div>
    </div>
  );
}
