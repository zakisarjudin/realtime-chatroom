import { app } from "./firebase-config.js";
import { ChatContentDOM } from "./ChatContentDOM.js";
import * as fstore from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

class ChatModel {
  constructor() {
    this.db = fstore.getFirestore(app);
    this.unsubscribe = {};
    this.chatDOM = new ChatContentDOM();
  }

  // add single document
  async addFireDoc(doc, data = {}) {
    data.created_at = fstore.Timestamp.fromDate(new Date());

    try {
      const docRef = await fstore.addDoc(fstore.collection(this.db, doc), data);
      console.log("Document ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // get all documents
  async getFireDocs(doc) {
    const q = fstore.query(fstore.collection(this.db, doc), fstore.orderBy("created_at"));
    const querySnapshot = await fstore.getDocs(q);

    return querySnapshot;
  }

  // update single document
  async updateFireDoc(doc, id, data) {
    const docRef = doc(this.db, doc, id);

    data.created_at = fstore.Timestamp.fromDate(new Date());
    const querySnapshot = await fstore.updateDoc(docRef, data);
    return querySnapshot;
  }

  // delete single document
  async deleteFireDoc(doc, id) {
    const querySnapshot = await fstore.deleteDoc(doc(this.db, doc, id));

    return querySnapshot;
  }

  // subs real time data update
  async subscribeFireDoc(doc) {
    await this.unsubscribeFireDoc();
    const q = fstore.query(fstore.collection(this.db, doc), fstore.orderBy("created_at"));

    this.unsubscribe[doc] = fstore.onSnapshot(q, (docs) => {
      docs.docChanges().forEach((change) => {
        this.chatDOM.appendChat(change.doc);
      });
    });

    return this.unsubscribe[doc];
  }

  // unsubs real time data update
  async unsubscribeFireDoc() {
    for (const [key, value] of Object.entries(this.unsubscribe)) {
      this.unsubscribe[key]();
    }
  }
}

export { ChatModel };
