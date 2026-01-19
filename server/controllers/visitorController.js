const Visitor = require("../models/Visitor");

// Get visitor count
exports.getVisitorCount = async (req, res) => {
  try {
    let visitor = await Visitor.findOne();

    if (!visitor) {
      visitor = await Visitor.create({
        totalVisits: 0,
        uniqueVisitors: 0,
      });
    }

    res.json({
      success: true,
      data: {
        totalVisits: visitor.totalVisits,
        uniqueVisitors: visitor.uniqueVisitors,
      },
    });
  } catch (error) {
    console.error("Error fetching visitor count:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching visitor count",
    });
  }
};

// Increment visitor count
exports.incrementVisitorCount = async (req, res) => {
  try {
    const { isUnique } = req.body;

    let visitor = await Visitor.findOne();

    if (!visitor) {
      visitor = await Visitor.create({
        totalVisits: 1,
        uniqueVisitors: isUnique ? 1 : 0,
        lastVisit: new Date(),
      });
    } else {
      visitor.totalVisits += 1;
      if (isUnique) {
        visitor.uniqueVisitors += 1;
      }
      visitor.lastVisit = new Date();
      await visitor.save();
    }

    res.json({
      success: true,
      data: {
        totalVisits: visitor.totalVisits,
        uniqueVisitors: visitor.uniqueVisitors,
      },
    });
  } catch (error) {
    console.error("Error incrementing visitor count:", error);
    res.status(500).json({
      success: false,
      message: "Error incrementing visitor count",
    });
  }
};
