const { db } = require("../firebase/firebaseAdmin");

// GET all teachers
exports.getTeachers = async (req, res) => {
  try {
    const snapshot = await db.collection("teachers").get();

    const teachers = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json({ success: true, teachers });
  } catch (error) {
    console.error("Error fetching teachers:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch teachers" });
  }
};
