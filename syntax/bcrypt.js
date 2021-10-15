var bcrypt = require('bcrypt');
const saltRound = 10;
const myPlanintextPassword = '1111';
const someOtherPlaintextPassword = '1234';

bcrypt.hash(myPlanintextPassword,saltRound,function(err, hash){
    //Store hash in your password DB.
    console.log(hash);
    bcrypt.compare(myPlanintextPassword, hash, function(err, result){
        console.log('my password', result);
    })
    bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result){
        console.log('other password', result);
    })
});