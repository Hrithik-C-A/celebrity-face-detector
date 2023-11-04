const handleProfileGet = (req, res, db)=>{
    const {id} = req.params;
    db.select('*').from('users').where({
        id: id
    })
    .then( user => {
            if(user.length){
                res.status(200).json({
                    user : user[0]
                })
            }
            else{
                res.status(404).json({
                    message: 'User not found.'
                        })
            }
        }
    )
    .catch(err =>{
        res.status(400).json({
            message: 'Error getting user.'
                })
    })
}

export { handleProfileGet };