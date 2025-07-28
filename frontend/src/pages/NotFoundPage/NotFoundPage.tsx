export const NotFoundPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <a href="/notes/active" style={{ color: '#007bff', textDecoration: 'none' }}>Go to Active Notes</a>
    </div>
  );
}