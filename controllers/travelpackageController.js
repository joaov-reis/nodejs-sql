const TravelPackage = require("../models/TravelPackage");
const sequelize = require("../database/conn");

const gettravelpackage = async (req, res) => {
  try {
    const travelPackages = await TravelPackage.findAll({
      attribute: {
        include: [
          sequelize.literal(`
            (SELECT COUNT(*) FROM Enrollments
            WHERE Enrollments.id = TravelPackage.id)          
          `),
          "total",
        ],
      },
    });
    res.json(travelPackages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

const addtravelpackage = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { description, date, price, maxParticipants, remainingVacancies } =
      req.body;
    const travelPackage = await TravelPackage.create(
      {
        description,
        date,
        price,
        maxParticipants,
        remainingVacancies,
      },
      { transaction },
    );
    await transaction.commit();
    res.status(201).json({
      message: "Travel package created successfully",
      data: travelPackage,
    });
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { gettravelpackage, addtravelpackage };
