const handleSignin = (req, res, db, bcrypt)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({
            message: 'Incorrect form submission'
        })
    }
    db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
        // const isValid = bcrypt.compareSync(password, data[0].hash);
        bcrypt.compare(password, data[0].hash, function(err, result) {
            if(result){
                return db.select('*').from('users')
                 .where('email', '=', email)
                 .then(user => {
                     res.status(200).json({
                         message: 'Welcome User',
                         user: user[0],
                         status: 'success'
                     })
                 })
             }
             else{
                 res.status(401).json({
                     message: 'Invalid user email or password'
                 })
             }
        });
        
    })
    .catch(err =>  {
        res.status(401).json({
            message: 'Invalid user email or password'
        })
    })
}

export { handleSignin };