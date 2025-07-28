export const CreateNotePage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Create a New Note</h1>
      <form>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" required />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea id="content" name="content" required></textarea>
        </div>
        <button type="submit">Save Note</button>
      </form>
    </div>
  );
}