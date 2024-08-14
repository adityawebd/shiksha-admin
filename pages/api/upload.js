
import os from 'os';
import multiparty from 'multiparty';
import { Dropbox } from 'dropbox';
import fs from 'fs';
import path from 'path';
import { mongooseConnect } from "../../lib/mongoose";

const dropboxClient = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN });
const tmpDir = os.tmpdir(); // Use the system's temporary directory

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

  const links = [];
  for (const file of files.file) {
    const ext = path.extname(file.originalFilename);
    const newFilename = Date.now() + ext;
    const tempFilePath = path.join(tmpDir, newFilename); // Use the system's temporary directory

    // Move file to a temporary directory
    fs.renameSync(file.path, tempFilePath);

    // Upload to Dropbox
    try {
      const fileContent = fs.readFileSync(tempFilePath);
      const response = await dropboxClient.filesUpload({
        path: `/uploads/${newFilename}`,
        contents: fileContent,
        mode: { '.tag': 'add' }, // 'add' to create a new file or overwrite existing
      });

      // Get the shared link
      const sharedLinkResponse = await dropboxClient.sharingCreateSharedLinkWithSettings({
        path: response.result.path_display,
      });

      links.push(sharedLinkResponse.result.url.replace('dl=0', 'dl=1')); // Use 'dl=1' for direct download
    } catch (error) {
      console.error('Dropbox upload error:', error);
      return res.status(500).json({ error: 'Failed to upload file to Dropbox' });
    } finally {
      // Clean up the temporary file
      fs.unlinkSync(tempFilePath);
    }
  }

  return res.json({ links });
}

export const config = {
  api: { bodyParser: false },
};
