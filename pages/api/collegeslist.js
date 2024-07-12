import dbConnect from '../../lib/dbConnect';
import College from '../../modal/collageslist';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      if(req.query?.name){
        const colleges = await College.findOne({name:req.query.name})
        res.status(200).json({ success: true, data: colleges });
      }
      try {
        const colleges = await College.find({});
        res.status(200).json({ success: true, data: colleges });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const college = await College.create(req.body);
        res.status(201).json({ success: true, data: college });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const {_id} = req.body;
        const college = await College.updateOne({ _id },{ $set: req.body });
        res.status(201).json({ success: true, data: college,message: "Data Updated successfully" });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false,message: "Something went wrong"});
        
      }
      break;
      
    case 'DELETE':
      if (req.query?.id) {
        await College.deleteOne({_id:req.query?.id});
        res.json(true);
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
