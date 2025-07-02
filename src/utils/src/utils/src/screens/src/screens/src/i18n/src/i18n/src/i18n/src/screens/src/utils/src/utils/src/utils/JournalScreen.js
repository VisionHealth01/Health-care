import { db } from '../utils/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth } from '../utils/firebase'; // to get current user
