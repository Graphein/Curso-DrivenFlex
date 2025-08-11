"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = validateBody;
function validateBody(schema) {
    return (req, res, next) => {
        const validation = schema.validate(req.body, { abortEarly: false });
        if (validation.error) {
            const messages = validation.error.details.map(detail => detail.message);
            return res.status(422).send({ errors: messages });
        }
        next();
    };
}
