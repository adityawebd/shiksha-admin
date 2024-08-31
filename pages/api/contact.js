import dbConnect from '../../lib/dbConnect';
import Contacts from '../../modal/contact';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const departments = await Contacts.find({});
        res.status(200).json({ success: true, data: departments });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    
    // Handle other methods if necessary
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
