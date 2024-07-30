import dbConnect from '../../lib/dbConnect';
import department from '../../modal/department';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      if(req.query?.college){
        const departments = await department.find({college:req.query.college})
        res.status(200).json({ success: true, data: departments });
      }
      try {
        const departments = await department.find({});
        res.status(200).json({ success: true, data: departments });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const departments = await department.create(req.body);
        res.status(201).json({ success: true, data: departments });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const {_id} = req.body;
        const departments = await department.updateOne({ _id },{ $set: req.body });
        res.status(201).json({ success: true, data: departments,message: "Data Updated successfully" });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false,message: "Something went wrong"});
        
      }
      break;
      
    case 'DELETE':
      if (req.query?.id) {
        await department.deleteOne({_id:req.query?.id});
        res.json(true);
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
