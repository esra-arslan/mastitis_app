var mongoose = require('mongoose')
const bcrypt = require("bcryptjs");

const userShema = new mongoose.Schema({
   name: {
      type: String,
      require: true
   },
   surname: {
      type: String,
      require: true
   },
   email: {
      type: String,
      require: true,
      unique: true
   },
   password: {
      type: String,
      require: true
   },
   phoneNumber: {
      type: Number,
      require: true
   }
});

// kulanıcı giriş için 

userShema.statics.login = async function(email, password){
   const user = await this.findOne({email})
   if(user) {
      const auth = await bcrypt.compare(password, user.password)
      if(auth) {
         console.log('Giriş Başarılı')

         return user
      }
      else{
         throw Error('Hatalı şifre, lütfen tekrar deneyiniz.')
      }
   }
   else{
      throw Error('Kullancı bulunamadı')
   }

} 

// kullanıcı şifresini gizli bir şeklide veri tabanına kaydetmek için

userShema.pre('save', function (next) {
   bcrypt.genSalt(10, (err, salt) => {
       bcrypt.hash(this.password, salt, (err, hash) => {
           this.password = hash;
           this.saltSecret = salt;
           next();
       });
   });
});


const user = mongoose.model('user', userShema);
module.exports = user;
