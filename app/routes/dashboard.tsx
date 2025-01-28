import { Form, redirect } from "react-router";
import type { Route } from "./+types/dashboard";
import { getCurrentUser, signOutUser } from "~/session/guard.server";


export async function loader({ request }: Route.LoaderArgs) {
    const user = await getCurrentUser(request);
    return { userData: user.userData };
}

export async function action({ request }: Route.ActionArgs) {
    try {
        // Call the signOutUser function to handle the sign-out process
        return await signOutUser(request);
    } catch (error: any) {
        console.error("Error in action function:", error.message);
        // Redirect to the login page if an error occurs
        return redirect("/");
    }
}


export default function Dashboard({ loaderData }: Route.ComponentProps) {
    const userData = loaderData?.userData;

    return (
        <div className="min-h-screen bg-gray-900 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-700">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Welcome to Your Dashboard
          </h1>
          
          <Form method="post">
            <button
              type="submit"
              name="logout"
              value="logout"
              className="px-4 py-2 bg-red-600 hover:bg-red-700 
                         text-white rounded-lg text-sm font-medium
                         transition duration-200 
                         focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Logout
            </button>
          </Form>
        </div>

        {/* User Profile Section */}
        {userData ? (
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
            <h2 className="text-xl sm:text-2xl font-semibold text-cyan-400 mb-4">
              User Profile
            </h2>
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center py-2 border-b border-gray-700">
                <span className="text-gray-400 sm:w-24">Name:</span>
                <span className="text-white font-medium">{userData.name}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center py-2 border-b border-gray-700">
                <span className="text-gray-400 sm:w-24">Email:</span>
                <span className="text-white font-medium">{userData.email}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-xl p-6 text-center shadow-lg border border-gray-700">
            <p className="text-gray-400">
              No user data available. Please log in.
            </p>
          </div>
        )}
      </div>
    </div>
    );
}


