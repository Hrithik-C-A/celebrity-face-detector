const handleImageApi = (req, res) => {
    const { imageUrl } = req.body;
    const PAT = `${process.env.PAT}`;
    const USER_ID = 'clarifai';       
    const APP_ID = 'main';
    const MODEL_ID = 'face-detection';  

const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": imageUrl
                }
            }
        }
    ]
});

const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
};

fetch(`https://api.clarifai.com/v2/models/${MODEL_ID}/outputs`, requestOptions)
    .then(response => response.json())
    .then(result => res.status(200).json({response : result}))
    .catch(error => console.log('error', error));

}


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

export { handleImageEntries, handleImageApi };