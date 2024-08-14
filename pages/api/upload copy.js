import multiparty from 'multiparty';
import fs from 'fs';
import path from 'path';
import { mongooseConnect } from "../../lib/mongoose";

const publicDir = path.join(process.cwd(), 'public', 'uploads');
const hostname = process.env.NEXT_PUBLIC_HOSTNAME || 'http://localhost:3000'; // Default to localhost if not set

export default async function handle(req, res) {
  await mongooseConnect();
  // await isAdminRequest(req, res);

  const form = new multiparty.Form();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

  console.log('length:', files.file.length);

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const links = [];
  for (const file of files.file) {
    const ext = path.extname(file.originalFilename);
    const newFilename = Date.now() + ext;
    const filePath = path.join(publicDir, newFilename);

    fs.renameSync(file.path, filePath);

    const link = `${hostname}/uploads/${newFilename}`;
    links.push(link);
  }

  return res.json({ links });
}

export const config = {
  api: { bodyParser: false },
};
