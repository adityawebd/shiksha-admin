import dbConnect from '../../lib/dbConnect';
import Notification from '../../modal/notification';


export default async function handler(req, res) {
    const { method } = req;
  
    await dbConnect();
  
    switch (method) {
      case 'GET':
        if(req.query?.title){
          const Notifications = await Notification.findOne({title:req.query.title})
          res.status(200).json({ success: true, data: Notifications });
        }
        try {
          const Notifications = await Notification.find({});
          res.status(200).json({ success: true, data: Notifications });
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;
      case 'POST':
        try {
          const Notifications = await Notification.create(req.body);
          res.status(201).json({ success: true, data: Notifications });
        } catch (error) {
          console.log(error);
          res.status(400).json({ success: false });
        }
        break;
      case 'PUT':
        try {
          // console.log(req.body)
          const {title} = req.body;
          console.log("title ",title)
          const titlee=title
          const Notifications = await Notification.updateOne({ title },{ $set: req.body });
          res.status(201).json({ success: true, data: Notifications,message: "Data Updated successfully" });
        } catch (error) {
          console.log(error);
          res.status(400).json({ success: false,message: "Something went wrong"});
          
        }
        break;
        
      case 'DELETE':
        if (req.query?.title) {
          await Notification.deleteOne({title:req.query?.title});
          res.json(true);
        }
        break;
      default:
        res.status(400).json({ success: false });
        break;
    }
  }
  