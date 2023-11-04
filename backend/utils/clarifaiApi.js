const clarifaiApi = (req, res, modelId) => {
    const { imageUrl } = req.body;
    const PAT = `${process.env.PAT}`;
    const USER_ID = 'clarifai';       
    const APP_ID = 'main';
    const MODEL_ID = `${modelId}`;  

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

export default clarifaiApi;