'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

interface UserData {
  uid: string;
  email: string;
  name: string;
  phone: string;
  role: 'user' | 'admin';
  points: number;
  marketingConsent: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  signup: (email: string, password: string, name: string, phone: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  // Firestore에서 사용자 데이터 가져오기
  const fetchUserData = async (uid: string) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data() as UserData);
      }
    } catch (error) {
      console.error('사용자 데이터 로드 실패:', error);
    }
  };

  // 회원가입
  const signup = async (email: string, password: string, name: string, phone: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Firebase Auth 프로필 업데이트
      await updateProfile(user, { displayName: name });

      // Firestore에 사용자 정보 저장
      const newUserData: UserData = {
        uid: user.uid,
        email: user.email!,
        name,
        phone,
        role: 'user',
        points: 0,
        marketingConsent: {
          email: false,
          sms: false,
          push: false,
        },
      };

      await setDoc(doc(db, 'users', user.uid), {
        ...newUserData,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
      });

      setUserData(newUserData);
    } catch (error: any) {
      console.error('회원가입 실패:', error);
      throw new Error(getErrorMessage(error.code));
    }
  };

  // 로그인
  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error('로그인 실패:', error);
      throw new Error(getErrorMessage(error.code));
    }
  };

  // 로그아웃
  const logout = async () => {
    try {
      await signOut(auth);
      setUserData(null);
    } catch (error) {
      console.error('로그아웃 실패:', error);
      throw error;
    }
  };

  // 인증 상태 변화 감지
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        await fetchUserData(user.uid);
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const isAdmin = userData?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, userData, loading, signup, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Firebase 에러 메시지 한국어 변환
function getErrorMessage(errorCode: string): string {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return '이미 사용 중인 이메일입니다.';
    case 'auth/invalid-email':
      return '유효하지 않은 이메일 형식입니다.';
    case 'auth/operation-not-allowed':
      return '이메일/비밀번호 로그인이 비활성화되어 있습니다.';
    case 'auth/weak-password':
      return '비밀번호는 최소 6자 이상이어야 합니다.';
    case 'auth/user-disabled':
      return '비활성화된 계정입니다.';
    case 'auth/user-not-found':
      return '존재하지 않는 계정입니다.';
    case 'auth/wrong-password':
      return '잘못된 비밀번호입니다.';
    case 'auth/too-many-requests':
      return '너무 많은 시도가 있었습니다. 잠시 후 다시 시도해주세요.';
    default:
      return '인증 중 오류가 발생했습니다.';
  }
}