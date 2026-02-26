import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import ActivityLogger from '../helper/activityloger';


const Maintenance = () => {
  // Security state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwLoading, setPwLoading] = useState(false);
  const [pwMessage, setPwMessage] = useState("");

  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  // Profile state
  const [profileData, setProfileData] = useState({
    name: `${user?.first_name || ""} ${user?.last_name || ""}`,
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  // Guide state
  const [guideData, setGuideData] = useState({
    city: "",
    hourlyFee: "",
    languages: "",
    yearsOfExperience: "",
  });
  const [guideSaved, setGuideSaved] = useState(false);
  const [guideLoading, setGuideLoading] = useState(false);

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGuideChange = (e) => {
    setGuideData({
      ...guideData,
      [e.target.name]: e.target.value,
    });
  };

  //Handle Activity
  const trackDummy = async (action, description) => {
    const body = {
      user_id: user?.id || 133,
      action: `${action}`,
      description: `${description}`
    };

    try {
      const response = await fetch('http://localhost:8080/users/activity/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Failed to track activity');
      }

      console.log('Dummy activity tracked successfully');
    } catch (error) {
      console.error('Error tracking dummy activity:', error);
    }
  };

  // Save profile
  const handleSaveProfile = async () => {
    if (!user) return;

    setLoading(true);
    const nameParts = profileData.name.trim().split(" ");
    const first_name = nameParts.shift();
    const last_name = nameParts.join(" ");

    try {
      const token = localStorage.getItem("plan2go_token");

      const res = await fetch(
        "http://localhost:8080/users/update/profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            first_name,
            last_name,
            phone: profileData.phone,
            address: profileData.address,
          }),
        }
      );

      let data;
      try {
        data = await res.json();
      } catch {
        const text = await res.text();
        data = { message: text };
      }

      if (!res.ok) {
        alert(data.message || "Failed to update profile");
        return;
      }

      localStorage.setItem("plan2go_user", JSON.stringify(data.user));
      setProfileData({
        ...profileData,
        name: `${data.user.first_name} ${data.user.last_name}`,
        phone: data.user.phone || "",
        address: data.user.address || "",
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Something went wrong while updating profile.");
    } finally {
      setLoading(false);
    }
  };

  // Register guide
  const handleGuideRegistration = async () => {
    setGuideLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8080/users/guide/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user?.id,
            city: guideData.city,
            hourly_fee: parseFloat(guideData.hourlyFee),
            languages: guideData.languages
              .split(",")
              .map((l) => l.trim())
              .join(","),
            years_of_experience: parseInt(guideData.yearsOfExperience || "0"),
          }),
        }
      );

      if (response.ok) {
        setGuideSaved(true);
        trackDummy("Guide Registration", "User registered as a guide");
        setTimeout(() => setGuideSaved(false), 3000);
        setGuideData({
          city: "",
          hourlyFee: "",
          languages: "",
          yearsOfExperience: "",
        });
      } else {
        alert("User Is Already Registered As A Guide. Please try again.");
      }
    } catch (err) {
      console.error("Error registering guide:", err);
      alert("An error occurred. Please try again.");
    } finally {
      setGuideLoading(false);
    }
  };

  const tabs = [
    { id: "profile", name: "Profile", icon: "👤" },
    { id: "guide", name: "Become a Guide", icon: "🗺️" },
    { id: "settings", name: "Settings", icon: "⚙️" },
    { id: "security", name: "Security", icon: "🔒" },
    { id: "notifications", name: "Notifications", icon: "🔔" },
    { id: "activity", name: "Activity", icon: "🗺️" },
  ];

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setPwMessage("New passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setPwMessage("Password must be at least 6 characters.");
      return;
    }

    setPwMessage("");
    setPwLoading(true);

    try {
      const token = localStorage.getItem("plan2go_token");

      const res = await fetch("http://localhost:8080/users/update/password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = { message: await res.text() };
      }

      if (!res.ok) {
        setPwMessage(data.message || "Failed to change password.");
        return;
      }

      setPwMessage("✅ Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      setPwMessage("Something went wrong.");
    } finally {
      setPwLoading(false);
    }
  };

  //activity
  const [activities, setActivities] = useState([]);
  const [activityLoading, setActivityLoading] = useState(false);

  const fetchActivities = async () => {
    if (!user?.id) return;

    setActivityLoading(true);

    try {
      const response = await fetch("http://localhost:8080/users/activity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: user.id }),
      });

      if (!response.ok) throw new Error("Failed to fetch activities");

      const data = await response.json();
      setActivities(data);
    } catch (err) {
      console.error("Activity Fetch Error:", err);
    } finally {
      setActivityLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "activity") {
      fetchActivities();
    }
  }, [activeTab]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50/20 to-accent-50/10 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            Account Settings ⚙️
          </h1>
          <p className="text-xl text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100 p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-5 py-4 rounded-2xl transition-all font-semibold ${activeTab === tab.id
                      ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg"
                      : "text-gray-700 hover:bg-primary-50"
                      }`}
                  >
                    <span className="mr-3 text-xl">{tab.icon}</span>
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* PROFILE */}
            {activeTab === "profile" && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100 p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-gray-900">
                    Profile Information
                  </h2>
                  <span className="px-4 py-2 bg-primary-100 text-primary-700 rounded-xl text-sm font-bold">
                    {user?.userType === "guide"
                      ? "👨‍🏫 Tour Guide"
                      : "✈️ Traveler"}
                  </span>
                </div>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        disabled
                        className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl bg-gray-50 text-gray-500"
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        Email cannot be changed
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                      placeholder="+880 1XXX-XXXXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Address
                    </label>
                    <textarea
                      name="address"
                      value={profileData.address}
                      onChange={handleProfileChange}
                      rows="3"
                      className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                      placeholder="Your address"
                    />
                  </div>
                  <div className="flex justify-end pt-4">
                    <button
                      onClick={handleSaveProfile}
                      disabled={loading}
                      className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-3 rounded-2xl font-semibold transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading
                        ? "Saving..."
                        : saved
                          ? "✓ Saved!"
                          : "Save Changes"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* GUIDE */}
            {activeTab === "guide" && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100 p-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Register as a Tour Guide
                  </h2>
                  <p className="text-gray-600">
                    Share your local expertise and earn money by guiding
                    travelers
                  </p>
                </div>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* City Dropdown */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        City <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="city"
                        value={guideData.city}
                        onChange={handleGuideChange}
                        required
                        className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition bg-white"
                      >
                        <option value="">Select Division</option>
                        {[
                          "Dhaka",
                          "Chittagong",
                          "Khulna",
                          "Barishal",
                          "Sylhet",
                          "Rajshahi",
                          "Rangpur",
                          "Mymensingh",
                        ].map((div) => (
                          <option key={div} value={div}>
                            {div}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Hourly Fee (BDT) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="hourlyFee"
                        value={guideData.hourlyFee}
                        onChange={handleGuideChange}
                        required
                        min="0"
                        step="0.01"
                        className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                        placeholder="500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Languages <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="languages"
                      value={guideData.languages}
                      onChange={handleGuideChange}
                      required
                      className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                      placeholder="e.g., English, Bengali, Hindi (comma-separated)"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Separate multiple languages with commas
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Years of Experience <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="yearsOfExperience"
                      value={guideData.yearsOfExperience}
                      onChange={handleGuideChange}
                      required
                      min="0"
                      className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                      placeholder="5"
                    />
                  </div>
                  <div className="bg-primary-50 border border-primary-200 rounded-2xl p-5">
                    <h3 className="font-bold text-primary-900 mb-3 flex items-center">
                      <span className="mr-2">📝</span> Guide Requirements
                    </h3>
                    <ul className="text-sm text-primary-800 space-y-2">
                      <li>• Must have local knowledge of your city</li>
                      <li>• Good communication skills required</li>
                      <li>• Professional conduct expected</li>
                      <li>• Valid ID verification may be required</li>
                    </ul>
                  </div>
                  <div className="flex justify-end pt-4">
                    <button
                      onClick={handleGuideRegistration}
                      disabled={guideLoading}
                      className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-3 rounded-2xl font-semibold transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {guideLoading
                        ? "Submitting..."
                        : guideSaved
                          ? "✓ Registered!"
                          : "Register as Guide"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SETTINGS */}
            {activeTab === "settings" && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Preferences
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      label: "Language",
                      desc: "Choose your preferred language",
                      options: ["English", "বাংলা"],
                    },
                    {
                      label: "Currency",
                      desc: "Display prices in",
                      options: ["BDT (৳)", "USD ($)"],
                    },
                    {
                      label: "Theme",
                      desc: "Appearance mode",
                      options: ["Light", "Dark", "System"],
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-5 border-b border-gray-200"
                    >
                      <div>
                        <h3 className="font-bold text-gray-900">
                          {item.label}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {item.desc}
                        </p>
                      </div>
                      <select className="px-5 py-2.5 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white">
                        {item.options.map((opt) => (
                          <option key={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECURITY */}
            {activeTab === "security" && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Security Settings
                </h2>

                <div className="space-y-8">
                  {/* CHANGE PASSWORD */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-6">Change Password</h3>

                    <div className="space-y-4">
                      <input
                        type="password"
                        placeholder="Current Password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-500"
                      />

                      <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-500"
                      />

                      <input
                        type="password"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-500"
                      />

                      {pwMessage && (
                        <p
                          className={`text-sm font-semibold ${pwMessage.includes("success") || pwMessage.includes("✓")
                            ? "text-green-600"
                            : "text-red-600"
                            }`}
                        >
                          {pwMessage}
                        </p>
                      )}

                      <button
                        onClick={handlePasswordChange}
                        disabled={pwLoading}
                        className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl disabled:opacity-50"
                      >
                        {pwLoading ? "Updating..." : "Update Password"}
                      </button>
                    </div>
                  </div>

                  {/* TWO FACTOR */}
                  <div className="border-t border-gray-200 pt-8">
                    <h3 className="font-bold text-gray-900 mb-4">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-600">
                        Add an extra layer of security to your account
                      </p>
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-2xl font-semibold transition">
                        Enable
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            )}

            {/* NOTIFICATIONS */}
            {activeTab === "notifications" && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Notification Preferences
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      name: "Email Notifications",
                      desc: "Receive updates via email",
                    },
                    {
                      name: "SMS Notifications",
                      desc: "Get important alerts via SMS",
                    },
                    {
                      name: "Push Notifications",
                      desc: "Browser and app notifications",
                    },
                    {
                      name: "Tour Reminders",
                      desc: "Reminders for upcoming tours",
                    },
                    {
                      name: "Guide Messages",
                      desc: "Notifications from your guides",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-5 border-b border-gray-200"
                    >
                      <div>
                        <h3 className="font-bold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked
                        />
                        <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary-500"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ACTIVITY */}
            {activeTab === "activity" && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Activity Log
                </h2>

                {/* Loading */}
                {activityLoading && (
                  <p className="text-gray-600 text-lg">Loading activities...</p>
                )}

                {/* Empty */}
                {!activityLoading && activities.length === 0 && (
                  <p className="text-gray-500 text-lg">No activities found.</p>
                )}

                {/* Activity list */}
                <div className="space-y-4">
                  {activities.map((item, index) => (
                    <div
                      key={index}
                      className="py-5 border-b border-gray-200"
                    >
                      <h3 className="font-bold text-gray-900">
                        {item.action || "Unknown Activity"}
                      </h3>

                      <p className="text-sm text-gray-600 mt-1">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
