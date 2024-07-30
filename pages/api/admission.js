import dbConnect from '../../lib/dbConnect';
import InnerAdmissionData from '../../modal/admission';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      if(req.query?.college){
        const InnerAdmissionDatas = await InnerAdmissionData.find({college:req.query.college})
        res.status(200).json({ success: true, data: InnerAdmissionDatas });
      }
      try {
        const InnerAdmissionDatas = await InnerAdmissionData.find({});
        res.status(200).json({ success: true, data: InnerAdmissionDatas });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const InnerAdmissionDatas = await InnerAdmissionData.create(req.body);
        res.status(201).json({ success: true, data: InnerAdmissionDatas });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const {_id} = req.body;
        const InnerAdmissionDatas = await InnerAdmissionData.updateOne({ _id },{ $set: req.body });
        res.status(201).json({ success: true, data: InnerAdmissionDatas,message: "Data Updated successfully" });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false,message: "Something went wrong"});
        
      }
      break;
      
    case 'DELETE':
      if (req.query?.id) {
        await InnerAdmissionData.deleteOne({_id:req.query?.id});
        res.json(true);
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
