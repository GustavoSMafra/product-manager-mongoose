function verifyAdminPermission(req, res, next) {
    const sender = req.user;

    if(sender.admin != true){
        return res.status(403).json({
            success: false,
            message: `You don't have the permission to make this action`,
        });
    }
    next();
}

module.exports = {
    verifyAdminPermission
}