import dbConnect from '../../lib/dbConnect';
import information from '../../modal/information'

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      if(req.query?.college){
        const informations = await information.find({college:req.query.college})
        res.status(200).json({ success: true, data: informations });
      }
      try {
        const informations = await information.find({});
        res.status(200).json({ success: true, data: informations });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const informations = await information.create(req.body);
        res.status(201).json({ success: true, data: informations });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const {_id} = req.body;
        const informations = await information.updateOne({ _id },{ $set: req.body });
        res.status(201).json({ success: true, data: informations,message: "Data Updated successfully" });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false,message: "Something went wrong"});
        
      }
      break;
      
    case 'DELETE':
      if (req.query?.id) {
        await information.deleteOne({_id:req.query?.id});
        res.json(true);
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
