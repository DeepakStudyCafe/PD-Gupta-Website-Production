// lib/firestore.js
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  addDoc, 
  updateDoc, 
  query, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';

// ========== SITE CONTENT ==========

export const getSiteContent = async (page) => {
  try {
    const docRef = doc(db, 'siteContent', page);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error) {
    console.error(`Error fetching ${page} content:`, error);
    return null;
  }
};

export const updateSiteContent = async (page, data) => {
  try {
    const docRef = doc(db, 'siteContent', page);
    await setDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    }, { merge: true });
    return { success: true };
  } catch (error) {
    console.error(`Error updating ${page} content:`, error);
    return { success: false, error: error.message };
  }
};

// ========== BLOGS ==========

export const getAllBlogs = async () => {
  try {
    const blogsRef = collection(db, 'blogs');
    const q = query(blogsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
};

export const getBlogBySlug = async (slug) => {
  try {
    const docRef = doc(db, 'blogs', slug);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
};

export const createOrUpdateBlog = async (slug, data) => {
  try {
    const docRef = doc(db, 'blogs', slug);
    await setDoc(docRef, {
      ...data,
      slug,
      updatedAt: serverTimestamp(),
      createdAt: data.createdAt || serverTimestamp()
    }, { merge: true });
    return { success: true };
  } catch (error) {
    console.error('Error saving blog:', error);
    return { success: false, error: error.message };
  }
};

// ========== CONTACTS ==========

export const submitContactForm = async (formData) => {
  try {
    const contactsRef = collection(db, 'contacts');
    await addDoc(contactsRef, {
      ...formData,
      createdAt: serverTimestamp(),
      status: 'unread'
    });
    return { success: true };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { success: false, error: error.message };
  }
};

export const getContactMessages = async () => {
  try {
    const contactsRef = collection(db, 'contacts');
    const q = query(contactsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return [];
  }
};

export const markContactAsRead = async (contactId) => {
  try {
    const docRef = doc(db, 'contacts', contactId);
    await updateDoc(docRef, {
      status: 'read',
      readAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error marking contact as read:', error);
    return { success: false, error: error.message };
  }
};
