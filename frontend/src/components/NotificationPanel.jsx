import { useEffect, useState } from "react";
import axios from "axios";
import { Bell, Check } from "lucide-react";

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    const { data } = await axios.get("/api/notifications", { withCredentials: true });
    setNotifications(data);
  };

  const markRead = async (id) => {
    await axios.put(`/api/notifications/${id}/read`, {}, { withCredentials: true });
    fetchNotifications();
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="p-5 bg-white rounded-2xl shadow max-w-lg mx-auto mt-8">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="text-indigo-600" />
        <h2 className="text-lg font-semibold">Notifications</h2>
      </div>

      {notifications.length === 0 ? (
        <p className="text-gray-500 text-sm">No new notifications</p>
      ) : (
        <ul className="space-y-3">
          {notifications.map((n) => (
            <li
              key={n._id}
              className={`p-3 border rounded-xl ${
                n.isRead ? "bg-gray-50" : "bg-indigo-50"
              } flex justify-between items-center`}
            >
              <p className="text-gray-700 text-sm">{n.message}</p>
              {!n.isRead && (
                <button
                  onClick={() => markRead(n._id)}
                  className="text-xs bg-indigo-600 text-white px-2 py-1 rounded-lg flex items-center gap-1"
                >
                  <Check size={12} /> Mark Read
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationPanel;


