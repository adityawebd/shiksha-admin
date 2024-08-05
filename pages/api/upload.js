import multiparty from 'multiparty';
import fs from 'fs';
import path from 'path';
import dbConnect from '../../lib/dbConnect';


export default async function handle(req, res) {
  await dbConnect();
  // await isAdminRequest(req, res);

  const form = new multiparty.Form();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

  console.log('length:', files.file.length);
  const links = [];
  
  // Ensure the uploads directory exists
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  for (const file of files.file) {
    const ext = file.originalFilename.split('.').pop();
    const newFilename = Date.now() + '.' + ext;
    const newPath = path.join(uploadDir, newFilename);
    const fileContents = fs.readFileSync(file.path);
    fs.writeFileSync(newPath, fileContents);

    const link = `http://sikshahelpline.com:3001/uploads/${newFilename}`;
    links.push(link);
  }

  return res.json({ links });
}

export const config = {
  api: { bodyParser: false },
};
