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
    const { description, price } = req.body;
    const maxParticipants = 20;
    const remainingVacancies = maxParticipants;

    const newTravelPackage = await TravelPackage.create(
      {
        description,
        date: '2024-12-31',
        price,
        maxParticipants,
        remainingVacancies,
      },
      { transaction },
    );
    await transaction.commit();
    res.status(201).json({
      message: "Travel package created successfully",
      data: newTravelPackage,
    });
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { gettravelpackage, addtravelpackage };
