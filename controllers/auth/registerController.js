/**
 *  Joi is the third party library for input fields validation
 *  https://joi.dev/ 
 */

import Joi from 'joi';
import CustomErrorHandler from '../../services/customErrorHandler';
import { User } from '../../models';

const registerController = {

    // next-> it is used to implement the middleware

    register(req, res, next) {

        // validation schema
        const registerSchema = Joi.object({

            // this is the method chaining ⛓ style -> a().b().c().d()
            name: Joi.string().min(3).max(20).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}]$')).required(),

            // use Joi.ref() method if you want to validate the same string.
            repeat_password: Joi.ref(password)

        });

        console.log(req.body);

        const { error } = registerSchema.validate(req.body);

        // if error send the error the middleware the handle the error
        if (error) {
            return next(error);
        }

        // check if user is already exist
        try {
            const isExist = await User.exists({ email: req.body.email });

            if (isExist) return next(CustomErrorHandler.alreadyExist('Email is already taken.'));

        } catch (error) {

        }

        res.json({
            msg: "Hello from express"
        });
    }
}

export default registerController;