async function connectToserver() {
  const response = await fetch('http://localhost:5000/api/connect');
  const data = await response.json();
  console.log(data.message);
}

connectToserver();