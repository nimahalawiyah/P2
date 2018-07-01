const express=require('express');
const cors =require('cors');
const mysql=require('mysql');
const bodyParser = require('body-parser');
const app = express();
const multer=require('multer');
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/');
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+ Date.now()+ file.originalname);
    }
});
const upload=multer({storage:storage});
const con= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'crudmern'
});
con.connect(err=>{
    if(err){
        return err;
    }
});
app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:false})); 
app.use('/upload',express.static('uploads'));
app.get('/file',(req, res)=>{
    const selectall="select * from fu";
    con.query(selectall,(err, result)=>{
        if(err){
            return res.send(err)
        }else{
            return res.json({
                data:result
            })
        }
    });
    });
app.post('/file/add',upload.single('file'),(req, res)=>{
    console.log(req.file); 
    console.log(req.body); 
   const input=JSON.parse(JSON.stringify(req.body));
   const data={
    nama:input.name,
    fileupload:req.file.path
};          
            const insert="insert into fu set ?";
            con.query(insert,data,(err, results)=> {
                if(err){
                    return res.send(err)
                }else{
                    return res.send('file ditambahkan')
                }
            });   
});
 
app.listen(5000,()=>{
    console.log('File server listening on port 5000')
});
