var pool = require('./db_connect');

var nickname = 'aaa';
 
module.exports = function () {
  return {
    select_all: function(callback){
      pool.getConnection(function(err, con){
        var sql = 'select User.Nickname, Game.GameID, Game.Kill from Game, User where Game.Nickname = User.Nickname;';
        con.query(sql, function (err, result, fields) {
          con.release();
          if (err) return callback(err);
          callback(null, result);
        });
      });
    },
    insert_nick: function(callback){
      pool.getConnection(function(err, con){
        var sql = "insert into User values ("+ "nickname" +");";
        con.query(sql, function (err, result, fields) {
          con.release();
          if (err) return callback(err);
          callback(null, result);
        });
      });
    },
    select_nickname: function(callback){
      pool.getConnection(function(err, con){
        var sql = 'select User.Nickname from User';
        con.query(sql, function (err, result, fields) {
          con.release();
          if (err) return callback(err);
          callback(null, result);
        });
      });
    },
    pool: pool
  }
};
