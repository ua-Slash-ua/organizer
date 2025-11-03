import { NextRequest, NextResponse } from 'next/server'
import {Logger} from "@/front-end/libs/Logger/logger";



export async function POST(req: NextRequest) {
    const { message, file } = await req.json()
    const logger = new Logger(file)

    logger.logWrite(message)
    return NextResponse.json({ ok: true })
}
