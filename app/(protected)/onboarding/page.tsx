'use client';

import { useEffect, useState } from 'react';
import { OnboardingForm } from '@/components/onboarding-form';
import { Loader2 } from 'lucide-react';

interface User {
  id?: string;
  email?: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
}

export default function OnboardingPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/session');
        const data = await res.json();
        console.log("SESSION DATA:", data);

        // حتى لو مفيش user، ما نعملش redirect
        if (data.user) {
          setUser(data.user);
        } else {
          // المستخدم غير مسجل؟ خلي البيانات فاضية وافتح الـ onboarding عادي
          setUser({
            name: 'المستخدم الجديد',
            email: '',
            picture: '',
          });
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        // نفس الشيء: لو في خطأ، نفتح الـ onboarding عادي
        setUser({
          name: 'المستخدم الجديد',
          email: '',
          picture: '',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const name = `${user?.given_name || ''} ${user?.family_name || ''}`.trim() || user?.name || 'المستخدم';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">إكمال الملف الشخصي</h1>
        <OnboardingForm
          name={name}
          email={user?.email || ''}
          image={user?.picture || ''}
        />
      </div>
    </div>
  );
}


  