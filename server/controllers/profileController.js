const { db } = require("../firebase/firebaseAdmin");

// Save or update profile
exports.saveProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const profileData = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    await db.collection("users").doc(userId).set(
      {
        profile: profileData,
        updatedAt: new Date(),
      },
      { merge: true }
    );

    res.json({ success: true, message: "Profile saved successfully" });
  } catch (error) {
    console.error("Error saving profile:", error);
    res.status(500).json({ error: "Failed to save profile" });
  }
};

// Fetch profile
exports.getProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const doc = await db.collection("users").doc(userId).get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json({ success: true, data: doc.data().profile });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};
