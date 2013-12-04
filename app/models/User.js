var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '' }
});

mongoose.model('User', UserSchema);
console.log('user model启动成功');