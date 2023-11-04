const handleRegister = (req, res, db, bcrypt, saltRounds)=>{
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({
            message: 'Incorrect form submission'
        })
    }

    bcrypt.hash(password, saltRounds, function(err, hash) {
            if(err){
                throw err;
            }
            db.transaction(trx =>{
                trx.insert({
                    hash: hash,
                    email: email
                })
                .into('login')
                .returning('email')
                .then(loginEmail =>{
                    return trx('users')
                    .returning('*')
                    .insert({
                        name: name,
                        email: loginEmail[0].email,
                        joined: new Date()
                    })
                    .then(user =>{
                        res.status(201).json({
                            message: 'User created Successfully',
                            status: 'success',
                            user: user[0]
                        })
                    })
                    .then(trx.commit)
                    .catch(trx.rollback)
                })
                .catch(err=> res.status(400).json({
                    message: 'Unable to register',
                    status: 'Failed'
                }))
            })
            });
        
}

export { handleRegister }