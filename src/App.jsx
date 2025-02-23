import { useState } from 'react';

function App() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRemix = async () => {
    if (!inputText.trim()) return;
    
    setIsLoading(true);
    try {
      console.log('Sending request with text:', inputText);
      
      const response = await fetch('/api/remix', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      // Check if response is empty
      const responseText = await response.text();
      console.log('Raw response:', responseText);

      if (!responseText) {
        throw new Error('Empty response from server');
      }

      // Try to parse JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        throw new Error(`Invalid JSON response: ${responseText}`);
      }

      if (!response.ok) {
        throw new Error(data.details || data.error || 'Failed to remix text');
      }

      if (!data.remixedText) {
        throw new Error('No remixed text received');
      }
      
      setOutputText(data.remixedText);
    } catch (error) {
      console.error('Detailed error:', error);
      setOutputText(`Error: ${error.message}`);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Text Remixer</h1>
        
        <div className="space-y-4">
          <textarea
            className="w-full h-40 p-4 border rounded-lg shadow-sm"
            placeholder="Enter text to remix..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          
          <button
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50"
            onClick={handleRemix}
            disabled={isLoading || !inputText.trim()}
          >
            {isLoading ? 'Remixing...' : 'Remix Text'}
          </button>
          
          {outputText && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-2">Remixed Text:</h2>
              <div className="w-full min-h-40 p-4 bg-white border rounded-lg shadow-sm">
                {outputText}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App; 