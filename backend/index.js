const express =require('express')
const app =express();
const {executeCpp}=require('./executeCpp')
const {generateFile}=require('./generateFile')
const cors = require("cors")
app.use(express.urlencoded({extended:true}))
app.use(express.json())
const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))
app.get('/api',(res,req)=>{
    return res.send('hello')
})
app.post('/api/run',async (req,res)=>{
    const {language="cpp",code}=req.body
    if (code===undefined) {
       return  res.status(400).json({error:"Empty code body"})
    }
    // we need to geenerate a cpp file withe contant from the request 
    const filePath=await generateFile(language,code)
    
    //we need to ruun the file and send the respnse 
    try {
        const output=await executeCpp(filePath)
        return  res.json({filePath:filePath,output:output})
    } catch (error) {
      return res.json({err:error.stderr})
    }
  
   
   
})
app.listen(8000,()=>{
    console.log('listening on port 8000!')
})

