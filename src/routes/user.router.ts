import { Router } from "express";
import { createUser, getUser, updateUser } from "../controllers/user.controller";

const router = Router()

// router.route('/')
//     .post(async (req, res, next) => {
//         try {
//             const userCreate = await createUser({
//                 "name" : req.body.name,
//                 "lastname" : req.body.lastname,
//                 "dni" : req.body.dni
//             });
//             return res.status(201).json({
//                 "user" : userCreate
//             });
//         } catch (error) {
//             next(error);
//         }
//     }); //No tendria sentido que se cree un usuario por aca y no mediante Auth.

router.route('/:id')
    .get(async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await getUser({
                "id": Number(id)
            });

            if(user === null) {
                return res.status(404).json({
                    "message" : "User not found"
                });
            }
            return res.status(200).json({
                user
            });
        } catch (error) {
            next(error);
        }
    });

router.route('/update')
    .put(async (req, res, next) => {
        try {
            const { id, name } = req.body;
            const user = await getUser({
                "id": Number(id)
            });

            if(user === null) {
                return res.status(404).json({
                    "message" : "User not found"
                });
            }

            const userUpdate = await updateUser({
                "id": Number(id)
            }, {
                "name": name
            });

            return res.status(200).json({
                "user" : userUpdate
            });

        } catch (error) {
            next(error);
        }
    });



export default router;