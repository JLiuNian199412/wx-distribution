var mysql=require("mysql");
var pool = mysql.createPool({
    host: '118.89.141.142',
    user: 'root',
    password: '666666',
    database: 'wx-distribution',
    port: '3306'
});
var query=function(sql,values,callback){
    pool.getConnection(function(err,client){
        if(err){
            callback(err,null,null);
        }else{
            client.query(sql,values,function(qerr,val,fields){
                //释放连接
                client.release();
                //事件驱动回调
                callback(qerr,val,fields);
            });
        }
    });
};

module.exports=query;
