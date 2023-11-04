import clarifaiApi from "../utils/clarifaiApi.js";

const handleImageApi = (req, res) => clarifaiApi(req, res, 'face-detection');

const handleCelebrityImageApi = (req, res) => clarifaiApi(req, res, 'celebrity-face-recognition');

const handleImageEntries = (req, res, db)=>{
    const {id} = req.body;
    
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.status(200).json({
            user : entries[0].entries
        })
    })
    .catch(err => {
        res.status(400).json('unable to get entries')
    })

}

export { handleImageEntries, handleImageApi, handleCelebrityImageApi };