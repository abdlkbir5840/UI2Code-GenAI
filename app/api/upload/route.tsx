// import { NextResponse } from "next/server";
// import { writeFile } from "fs/promises";
// import path from "path";

// export async function POST(req: Request) {
//   const formData = await req.formData();
//   const file = formData.get("file") as File;

//   if (!file) {
//     return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
//   }

//   const bytes = await file.arrayBuffer();
//   const buffer = Buffer.from(bytes);
//   const fileName = `${Date.now()}-${file.name}`;
//   const filePath = path.join(process.cwd(), "public/images", fileName);

//   await writeFile(filePath, buffer);

//   return NextResponse.json({ url: `/images/${fileName}` });
// }


import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/configs/supabaseClient";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
    const fileType = file.type;

    // Convert file to ArrayBuffer
    const bytes = await file.arrayBuffer();

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from("wireframeToCode") // Replace with your Supabase bucket name
      .upload(fileName, bytes, {
        contentType: fileType,
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Upload error:", error);
      return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
    }

    // Get Public URL
    const { data: publicUrlData } = supabase.storage
      .from("wireframeToCode")
      .getPublicUrl(fileName);

    return NextResponse.json({ url: publicUrlData.publicUrl });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

