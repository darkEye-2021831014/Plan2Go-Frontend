import { useEffect } from "react";
import { API_BASE_URL } from "../config";

export default function ActivityLogger({ userId, action, description }) {
  useEffect(() => {
    // if (!userId || !action) return;

    fetch(`${API_BASE_URL}/users/activity/track`, {
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
