import { useState } from 'react';
import { useRouter } from 'next/router';

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setError('File is required.');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('dob', dob);

    try {
      const res = await fetch('http://localhost:8080/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Upload failed.');
      }

      const result = await res.json();
      localStorage.setItem('extractedText', result.extractedText);

      router.push({
        pathname: '/result',
        query: {
          fullName: result.fullName,
          age: result.age,
        },
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Upload File</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="file"
          accept=".pdf,image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full"
          required
        />
        {error && <p className="text-red-600">{error}</p>}
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  );
}
