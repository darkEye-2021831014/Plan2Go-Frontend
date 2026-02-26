import { useEffect } from "react";

export default function ActivityLogger({ userId, action, description }) {
  useEffect(() => {
    // if (!userId || !action) return;

    fetch("http://localhost:8080/users/activity/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        action,
        description,
      }),
    }).catch((err) => console.error("Activity log failed:", err));
  }, [userId, action, description]);

  return null;
}
