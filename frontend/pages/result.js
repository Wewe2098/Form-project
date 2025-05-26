import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ResultPage() {
  const router = useRouter();
  const { fullName, age } = router.query;
  const [text, setText] = useState('');

  useEffect(() => {
    const rawText = localStorage.getItem('extractedText');
    setText(rawText || '');
  }, []);

  if (!fullName || !age) {
    return (
      <div className="text-center mt-20 text-red-600">
        Missing data. Please upload again.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 bg-white p-8 shadow rounded">
      <h1 className="text-3xl font-bold mb-6">Result</h1>
      <p><strong>Full Name:</strong> {fullName}</p>
      <p><strong>Age:</strong> {age}</p>
      <h2 className="mt-6 mb-2 text-xl font-semibold">Extracted Text</h2>
      <pre className="bg-gray-100 p-4 border rounded whitespace-pre-wrap max-h-[400px] overflow-y-scroll">
        {text || 'No text available'}
      </pre>
    </div>
  );
}
