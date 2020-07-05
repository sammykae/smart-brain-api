const Clarifai=require('clarifai')

    const app= new Clarifai.App({
        apiKey:'ddde3c6cdcda4d0d8bcf357782592da5'
      })

    const handleApiCall= (req, res)=>{
      app.models.predict(Clarifai.FACE_DETECT_MODEL,
        req.body.input)
        .then(data=>
            {res.json(data)}
        )
        .catch(err =>
            res.status(400).json('Unable to connect to API')
        )

}


const handleImage=(req, res, db)=>{
    
        const{id}=req.body
        db('users').increment('entries',1).where('id', '=',id)
        .returning('entries').then(entry=>{
            res.json(entry[0])
        })
        .catch(err=>{
            res.status(400).json('Unable to get entries')
        })
    
}
module.exports={
    handleImage,
    handleApiCall
}