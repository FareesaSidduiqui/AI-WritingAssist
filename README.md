# ✨ AI-WritingAssist ✍️

AI-WritingAssist is a smart web-based writing assistant tool built with the MERN stack. It integrates **Firebase Authentication** and **OpenAI API** to help users improve their writing by checking for **grammatical and spelling errors**, and offers real-time suggestions for better sentence structure.

---

## 🔧 Features

- ✅ **User Authentication** using Firebase
- 🤖 **AI-Powered Writing Assistance** via OpenAI
- ✍️ **Grammar & Spelling Check**
- 📜 **Real-time Feedback** to enhance content quality
- 🔐 Secure backend and protected API keys

---

## 🚀 Tech Stack

**Frontend:**  
- React  
- TailwindCSS

**Backend:**  
- Node.js  
- Express.js  
- Firebase Admin SDK
- MongoDB 

**Other Integrations:**  
- OpenAI GPT (via API)  
- Firebase Authentication  

---

## 🔐 Authentication

Users can sign up and log in using **Firebase Authentication**. After login, they gain access to the AI-powered writing assistance tool.

---

## 🤖 AI Integration

We use the **OpenAI API** to:
- Analyze the user’s written content
- Detect grammatical and spelling issues
- Return corrected or enhanced versions of the input text

---

## 📁 Project Structure


---

## 🛡️ Environment Variables

To run the project, create a `.env` file inside `/backend` with the following:

```env
OPENAI_API_KEY=your_openai_key
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key
