function authorizeRole(...roles) {
  return (req, res, next) => {
    const user = res.locals.user;
    console.log("ROLE DO TOKEN:", user.role);
    console.log("ROLES PERMITIDAS:", roles);

    if (!roles.includes(user.role)) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    next();
  };
}

module.exports = authorizeRole;
