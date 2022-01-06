/**
 * @TODO What to do here
 * 
 * Create response model for res.send(new OkResponse() | new ErrorResponse())
 * 
 * Check the type Success|Error
 */

class Response{
    constructor(type, data){
        this.type = type;
        this.data = data;
    }
}

module.exports = Response;