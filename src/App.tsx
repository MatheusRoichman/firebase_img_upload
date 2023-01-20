import {
  StorageError,
  StorageReference,
  UploadTask,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { FormEvent, useState } from "react";
import { storage } from "./firebase/firebaseConfig";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [localUrl, setLocalUrl] = useState<string | null>(null);
  const [firebaseUrl, setFirebaseUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const onChange = (event: FormEvent<HTMLInputElement>) => {
    if (!event.currentTarget.files) return;

    const file = event.currentTarget.files[0];

    setFile(file);
    setLocalUrl(URL.createObjectURL(file));
  };

  const handleUpload = (file: File): void => {
    const storageRef: StorageReference = ref(
      storage,
      `images/${file.name}-${Date.now()}`
    );
    const uploadTask: UploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed", 
      (snapshot) => {
        const progress = parseInt(((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toString());
        setProgress(progress);
      },
      (error) => {
        setError('Erro ao fazer o upload da imagem. Tente novamente.')
      },
      async () => {
        try {
          const url: string = await getDownloadURL(uploadTask.snapshot.ref);
          setFirebaseUrl(url);
        } catch (error) {
          setError('Rrro ao resgatar a URL da imagem.')
        }
      }
    );
  };

  return (
    <>
      <h1>Upload de imagens</h1>
      <input type="file" accept="image/*" onChange={onChange} />
      {localUrl ? (
        <>
          <p>IMAGEM LOCAL</p>
          <img src={localUrl} alt={localUrl} width="300" height="300" />
        </>
      ) : null}
      <button
        onClick={() => {
          if (!file) return;

          return handleUpload(file);
        }}
      >
        Upload
      </button>
      <p>Progresso: {progress}%</p>
      {error ? <p>{error}</p> : null}
      {firebaseUrl ? (
        <>
          <p>IMAGEM EM NUVEM</p>
          <img src={firebaseUrl} alt={firebaseUrl} width="300" height="300" />
        </>
      ) : null}
    </>
  );
}

export default App;
