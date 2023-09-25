import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
export async function GET(req: Request, response: NextApiResponse) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { error: "Url Not found!" },
      {
        status: 404,
      }
    );
  }
  try {
    const fetchUrl = `https://screenia.best/api/screenshot?url=${url}&type=png`;
    let options = { method: "GET" };
    const result = await fetch(fetchUrl, options);
    const data = await result.blob();
    const res = new NextResponse(data);
    res.headers.set("Content-Type", "image/png");
    return res;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
}
