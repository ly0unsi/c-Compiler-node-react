const {exec}=require('child_process')
const fs =require('fs')

const path=require('path')
const outputPath=path.join(__dirname,"output")
const executeCpp=(filePath)=>{
    if(!fs.existsSync(outputPath))
        fs.mkdirSync(outputPath,{recursive:true})
    const jobId=path.basename(filePath).split(".")[0]
    const outPath=path.join(outputPath,`${jobId}.out`)
    return new Promise((resolve,reject)=>{
       exec(`g++ ${filePath} -o ${outPath} && cd ${outputPath} && .\\${jobId}.out`,
            (error,stdout,stderr)=>{
                if(error) {reject({error,stderr})}
                if(stderr) {reject(stderr)}
                resolve (stdout)
            }
       )
    })
}
module.exports={
    executeCpp
}