import CollectionPage from './CollectionPage.jsx'

function Workouts() {
  return (
    <CollectionPage
      resource="workouts"
      title="Workouts"
      description="Practical sessions matched to different interests and experience levels."
      columns={[
        { key: 'title', label: 'Workout' },
        { key: 'category', label: 'Category' },
        { key: 'durationMinutes', label: 'Minutes' },
        { key: 'difficulty', label: 'Level' },
      ]}
    />
  )
}

export default Workouts