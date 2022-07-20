import React, { useState } from 'react';
import {
  Routes,
  Route,
  useLocation,
  Outlet,
  Navigate,
  // Redirect,
} from 'react-router-dom';
import Signin from './pages/SignIn/SignIn';
import 'antd/dist/antd.css';
import Admin from './pages/Admin/Admin';
import CustomserComponent from './components/Customer/CustomerComponent';
import BannerComponent from './components/Banner/BannerComponent';
import UrlComponent from './components/Url/UrlComponent';
import CampaignComponent from './components/Campaingn/CampaignComponent';
import DatasetComponent from './components/Dataset/DatasetComponent';
import Login from './pages/Login/Login';

import { storage } from '../src/utils/firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import OverviewComponent from './components/Overview/OverviewComponent';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/login" element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route path="admin" element={<Admin />}>
            <Route index element={<OverviewComponent />} />
            <Route path="overview" element={<OverviewComponent />} />
            <Route path="customers" element={<CustomserComponent />} />
            <Route path="datasets" element={<DatasetComponent />} />
            <Route path="campaigns" element={<CampaignComponent />} />
            <Route path="banners" element={<BannerComponent />} />
            <Route path="urls" element={<UrlComponent />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}


interface AuthContextType {
  user: any;
}

export const AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<any>(null);

  let value = { user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return React.useContext(AuthContext);
}

function RequireAuth() {
  let auth = useAuth();
  let location = useLocation();
  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
}
// function Test() {
//   const [imgUrl, setImgUrl] = useState<string>('');
//   const [progresspercent, setProgresspercent] = useState(0);

//   const handleSubmit = (e: any) => {
//     e.preventDefault()
//     const file = e.target[0]?.files[0]
//     if (!file) return;
//     const storageRef = ref(storage, `files/${file.name}`);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on("state_changed",
//       (snapshot) => {
//         const progress =
//           Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
//         setProgresspercent(progress);
//       },
//       (error) => {
//         alert(error);
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: string) => {
//           setImgUrl(downloadURL)
//         });
//       }
//     );
//   }
//   return (
//     <div className="App">
//       <form onSubmit={handleSubmit} className='form'>
//         <input type='file' />
//         <button type='submit'>Upload</button>
//       </form>
//       {
//         !imgUrl &&
//         <div className='outerbar'>
//           <div className='innerbar' style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
//         </div>
//       }
//       {
//         imgUrl &&
//         <img src={imgUrl} alt='uploaded file' height={200} />
//       }
//     </div>
//   );
// }

function NotFound() {
  return <h3>NotFound</h3>;
}
