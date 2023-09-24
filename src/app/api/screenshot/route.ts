import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

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
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const screenshot = await page.screenshot({
      omitBackground: true,
    });
    await browser.close();

    const res = new NextResponse(screenshot);
    res.headers.set("Content-Type", "image/png");
    return res;
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
}
