const handleRemix = async () => {
  try {
    const response = await fetch('/api/remix', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ /* your data here */ })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    // Handle successful response
  } catch (error) {
    console.error('Error remixing text:', error);
    // Handle error appropriately
  }
}; 