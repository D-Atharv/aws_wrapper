'use client';

import { useSearchParams, useRouter } from "next/navigation";
import React from "react";
import { deployProject } from "../../services/deployService";

const DeployForm = ({ setDeploymentStatus }: { setDeploymentStatus: (status: string) => void }) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const githubURL = searchParams.get("githubUrl") || "";

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!githubURL) {
            setDeploymentStatus("Please enter a repository URL.");
            return;
        }

        setDeploymentStatus("Deploying...");

        try {
            const response = await deployProject(githubURL);
            if (response.success) {
                setDeploymentStatus(`Project deployed! Access it at: ${response.deployUrl}`);
            } else {
                setDeploymentStatus(`Error: ${response.error}`);
            }
        } catch (error) {
            console.error("Error communicating with the server:", error);
            setDeploymentStatus("Error communicating with the server.");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newRepoUrl = e.target.value;

        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set("githubURL", newRepoUrl);

        router.replace(`?${newSearchParams.toString()}`);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-6 rounded-xl shadow-lg max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-center text-white">Deploy Your GitHub Project</h2>
            <div className="space-y-4">
                <input
                    type="text"
                    value={githubURL}
                    onChange={handleChange}
                    placeholder="Enter GitHub Repository URL"
                    className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-md hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Deploy
                </button>
            </div>
        </form>
    );
};

export default DeployForm;
