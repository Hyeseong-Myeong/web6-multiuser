var db = require('../lib/db');
module.exports = {
    isOwner:function(request, response) {
        if (request.user) {
            return true;
        } else {
            return false;
        }
    },
    statusUI:function(request, response) {
        var authStatusUI = '<a href="/auth/login">login</a> | <a href="/auth/register">Register</a>'
        if (this.isOwner(request, response)) {
            var user = db.get('users').find({id:request.user}).value();
            authStatusUI = `${user.displayName} | <a href="/auth/logout">logout</a>`;
        }
        return authStatusUI;
    }
}