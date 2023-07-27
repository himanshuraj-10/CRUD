var express=require('express');
var app=express();
var mysql=require('mysql');
var bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set('view engine','ejs');
var conn=mysql.createConnection({

	host:'localhost',
	user:'root',
	password:'',
	database:'books'
});

conn.connect(function(err){
	if(err) throw err;
	console.log("connection successfull......")
});

app.get('/',function(req,res){
	res.render('insert');
});

app.post('/insert',function(req,res){

	
	var name=req.body.name;
	var date=req.body.date;

	var sql=`insert into book(book_name,issue_date) values('${name}','${date}')`;

	conn.query(sql,function(err,results){
		if(err) throw err;

		res.send("<h1>data sent....</h1>")

	});

});
app.get('/show',function(req,res){
	var sql="select * from book";
	conn.query(sql,function(err,results){
		if(err) throw err;
		res.render('show',{users:results});
	});
	
});

app.get('/delete/:id',function(req,res){
	var id=req.params.id;

	var sql=`delete from book where book_id='${id}'`;
	conn.query(sql,function(err,results){
		if(err) throw err;
		res.redirect('/show');

	});

});
app.get('/edit/:id',function(req,res){
	var id=req.params.id;
	var sql=`select * from book where book_id='${id}'`;

	conn.query(sql,function(err,results){
		if(err) throw err;
		res.render('edit',{users:results});
	});

});
app.post('/update/:id',function(req,res){
	var id=req.params.id;
	
	var name=req.body.name;
	var date=req.body.date;

	var sql=`update book set book_name='${name}',issue_date='${date}' where book_id='${id}'`;

	conn.query(sql,function(err,results){
		if(err) throw err;
		res.redirect('/show')

	});


});

var server=app.listen(4000,function(){
	console.log("App running on 4000...");
});