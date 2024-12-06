const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/deploy`;

export const deployProject = async (repoUrl: string) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ repoUrl }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error response:", errorData);
            return { success: false, error: errorData.message || "Failed to deploy project" };
        }

        return await response.json();
    } catch (error) {
        console.error("Error deploying project:", error);
        return { success: false, error: "Failed to deploy project" };
    }
};