export function Organization() {
  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold text-white">
        Organization Settings
      </h1>

      <div className="rounded-lg bg-gray-800 p-6">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-200">
              Organization Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200">
              Wallet Address
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200">
              Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-white shadow-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
