import { db } from './firebase';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';

// Firestore Collections
export const COLLECTIONS = {
  USERS: 'users',
  PAYMENTS: 'payments',
  REVIEWS: 'reviews',
  SUBSCRIPTIONS: 'subscriptions',
};

// User 타입 정의
export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  phoneNumber?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  subscription?: {
    plan: string;
    status: 'active' | 'inactive' | 'cancelled';
    startDate: Timestamp;
    endDate: Timestamp;
  };
}

// Payment 타입 정의
export interface Payment {
  id?: string;
  userId: string;
  orderId: string;
  paymentKey: string;
  amount: number;
  orderName: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  paymentData?: any;
  createdAt: Timestamp;
}

// Review 타입 정의
export interface Review {
  id?: string;
  userId: string;
  userName: string;
  userPhotoURL?: string;
  rating: number;
  title: string;
  content: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ==================== USER 관련 함수 ====================

// 사용자 생성 (회원가입 시)
export const createUser = async (userId: string, userData: Partial<User>) => {
  const userRef = doc(db, COLLECTIONS.USERS, userId);
  await setDoc(userRef, {
    uid: userId,
    ...userData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

// 사용자 정보 가져오기
export const getUser = async (userId: string): Promise<User | null> => {
  const userRef = doc(db, COLLECTIONS.USERS, userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data() as User;
  }
  return null;
};

// 사용자 정보 업데이트
export const updateUser = async (userId: string, userData: Partial<User>) => {
  const userRef = doc(db, COLLECTIONS.USERS, userId);
  await updateDoc(userRef, {
    ...userData,
    updatedAt: serverTimestamp(),
  });
};

// ==================== PAYMENT 관련 함수 ====================

// 결제 내역 생성
export const createPayment = async (paymentData: Omit<Payment, 'id'>) => {
  const paymentRef = await addDoc(collection(db, COLLECTIONS.PAYMENTS), {
    ...paymentData,
    createdAt: serverTimestamp(),
  });
  return paymentRef.id;
};

// 사용자별 결제 내역 가져오기
export const getUserPayments = async (userId: string): Promise<Payment[]> => {
  const q = query(
    collection(db, COLLECTIONS.PAYMENTS),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Payment[];
};

// 결제 상태 업데이트
export const updatePaymentStatus = async (
  paymentId: string,
  status: Payment['status']
) => {
  const paymentRef = doc(db, COLLECTIONS.PAYMENTS, paymentId);
  await updateDoc(paymentRef, { status });
};

// ==================== REVIEW 관련 함수 ====================

// 리뷰 생성
export const createReview = async (reviewData: Omit<Review, 'id'>) => {
  const reviewRef = await addDoc(collection(db, COLLECTIONS.REVIEWS), {
    ...reviewData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return reviewRef.id;
};

// 모든 리뷰 가져오기 (최신순)
export const getAllReviews = async (limitCount: number = 10): Promise<Review[]> => {
  const q = query(
    collection(db, COLLECTIONS.REVIEWS),
    orderBy('createdAt', 'desc'),
    limit(limitCount)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Review[];
};

// 사용자별 리뷰 가져오기
export const getUserReviews = async (userId: string): Promise<Review[]> => {
  const q = query(
    collection(db, COLLECTIONS.REVIEWS),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Review[];
};

// 리뷰 수정
export const updateReview = async (reviewId: string, reviewData: Partial<Review>) => {
  const reviewRef = doc(db, COLLECTIONS.REVIEWS, reviewId);
  await updateDoc(reviewRef, {
    ...reviewData,
    updatedAt: serverTimestamp(),
  });
};

// 리뷰 삭제
export const deleteReview = async (reviewId: string) => {
  const reviewRef = doc(db, COLLECTIONS.REVIEWS, reviewId);
  await deleteDoc(reviewRef);
};

// 리뷰 평균 평점 계산
export const getAverageRating = async (): Promise<number> => {
  const querySnapshot = await getDocs(collection(db, COLLECTIONS.REVIEWS));

  if (querySnapshot.empty) return 0;

  const ratings = querySnapshot.docs.map(doc => doc.data().rating);
  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  return sum / ratings.length;
};
