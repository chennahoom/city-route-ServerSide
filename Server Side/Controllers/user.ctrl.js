const User = require('../Models/users');

exports.userController = {

    generateId() {
        startId++;
        return startId;
    },
    getUsers(req, res) {
        if (Object.keys(req.query).length !== 0) {
            let query = {}

            User.find(query)
                .then(docs => { res.json(docs) })
                .catch(err => console.log(`Error getting the data from DB: ${err}`));
        }
        User.find({})
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error getting the data from DB: ${err}`));
    },

    getUser(req, res) {
        User.findOne({ id: req.params.id })
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error getting the data from DB: ${err}`));
    },

    checkUserRole(req, res) {
        User.findOne({ id: req.params.id,
                       type_of_user: req.params.role})
            .then(docs => { res.json({answer: docs !== null })})
            .catch(err => console.log(`Error getting the data from DB: ${err}`));
    },

    addUser(req, res) {
        const { body } = req;
        const user = new User();

        User.countDocuments({}, (err, result) => {
            if (err)
                console.log(err);
            else{
                user.id = result+1;
            }
        }).then((result)=>{
            user.full_name = body.full_name
            user.type_of_user = body.type_of_user
            user.about_me = body.about_me 
            user.languages = body.languages   
            user.email = body.email   
            user.phone = body.phone
            user.my_trips = body.my_trips
            
        
        user.save()
            .then(() => res.json({id:`${user.id}`}))
            .catch(err => console.log(err))
        })

    },
    
    updateUser(req, res) {
        const { body } = req
        const user = {};
        user.id = req.params.id
        if(body.full_name){
            user.full_name = body.full_name
        }
        if(body.type_of_user){
            user.type_of_user = body.type_of_user
        }
        if (body.about_me){
            user.about_me = body.about_me
        }

        if (body.languages){
            user.languages = body.languages
        }

        if (body.email){
            user.email = body.email
        }

        if (body.phone){
            user.phone = body.phone
        }

        if (body.my_trips){
            user.my_trips = body.my_trips
        }

        const query = {id: req.params.id}

        User.updateOne(query, user)
            .then(() => res.json({id:`${req.params.id}`}))
            .catch(err => console.log(err))

    },
    deleteUser(req, res) {
        User.deleteOne({ id: req.params.id })
        .then(() => res.json({id:`${req.params.id}`}))
        .catch(err => console.log(`Error deleting user from db: ${err}`));
    }
};
