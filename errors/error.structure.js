class ErrorProMax extends Error {
    constructor(message, info) {
        super(message);
        this.details = info;
    }
}

module.exports = ErrorProMax;