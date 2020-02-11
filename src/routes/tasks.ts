import { Router, Request, Response, json } from 'express';
import * as Handlebars from 'handlebars'

const router = Router();

//Model
import TaskModel from '../models/Task';
interface MyObj {
  name: String,
  age: number,
  address: String,
  sdt: String,
  description: String
}
// tasks/create
router.route('/create')
  .get((req: Request, res: Response) => {
    res.render('tasks/create');
  })
  .post(async (req: Request, res: Response) => {
    const { name, age, address, sdt, description } = req.body;
    const newUser = new TaskModel({
      name,
      age,
      address,
      sdt,
      description
    });

    await newUser.save();
    res.redirect('/tasks/list');
  });
router.route('/list')
  .get(async (req: Request, res: Response) => {
    let users = await TaskModel.find({});
    var json = JSON.stringify(users);
    var result: MyObj = JSON.parse(json)
    res.render('tasks/list', { result }); //truyền user sang tasks/list
  });

router.route('/delete/:id')
  .get(async (req: Request, res: Response) => {
    console.log(req.params);
    const { id } = req.params;
    await TaskModel.findByIdAndDelete(id);
    res.redirect('/tasks/list');

  });
router.route('/edit')
  .get(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = TaskModel.findById(id);

    res.render('tasks/edit');
  });
export default router;