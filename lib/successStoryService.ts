import { db, storage } from './firebase';
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  where,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

// Success Story 타입 정의
export interface SuccessStory {
  id?: string;
  title: string;
  companyName: string;
  industry: string;
  description: string;
  content: string;
  imageUrl: string;
  results: {
    salesIncrease: string;
    customerIncrease: string;
    customMetric?: string;
  };
  featured: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

const COLLECTION_NAME = 'successStories';

// 이미지 업로드 (Firebase Storage)
export const uploadSuccessStoryImage = async (
  file: File,
  storyId: string
): Promise<string> => {
  const storageRef = ref(storage, `success-stories/${storyId}/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

// 이미지 삭제
export const deleteSuccessStoryImage = async (imageUrl: string) => {
  try {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
  } catch (error) {
    console.error('이미지 삭제 오류:', error);
  }
};

// 성공사례 생성
export const createSuccessStory = async (
  storyData: Omit<SuccessStory, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> => {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...storyData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
};

// 모든 성공사례 가져오기
export const getAllSuccessStories = async (
  limitCount: number = 20
): Promise<SuccessStory[]> => {
  const q = query(
    collection(db, COLLECTION_NAME),
    orderBy('createdAt', 'desc'),
    limit(limitCount)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as SuccessStory[];
};

// 추천 성공사례 가져오기
export const getFeaturedSuccessStories = async (): Promise<SuccessStory[]> => {
  const q = query(
    collection(db, COLLECTION_NAME),
    where('featured', '==', true),
    orderBy('createdAt', 'desc'),
    limit(3)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as SuccessStory[];
};

// 특정 성공사례 가져오기
export const getSuccessStory = async (
  storyId: string
): Promise<SuccessStory | null> => {
  const docRef = doc(db, COLLECTION_NAME, storyId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as SuccessStory;
  }
  return null;
};

// 성공사례 수정
export const updateSuccessStory = async (
  storyId: string,
  storyData: Partial<SuccessStory>
) => {
  const docRef = doc(db, COLLECTION_NAME, storyId);
  await updateDoc(docRef, {
    ...storyData,
    updatedAt: serverTimestamp(),
  });
};

// 성공사례 삭제
export const deleteSuccessStory = async (storyId: string) => {
  const docRef = doc(db, COLLECTION_NAME, storyId);
  await deleteDoc(docRef);
};
