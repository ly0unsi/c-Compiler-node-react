const path=require('path')
const fs =require('fs')
const {v4:uuid}=require('uuid')
const dirCode=path.join(__dirname,"code")

const res = require('express/lib/response')
 const generateFile=async (format,code)=>{
    if(!fs.existsSync(dirCode)){
        fs.mkdirSync(dirCode,{recusrsive:true})
    }
    const jobId=uuid();
    const fileName=`${jobId}.${format}`
    const filePath=path.join(dirCode,fileName)
    await fs.writeFileSync(filePath,code)
    return filePath
  
}
module.exports={
    generateFile
}