import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testConnection() {
  try {
    await prisma.$connect();
    console.log('✅ تم الاتصال بقاعدة البيانات بنجاح!');
    
    // اختبار استعلام بسيط
    const users = await prisma.user.findMany();
    console.log('👥 عدد المستخدمين:', users.length);
    
  } catch (error) {
    console.error('❌ خطأ في الاتصال بقاعدة البيانات:');
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
