function ignoreDeleted(next) {
    this.where({ deletedAt: null });
    next();
}

module.exports = {
    ignoreDeleted
}