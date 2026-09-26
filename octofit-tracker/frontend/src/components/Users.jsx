import CollectionPage from './CollectionPage.jsx'

function Users() {
  return (
    <CollectionPage
      resource="users"
      title="Students"
      description="Student profiles participating in the Mergington fitness program."
      columns={[
        { key: 'name', label: 'Student' },
        { key: 'email', label: 'Email' },
        { key: 'grade', label: 'Grade' },
        { key: 'age', label: 'Age' },
      ]}
    />
  )
}

export default Users