import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { getInvoiceTemplate } from "../src/services/storageService";

export const generateInvoiceDocBuffer = async (data: any): Promise<Buffer> => {
  const content = await getInvoiceTemplate();
  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

  doc.render(data);
  const docBuffer = doc
    .getZip()
    .generate({ type: "nodebuffer", compression: "DEFLATE" });

  return docBuffer;
};
