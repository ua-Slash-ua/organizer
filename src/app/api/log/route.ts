import { NextRequest, NextResponse } from 'next/server'
import {Logger} from "@/front-end/libs/Logger/logger";

const logger = new Logger()

export async function POST(req: NextRequest) {
    const { message } = await req.json()
    logger.logWrite(message)
    return NextResponse.json({ ok: true })
}
