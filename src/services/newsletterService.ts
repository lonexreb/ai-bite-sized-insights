import { collection, addDoc, getDocs, query, orderBy, limit, Timestamp, doc, updateDoc, deleteDoc, startAfter, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface NewsletterItem {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: Date;
  author: string;
  summary: string;
  imageUrl?: string;
}

export type SortField = 'createdAt' | 'title' | 'category';
export type SortOrder = 'asc' | 'desc';

interface GetNewsletterItemsOptions {
  limitCount?: number;
  lastDoc?: any;
  sortField?: SortField;
  sortOrder?: SortOrder;
}

export const newsletterService = {
  // Add a new newsletter item
  async addNewsletterItem(item: Omit<NewsletterItem, 'id' | 'createdAt'>) {
    try {
      const docRef = await addDoc(collection(db, 'newsletters'), {
        ...item,
        createdAt: Timestamp.now()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding newsletter item:', error);
      throw error;
    }
  },

  // Get all newsletter items
  async getNewsletterItems({ 
    limitCount = 10, 
    lastDoc = null,
    sortField = 'createdAt',
    sortOrder = 'desc'
  }: GetNewsletterItemsOptions = {}) {
    try {
      let q = query(
        collection(db, 'newsletters'),
        orderBy(sortField, sortOrder),
        limit(limitCount)
      );

      if (lastDoc) {
        q = query(q, startAfter(lastDoc));
      }

      const querySnapshot = await getDocs(q);
      const items: NewsletterItem[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        items.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt.toDate(),
        } as NewsletterItem);
      });

      return {
        items,
        lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1],
        hasMore: querySnapshot.docs.length === limitCount
      };
    } catch (error) {
      console.error('Error getting newsletter items:', error);
      throw error;
    }
  },

  async updateNewsletterItem(id: string, updates: Partial<Omit<NewsletterItem, 'id' | 'createdAt'>>) {
    try {
      const docRef = doc(db, 'newsletters', id);
      await updateDoc(docRef, updates);
      return id;
    } catch (error) {
      console.error('Error updating newsletter item:', error);
      throw error;
    }
  },

  async deleteNewsletterItem(id: string) {
    try {
      const docRef = doc(db, 'newsletters', id);
      await deleteDoc(docRef);
      return id;
    } catch (error) {
      console.error('Error deleting newsletter item:', error);
      throw error;
    }
  },

  async getNewsletterItem(id: string) {
    try {
      const docRef = doc(db, 'newsletters', id);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        throw new Error('Newsletter item not found');
      }

      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt.toDate(),
      } as NewsletterItem;
    } catch (error) {
      console.error('Error getting newsletter item:', error);
      throw error;
    }
  }
}; 