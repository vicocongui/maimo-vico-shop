import express from 'express';
const router = express.Router();

router.get('/', (res,req) => {
    res.status(200).send({message: 'welcome to the machine'});
})
export default router;