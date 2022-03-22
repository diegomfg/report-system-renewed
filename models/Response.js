class Response{
    constructor(type, data, error){
        this.type = type;
        this.data = data;
        this.error = error;
    }
}

module.exports = Response;