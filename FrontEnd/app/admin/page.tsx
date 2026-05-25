import { verifyAdminSession } from '@/src/lib/admin-auth'
import { AdminPanel } from '@/src/Components/Admin/AdminPanel'
import { AdminLogin } from '@/src/Components/Admin/AdminLogin'

export default async function AdminPage() {
  const authenticated = await verifyAdminSession()
  return authenticated ? <AdminPanel /> : <AdminLogin />
}
