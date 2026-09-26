import CollectionPage from './CollectionPage.jsx'

function Teams() {
  return (
    <CollectionPage
      resource="teams"
      title="Teams"
      description="Small groups make every activity a shared effort."
      columns={[
        { key: 'name', label: 'Team' },
        { key: 'members', label: 'Members' },
        { key: 'description', label: 'About' },
      ]}
    />
  )
}

export default Teams