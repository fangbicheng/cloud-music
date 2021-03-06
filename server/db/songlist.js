
var mongoose  = require('mongoose'),
    Schema = mongoose.Schema

let songlist = new Schema({
  pic: String,  //图片
  createtime: Date,   //创建日期
  updatetime: Date,
  title: String,  //歌单名称
  summary: String,  //简介
  keyword: [{
    type: String
  }],  //标签
  list: [{
    type: Schema.Types.ObjectId,
    ref: 'musics'
  }],
  playNum: {
    type: Number,
    default: 0
  },
  owner: {  //创建者
    type: Schema.Types.ObjectId,
    ref: 'customers'
  }
})
songlist.pre('save',function(next){
  if(this.isNew){
    this.createtime = this.updatetime = Date.now();
  }else{
    this.updatetime = Date.now();
  }
  next();
});

module.exports = mongoose.model('songlists', songlist)
