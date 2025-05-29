'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NavigateToPage() {
  const [url, setUrl] = useState('');
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (url) {
      router.push(url);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className='py-2 text-2xl'>Get Your bill</div>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter Bill Number"
        className="border p-2 mb-4 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
}