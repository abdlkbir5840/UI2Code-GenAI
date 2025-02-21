import { db } from "@/configs/db";
import { usersTable, wirfremeToCodeTable } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { description, imageUrl, model, uid, email } = await req.json();
  const creditResutl = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));
  if (creditResutl[0].credits && creditResutl[0].credits > 0) {
    const result = await db
      .insert(wirfremeToCodeTable)
      .values({
        uid: uid,
        imageUrl: imageUrl,
        model: model,
        description: description,
        created_by: email,
      })
      .returning({ id: wirfremeToCodeTable.id });
    await db
      .update(usersTable)
      .set({
        credits: creditResutl[0].credits - 1,
      })
      .where(eq(usersTable.email, email));

    return NextResponse.json(result);
  } else {
    return NextResponse.json({ error: "Not enough credits" }, { status: 403 });
  }
}

export async function GET(req: NextRequest) {
  const reqUrl = req.url;
  const { searchParams } = new URL(reqUrl);
  const uid = searchParams.get("uid");
  const email = searchParams.get("email");
  if (uid) {
    const result = await db
      .select()
      .from(wirfremeToCodeTable)
      .where(eq(wirfremeToCodeTable.uid, uid));
    return NextResponse.json(result[0]);
  } else if (email) {
    const result = await db
      .select()
      .from(wirfremeToCodeTable)
      .where(eq(wirfremeToCodeTable.created_by, email));
    return NextResponse.json(result);
  }
  return NextResponse.json({ error: "UID is  " }, { status: 400 });
}

export async function PUT(req: NextRequest) {
  const { uid, codeResponse } = await req.json();
  const result = await db
    .update(wirfremeToCodeTable)
    .set({ code: codeResponse })
    .where(eq(wirfremeToCodeTable.uid, uid))
    .returning({ uid: wirfremeToCodeTable.id });
  return NextResponse.json(result);
}
