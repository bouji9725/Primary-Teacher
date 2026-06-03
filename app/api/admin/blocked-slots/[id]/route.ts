import { NextResponse } from 'next/server'
import { db } from '@/src/lib/db'
import { verifyAdminSession } from '@/src/lib/admin-auth'

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifyAdminSession())) {
    return NextResponse.json(
      { error: { code: 'UNAUTHORIZED', message: 'Not authorised' } },
      { status: 401 }
    )
  }

  const { id } = await params
  await db.blockedSlot.delete({ where: { id } }).catch(() => null)
  return new NextResponse(null, { status: 204 })
}
